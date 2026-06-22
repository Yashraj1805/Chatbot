import { createContext } from 'react'

// Lets custom node components call back into the FlowBuilder (edit / delete)
// without threading callbacks through node data.
export const FlowActionsContext = createContext(null)
