import { useState } from 'react'
import { X } from 'lucide-react'
import { Label, Input, Textarea, Select } from '../ui/Input.jsx'
import Button from '../ui/Button.jsx'

// Renders a catalog node's editable fields. Shared by the canvas properties
// panel and the classic steps editor.
export default function NodeFields({ fields, data, onChange }) {
  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <FieldEditor key={f.key} field={f} value={data[f.key]} onChange={(v) => onChange(f.key, v)} />
      ))}
    </div>
  )
}

function FieldEditor({ field, value, onChange }) {
  return (
    <div>
      <Label>{field.label}</Label>
      {field.type === 'textarea' && (
        <Textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} rows={3} />
      )}
      {field.type === 'text' && (
        <div className="relative">
          {field.prefix && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-surface-400">
              {field.prefix}
            </span>
          )}
          <Input
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={field.prefix ? 'pl-7' : ''}
          />
        </div>
      )}
      {field.type === 'number' && (
        <Input type="number" value={value ?? ''} onChange={(e) => onChange(Number(e.target.value))} placeholder={field.placeholder} />
      )}
      {field.type === 'select' && (
        <Select value={value ?? field.options[0]} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      )}
      {field.type === 'tags' && <TagInput value={value ?? []} onChange={onChange} placeholder={field.placeholder} />}
    </div>
  )
}

function TagInput({ value, onChange, placeholder }) {
  const [text, setText] = useState('')
  const add = () => {
    const t = text.trim()
    if (t && !value.includes(t)) onChange([...value, t])
    setText('')
  }
  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              add()
            }
          }}
          placeholder={placeholder}
        />
        <Button type="button" variant="secondary" size="sm" onClick={add}>
          Add
        </Button>
      </div>
      {value.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">
              {tag}
              <button onClick={() => onChange(value.filter((t) => t !== tag))} className="hover:text-brand-900 dark:hover:text-white" aria-label={`Remove ${tag}`}>
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
