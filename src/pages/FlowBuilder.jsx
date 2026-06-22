import { useCallback, useMemo, useRef, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
  Panel,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ArrowLeft, Save, Check, Bot, Sparkles, X, Play, Rocket, Code2, ListOrdered, Workflow } from 'lucide-react'
import { nodeTypes } from '../components/flow/nodes.jsx'
import { edgeTypes } from '../components/flow/edges.jsx'
import { FlowActionsContext } from '../components/flow/flowContext.js'
import NodePalette from '../components/flow/NodePalette.jsx'
import NodePicker from '../components/flow/NodePicker.jsx'
import StepsBuilder from '../components/flow/StepsBuilder.jsx'
import NodeProperties from '../components/flow/NodeProperties.jsx'
import FlowPlayground from '../components/flow/FlowPlayground.jsx'
import ThemeToggle from '../components/layout/ThemeToggle.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import Badge from '../components/ui/Badge.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { useChatbots } from '../context/ChatbotsContext.jsx'
import { cn } from '../utils/cn.js'
import {
  flowCatalog,
  rfTypeFor,
  nodeSummary,
  initialFlowNodes,
  initialFlowEdges,
} from '../data/flowNodes.js'

let idSeq = 100
const nextId = () => `n_${idSeq++}`

const defaultEdgeOptions = {
  type: 'deletable',
  animated: true,
  markerEnd: { type: MarkerType.ArrowClosed, width: 18, height: 18 },
  style: { strokeWidth: 2 },
}

function Builder() {
  const { theme } = useTheme()
  const { chatbots } = useChatbots()
  const wrapperRef = useRef(null)
  const { screenToFlowPosition } = useReactFlow()

  // Which chatbot's flow are we editing? Comes from the route param + (for a
  // freshly created bot) the navigation state passed by the Create page.
  const { id: botId } = useParams()
  const { state } = useLocation()
  const bot = chatbots.find((b) => b.id === botId)
  const botName = state?.botName || bot?.name || null
  const themeColor = state?.themeColor || bot?.themeColor || '#4f46e5'
  const isNew = !!state?.isNew

  // Seed the first "send message" node with the bot's welcome message
  const seededNodes = useMemo(() => {
    const welcome = state?.welcomeMessage
    if (!welcome) return initialFlowNodes
    return initialFlowNodes.map((n) =>
      n.id === 'n1' && n.data?.kind === 'send_message'
        ? { ...n, data: { ...n.data, message: welcome } }
        : n
    )
  }, [state])

  const [nodes, setNodes, onNodesChange] = useNodesState(seededNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialFlowEdges.map((e) => ({ ...e, type: 'deletable' }))
  )

  // Classic linear builder ("Steps") — the default. Canvas is the advanced view.
  const [view, setView] = useState('steps')
  const [steps, setSteps] = useState(() => [
    {
      id: nextId(),
      kind: 'send_message',
      data: {
        message: state?.welcomeMessage || '👋 Hi! Welcome. How can I help you today?',
        buttons: ['Pricing', 'Support', 'Talk to sales'],
      },
    },
    { id: nextId(), kind: 'ask_question', data: { question: 'What’s your work email?', variable: 'email', inputType: 'email' } },
  ])

  const insertStep = useCallback((kind, index) => {
    setSteps((s) => {
      const copy = [...s]
      copy.splice(index, 0, { id: nextId(), kind, data: structuredClone(flowCatalog[kind].defaultData) })
      return copy
    })
  }, [])
  const updateStep = useCallback((id, data) => setSteps((s) => s.map((st) => (st.id === id ? { ...st, data } : st))), [])
  // Insert a "Jump to step" module pointing at an existing step
  const insertJump = useCallback((targetId, index) => {
    setSteps((s) => {
      const ti = s.findIndex((x) => x.id === targetId)
      const targetLabel = ti >= 0 ? `Step ${ti + 1} · ${flowCatalog[s[ti].kind]?.label}` : 'a step'
      const copy = [...s]
      copy.splice(index, 0, { id: nextId(), kind: 'goto', data: { targetId, targetLabel } })
      return copy
    })
  }, [])
  const removeStep = useCallback((id) => setSteps((s) => s.filter((st) => st.id !== id)), [])
  const moveStep = useCallback((id, dir) => {
    setSteps((s) => {
      const i = s.findIndex((x) => x.id === id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= s.length) return s
      const copy = [...s]
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
      return copy
    })
  }, [])
  // Drag-and-drop reorder: move step from one index to another
  const reorderSteps = useCallback((from, to) => {
    setSteps((s) => {
      if (from === to || from < 0 || to < 0 || from >= s.length || to >= s.length) return s
      const copy = [...s]
      const [moved] = copy.splice(from, 1)
      copy.splice(to, 0, moved)
      return copy
    })
  }, [])

  const [selectedId, setSelectedId] = useState(null)
  const [flowName, setFlowName] = useState(botName ? `${botName} flow` : 'Welcome flow')
  const [saved, setSaved] = useState(false)
  const [showBanner, setShowBanner] = useState(isNew)
  const [testOpen, setTestOpen] = useState(false)
  const [published, setPublished] = useState(false)
  const [publishOpen, setPublishOpen] = useState(false)
  const [addMenu, setAddMenu] = useState(null) // { sourceId, sourceHandle }

  const publish = () => {
    setPublished(true)
    setPublishOpen(true)
  }

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, ...defaultEdgeOptions }, eds)),
    [setEdges]
  )

  const createNode = useCallback(
    (kind, position) => ({
      id: nextId(),
      type: rfTypeFor(kind),
      position,
      data: { kind, ...structuredClone(flowCatalog[kind].defaultData) },
    }),
    []
  )

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()
      const kind = event.dataTransfer.getData('application/reactflow')
      if (!kind || !flowCatalog[kind]) return
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY })
      setNodes((nds) => [...nds, createNode(kind, position)])
    },
    [screenToFlowPosition, setNodes, createNode]
  )

  // Click-to-add: drops the block near the center of the visible canvas
  const addNode = useCallback(
    (kind) => {
      if (!flowCatalog[kind]) return
      let position = { x: 250, y: 200 }
      const el = wrapperRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        position = screenToFlowPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }
      // Nudge each new node so several clicks don't stack exactly on top
      const offset = (nodes.length % 6) * 28
      position = { x: position.x - 128 + offset, y: position.y - 40 + offset }
      const node = createNode(kind, position)
      setNodes((nds) => [...nds, node])
      setSelectedId(node.id)
    },
    [nodes.length, screenToFlowPosition, createNode, setNodes]
  )

  // Add a block from a node's "+" and auto-connect it to that node
  const addConnectedNode = useCallback(
    (kind) => {
      if (!addMenu || !flowCatalog[kind]) return
      const src = nodes.find((n) => n.id === addMenu.sourceId)
      const base = src ? { x: src.position.x + 320, y: src.position.y } : { x: 320, y: 200 }
      // Stack vertically if this output already has connections
      const outCount = edges.filter(
        (e) => e.source === addMenu.sourceId && (addMenu.sourceHandle ? e.sourceHandle === addMenu.sourceHandle : true)
      ).length
      const position = { x: base.x, y: base.y + outCount * 130 }
      const node = createNode(kind, position)
      setNodes((nds) => [...nds, node])
      setEdges((eds) =>
        addEdge(
          { source: addMenu.sourceId, sourceHandle: addMenu.sourceHandle, target: node.id, ...defaultEdgeOptions },
          eds
        )
      )
      setSelectedId(node.id)
      setAddMenu(null)
    },
    [addMenu, nodes, edges, createNode, setNodes, setEdges]
  )

  const openAddMenu = useCallback((sourceId, sourceHandle) => setAddMenu({ sourceId, sourceHandle }), [])

  // Connect the source to an already-existing node (no new node created)
  const connectToExisting = useCallback(
    (targetId) => {
      if (!addMenu) return
      setEdges((eds) =>
        addEdge(
          { source: addMenu.sourceId, sourceHandle: addMenu.sourceHandle, target: targetId, ...defaultEdgeOptions },
          eds
        )
      )
      setAddMenu(null)
    },
    [addMenu, setEdges]
  )

  const deleteEdge = useCallback((edgeId) => setEdges((eds) => eds.filter((e) => e.id !== edgeId)), [setEdges])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const updateNodeData = useCallback(
    (id, data) => setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data } : n))),
    [setNodes]
  )

  const deleteNode = useCallback(
    (id) => {
      setNodes((nds) => nds.filter((n) => n.id !== id))
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
      setSelectedId(null)
    },
    [setNodes, setEdges]
  )

  const duplicateNode = useCallback(
    (id) => {
      setNodes((nds) => {
        const src = nds.find((n) => n.id === id)
        if (!src) return nds
        const copy = {
          ...src,
          id: nextId(),
          position: { x: src.position.x + 40, y: src.position.y + 40 },
          data: structuredClone(src.data),
          selected: false,
        }
        return [...nds, copy]
      })
    },
    [setNodes]
  )

  const save = () => {
    // Mock save — in a real app this would persist nodes + edges to the backend
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectedNode = nodes.find((n) => n.id === selectedId) || null

  // Exposed to the custom node toolbars (edit opens the panel, delete removes)
  const flowActions = useMemo(
    () => ({ editNode: (id) => setSelectedId(id), deleteNode, openAddMenu, deleteEdge }),
    [deleteNode, openAddMenu, deleteEdge]
  )

  const blockCount = view === 'steps' ? steps.length : nodes.length

  // The playground runs a graph; in Steps view we synthesize a linear chain.
  const buildTestGraph = () => {
    if (view === 'canvas') return { nodes, edges }
    const gNodes = [{ id: 'start', type: 'start', position: { x: 0, y: 0 }, data: {} }]
    const gEdges = []
    let prev = 'start'
    steps.forEach((st, i) => {
      gNodes.push({ id: st.id, type: rfTypeFor(st.kind), position: { x: 0, y: 0 }, data: { kind: st.kind, ...st.data } })
      gEdges.push({ id: `se${i}`, source: prev, target: st.id })
      prev = st.id
    })
    return { nodes: gNodes, edges: gEdges }
  }
  const testGraph = testOpen ? buildTestGraph() : null

  return (
    <div className="flex h-screen flex-col bg-surface-50 dark:bg-surface-950">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-surface-200 bg-white px-4 dark:border-surface-800 dark:bg-surface-900">
        <Link
          to="/app/chatbots"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-800"
        >
          <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Chatbots</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-white">
            <Bot className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            {botName && (
              <span className="px-2 text-[11px] font-medium leading-none text-surface-400">
                {botName}
              </span>
            )}
            <input
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              className="w-40 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-surface-900 hover:border-surface-200 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:text-white dark:hover:border-surface-700 sm:w-56"
            />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Steps (classic) vs Canvas (advanced) */}
          <div className="hidden items-center gap-0.5 rounded-lg border border-surface-200 p-0.5 dark:border-surface-700 sm:flex">
            <button
              onClick={() => setView('steps')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                view === 'steps'
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                  : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              )}
            >
              <ListOrdered className="h-3.5 w-3.5" /> Steps
            </button>
            <button
              onClick={() => setView('canvas')}
              className={cn(
                'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                view === 'canvas'
                  ? 'bg-brand-50 text-brand-700 dark:bg-brand-950/50 dark:text-brand-300'
                  : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
              )}
            >
              <Workflow className="h-3.5 w-3.5" /> Canvas
            </button>
          </div>
          {published && (
            <Badge tone="green" dot className="hidden sm:inline-flex">
              Live
            </Badge>
          )}
          <ThemeToggle />
          <Button size="sm" variant="secondary" onClick={() => setTestOpen(true)}>
            <Play className="h-4 w-4" /> <span className="hidden sm:inline">Test</span>
          </Button>
          <Button size="sm" variant="secondary" onClick={save}>
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            <span className="hidden sm:inline">{saved ? 'Saved!' : 'Save'}</span>
          </Button>
          <Button size="sm" variant="success" onClick={publish}>
            <Rocket className="h-4 w-4" /> {published ? 'Published' : 'Publish'}
          </Button>
        </div>
      </header>

      {/* New-chatbot success banner */}
      {showBanner && (
        <div className="flex shrink-0 items-center gap-2.5 border-b border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span className="flex-1">
            <strong>{botName || 'Your chatbot'}</strong> was created. Now design its conversation —
            drag blocks from the left and connect them.
          </span>
          <button
            onClick={() => setShowBanner(false)}
            className="rounded-lg p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Body */}
      <div className="flex min-h-0 flex-1">
        {view === 'canvas' ? (
          <>
        <div className="hidden lg:block">
          <NodePalette onAdd={addNode} />
        </div>

        <div className="relative min-w-0 flex-1" ref={wrapperRef}>
          <FlowActionsContext.Provider value={flowActions}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={(_, node) => setSelectedId(node.id)}
            onPaneClick={() => setSelectedId(null)}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            defaultEdgeOptions={defaultEdgeOptions}
            colorMode={theme}
            fitView
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={16} size={1.5} />
            <Controls />
            <MiniMap pannable zoomable className="!hidden sm:!block" />
            <Panel position="bottom-center" className="lg:hidden">
              <div className="rounded-lg bg-surface-900/90 px-3 py-1.5 text-xs text-white">
                Open on a larger screen to drag in new blocks
              </div>
            </Panel>
          </ReactFlow>
          </FlowActionsContext.Provider>
        </div>

        {selectedNode && (
          <NodeProperties
            node={selectedNode}
            onChange={updateNodeData}
            onDelete={deleteNode}
            onDuplicate={duplicateNode}
            onClose={() => setSelectedId(null)}
          />
        )}
          </>
        ) : (
          <div className="flex-1 overflow-y-auto bg-surface-50 dark:bg-surface-950">
            <StepsBuilder
              steps={steps}
              onInsert={insertStep}
              onInsertExisting={insertJump}
              onUpdate={updateStep}
              onDelete={removeStep}
              onMove={moveStep}
              onReorder={reorderSteps}
            />
          </div>
        )}
      </div>

      {/* Block picker — opened from a node's "+" button, auto-connects */}
      {addMenu && (
        <NodePicker
          onSelect={addConnectedNode}
          onClose={() => setAddMenu(null)}
          onSelectExisting={connectToExisting}
          existing={nodes
            .filter((n) => n.type !== 'start' && n.id !== addMenu.sourceId)
            .map((n) => ({
              id: n.id,
              kind: n.data.kind,
              label: flowCatalog[n.data.kind]?.label || 'Block',
              summary: nodeSummary(n.data.kind, n.data),
            }))}
        />
      )}

      {/* Playground — runs the flow you built */}
      {testOpen && testGraph && (
        <FlowPlayground
          nodes={testGraph.nodes}
          edges={testGraph.edges}
          botName={botName || 'Chatbot'}
          themeColor={themeColor}
          onClose={() => setTestOpen(false)}
        />
      )}

      {/* Publish confirmation */}
      <Modal
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        title="🎉 Your chatbot is live!"
        description={`${botName || 'Your chatbot'} is now published and ready to greet visitors.`}
        footer={
          <>
            <Button variant="secondary" onClick={() => setPublishOpen(false)}>
              Keep editing
            </Button>
            <Button as={Link} to="/app/install" onClick={() => setPublishOpen(false)}>
              <Code2 className="h-4 w-4" /> Get install code
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
            <Rocket className="h-5 w-5 shrink-0" />
            <span>
              This version of <strong>{flowName}</strong> ({blockCount} blocks) has been deployed.
              Visitors will see it on every page where your widget is installed.
            </span>
          </div>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Add the widget to your website to go live — or test the conversation first using the{' '}
            <strong>Test</strong> button.
          </p>
        </div>
      </Modal>
    </div>
  )
}

export default function FlowBuilder() {
  return (
    <ReactFlowProvider>
      <Builder />
    </ReactFlowProvider>
  )
}
