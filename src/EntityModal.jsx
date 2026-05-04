import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const ENTITY_TYPE_LABELS = {
  family: 'Family',
  meal: 'Meal',
  activity: 'Activity',
  expense: 'Expense',
  task: 'Task',
  location: 'Location',
}

const DAY_OPTIONS = [
  { value: 'thu', label: 'Thu 4/09' },
  { value: 'fri', label: 'Fri 4/10' },
  { value: 'sat', label: 'Sat 4/11' },
  { value: 'sun', label: 'Sun 4/12' },
]

const DAY_OPTIONS_WITH_ALL = [
  { value: 'all', label: 'All days' },
  ...DAY_OPTIONS,
]

function ModalField({ label, required, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">
        {label}
        {required && <span className="ml-1 text-[#F85149]">*</span>}
      </label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, required, className }) {
  return (
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={cn(
        'w-full border border-[#30363D] bg-[#0d1117] px-3 py-2 text-[12px] text-[#C9D1D9] placeholder-[#4B5563] transition-colors focus:border-[#58A6FF] focus:outline-none',
        className,
      )}
    />
  )
}

function SelectInput({ value, onChange, options }) {
  return (
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-[#30363D] bg-[#0d1117] px-3 py-2 text-[12px] text-[#C9D1D9] transition-colors focus:border-[#58A6FF] focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none border border-[#30363D] bg-[#0d1117] px-3 py-2 text-[12px] text-[#C9D1D9] placeholder-[#4B5563] transition-colors focus:border-[#58A6FF] focus:outline-none"
    />
  )
}

function FamilyForm({ values, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Family name" required>
          <TextInput
            value={values.name}
            onChange={(v) => onChange('name', v)}
            placeholder="e.g. Parkers"
            required
          />
        </ModalField>
        <ModalField label="Code (2–3 chars)">
          <TextInput
            value={values.shortOrigin}
            onChange={(v) => onChange('shortOrigin', v)}
            placeholder="LA"
          />
        </ModalField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Origin city">
          <TextInput
            value={values.origin}
            onChange={(v) => onChange('origin', v)}
            placeholder="Los Angeles"
          />
        </ModalField>
        <ModalField label="Headcount">
          <TextInput
            value={values.headcount}
            onChange={(v) => onChange('headcount', v)}
            placeholder="2 adults, 1 kid"
          />
        </ModalField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Vehicle">
          <TextInput value={values.vehicle} onChange={(v) => onChange('vehicle', v)} placeholder="SUV" />
        </ModalField>
        <ModalField label="Arrival day">
          <SelectInput
            value={values.arrivalDayId}
            onChange={(v) => onChange('arrivalDayId', v)}
            options={DAY_OPTIONS}
          />
        </ModalField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="ETA">
          <TextInput value={values.eta} onChange={(v) => onChange('eta', v)} placeholder="Thu 4:00 PM" />
        </ModalField>
        <ModalField label="Drive time">
          <TextInput
            value={values.driveTime}
            onChange={(v) => onChange('driveTime', v)}
            placeholder="5.5 hrs"
          />
        </ModalField>
      </div>
      <ModalField label="Responsibility">
        <TextInput
          value={values.responsibility}
          onChange={(v) => onChange('responsibility', v)}
          placeholder="Firewood + snacks"
        />
      </ModalField>
      <ModalField label="Route summary">
        <Textarea
          value={values.routeSummary}
          onChange={(v) => onChange('routeSummary', v)}
          placeholder="Describe the drive plan..."
          rows={2}
        />
      </ModalField>
      <ModalField label="Notes">
        <Textarea
          value={values.note}
          onChange={(v) => onChange('note', v)}
          placeholder="Operational notes..."
          rows={2}
        />
      </ModalField>
    </div>
  )
}

function MealForm({ values, onChange }) {
  return (
    <div className="space-y-4">
      <ModalField label="Meal / restaurant name" required>
        <TextInput
          value={values.title}
          onChange={(v) => onChange('title', v)}
          placeholder="e.g. Two Guys Pizza Pies"
          required
        />
      </ModalField>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Day">
          <SelectInput
            value={values.dayId}
            onChange={(v) => onChange('dayId', v)}
            options={DAY_OPTIONS}
          />
        </ModalField>
        <ModalField label="Time">
          <TextInput
            value={values.timeLabel}
            onChange={(v) => onChange('timeLabel', v)}
            placeholder="6:00 PM"
          />
        </ModalField>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Type">
          <TextInput
            value={values.reservationType}
            onChange={(v) => onChange('reservationType', v)}
            placeholder="Walk-in, Cook-in, Pack-out"
          />
        </ModalField>
        <ModalField label="Owner">
          <TextInput
            value={values.owner}
            onChange={(v) => onChange('owner', v)}
            placeholder="Shared, Walk-in"
          />
        </ModalField>
      </div>
      <ModalField label="Notes">
        <Textarea
          value={values.note}
          onChange={(v) => onChange('note', v)}
          placeholder="Logistics notes..."
          rows={3}
        />
      </ModalField>
    </div>
  )
}

function ActivityForm({ values, onChange }) {
  return (
    <div className="space-y-4">
      <ModalField label="Activity title" required>
        <TextInput
          value={values.title}
          onChange={(v) => onChange('title', v)}
          placeholder="e.g. Yosemite Day"
          required
        />
      </ModalField>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Day">
          <SelectInput
            value={values.dayId}
            onChange={(v) => onChange('dayId', v)}
            options={DAY_OPTIONS}
          />
        </ModalField>
        <ModalField label="Status">
          <SelectInput
            value={values.status}
            onChange={(v) => onChange('status', v)}
            options={[
              { value: 'Go', label: 'Go' },
              { value: 'Watch', label: 'Watch' },
              { value: 'Pending', label: 'Pending' },
            ]}
          />
        </ModalField>
      </div>
      <ModalField label="Time window">
        <TextInput
          value={values.window}
          onChange={(v) => onChange('window', v)}
          placeholder="Sat / early start"
        />
      </ModalField>
      <ModalField label="Description">
        <Textarea
          value={values.description}
          onChange={(v) => onChange('description', v)}
          placeholder="What this activity involves..."
          rows={3}
        />
      </ModalField>
      <ModalField label="Fallback plan">
        <Textarea
          value={values.backup}
          onChange={(v) => onChange('backup', v)}
          placeholder="If conditions change..."
          rows={2}
        />
      </ModalField>
    </div>
  )
}

function ExpenseForm({ values, onChange, families }) {
  return (
    <div className="space-y-4">
      <ModalField label="Expense label" required>
        <TextInput
          value={values.label}
          onChange={(v) => onChange('label', v)}
          placeholder="e.g. Basecamp booking"
          required
        />
      </ModalField>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Amount ($)">
          <input
            type="number"
            value={values.amount || ''}
            onChange={(e) => onChange('amount', Number(e.target.value) || 0)}
            placeholder="0"
            min="0"
            step="0.01"
            className="w-full border border-[#30363D] bg-[#0d1117] px-3 py-2 font-mono text-[12px] text-[#C9D1D9] placeholder-[#4B5563] transition-colors focus:border-[#58A6FF] focus:outline-none"
          />
        </ModalField>
        <ModalField label="Payer">
          <SelectInput
            value={values.payerFamilyId || ''}
            onChange={(v) => {
              const family = families.find((f) => f.id === v)
              onChange('payerFamilyId', v)
              onChange('payer', family?.title || (v === 'each' ? 'Each family' : 'Unassigned'))
            }}
            options={[
              { value: '', label: 'Unassigned' },
              ...families.map((f) => ({ value: f.id, label: f.title })),
              { value: 'each', label: 'Each family' },
            ]}
          />
        </ModalField>
      </div>
      <ModalField label="Notes">
        <Textarea
          value={values.note}
          onChange={(v) => onChange('note', v)}
          placeholder="Context or instructions..."
          rows={2}
        />
      </ModalField>
    </div>
  )
}

function TaskForm({ values, onChange, families }) {
  return (
    <div className="space-y-4">
      <ModalField label="Task title" required>
        <TextInput
          value={values.title}
          onChange={(v) => onChange('title', v)}
          placeholder="e.g. Pack road snacks"
          required
        />
      </ModalField>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Day">
          <SelectInput
            value={values.dayId}
            onChange={(v) => onChange('dayId', v)}
            options={DAY_OPTIONS_WITH_ALL}
          />
        </ModalField>
        <ModalField label="Assigned family">
          <SelectInput
            value={values.ownerFamilyId || ''}
            onChange={(v) => onChange('ownerFamilyId', v || null)}
            options={[
              { value: '', label: 'All families' },
              ...families.map((f) => ({ value: f.id, label: f.title })),
            ]}
          />
        </ModalField>
      </div>
      <ModalField label="Notes">
        <Textarea
          value={values.note}
          onChange={(v) => onChange('note', v)}
          placeholder="Additional context..."
          rows={2}
        />
      </ModalField>
    </div>
  )
}

function LocationForm({ values, onChange }) {
  return (
    <div className="space-y-4">
      <ModalField label="Location name" required>
        <TextInput
          value={values.title}
          onChange={(v) => onChange('title', v)}
          placeholder="e.g. The Grill at Pine Mountain Lake"
          required
        />
      </ModalField>
      <div className="grid grid-cols-2 gap-4">
        <ModalField label="Category">
          <SelectInput
            value={values.category}
            onChange={(v) => onChange('category', v)}
            options={[
              { value: 'stay', label: 'Stay' },
              { value: 'meal', label: 'Meal' },
              { value: 'activity', label: 'Activity' },
              { value: 'logistics', label: 'Logistics' },
              { value: 'park', label: 'Park' },
            ]}
          />
        </ModalField>
        <ModalField label="Day">
          <SelectInput
            value={values.dayId}
            onChange={(v) => onChange('dayId', v)}
            options={DAY_OPTIONS_WITH_ALL}
          />
        </ModalField>
      </div>
      <ModalField label="Address">
        <TextInput
          value={values.address}
          onChange={(v) => onChange('address', v)}
          placeholder="Street address or area"
        />
      </ModalField>
      <ModalField label="External URL (maps / booking)">
        <TextInput
          value={values.externalUrl}
          onChange={(v) => onChange('externalUrl', v)}
          placeholder="https://maps.google.com/..."
        />
      </ModalField>
      <ModalField label="Summary">
        <Textarea
          value={values.summary}
          onChange={(v) => onChange('summary', v)}
          placeholder="Why this location matters..."
          rows={3}
        />
      </ModalField>
    </div>
  )
}

function getDefaults(entityType) {
  switch (entityType) {
    case 'family':
      return {
        name: '',
        shortOrigin: '',
        origin: '',
        headcount: '2 adults, 1 kid',
        vehicle: 'SUV',
        responsibility: '',
        arrivalDayId: 'thu',
        status: 'Transit',
        eta: '',
        driveTime: '',
        routeSummary: '',
        note: '',
      }
    case 'meal':
      return { title: '', dayId: 'fri', timeLabel: '', reservationType: 'Shared', owner: 'Shared', note: '' }
    case 'activity':
      return {
        title: '',
        dayId: 'fri',
        window: 'Fri / flexible',
        status: 'Pending',
        description: '',
        backup: '',
      }
    case 'expense':
      return { label: '', amount: 0, payer: 'Unassigned', payerFamilyId: '', note: '' }
    case 'task':
      return { title: '', dayId: 'all', ownerFamilyId: '', note: '' }
    case 'location':
      return { title: '', category: 'meal', dayId: 'all', address: '', externalUrl: '', summary: '' }
    default:
      return {}
  }
}

export function EntityModal({ modal, families, onClose, onConfirm }) {
  const [values, setValues] = useState({})
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!modal) return
    const defaults = getDefaults(modal.entityType)
    setValues(modal.mode === 'add' ? defaults : { ...defaults, ...(modal.entity || {}) })
    setConfirmDelete(modal.initialConfirmDelete || false)
  }, [modal])

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal, onClose])

  if (!modal) return null

  const update = (key, val) => setValues((v) => ({ ...v, [key]: val }))
  const entityLabel = ENTITY_TYPE_LABELS[modal.entityType] || modal.entityType
  const isAdd = modal.mode === 'add'

  const handleConfirm = () => {
    if (confirmDelete) {
      onConfirm({ mode: 'delete', entityType: modal.entityType, entity: modal.entity, values })
    } else {
      onConfirm({ mode: modal.mode, entityType: modal.entityType, entity: modal.entity, values })
    }
  }

  const renderForm = () => {
    switch (modal.entityType) {
      case 'family':
        return <FamilyForm values={values} onChange={update} />
      case 'meal':
        return <MealForm values={values} onChange={update} />
      case 'activity':
        return <ActivityForm values={values} onChange={update} />
      case 'expense':
        return <ExpenseForm values={values} onChange={update} families={families} />
      case 'task':
        return <TaskForm values={values} onChange={update} families={families} />
      case 'location':
        return <LocationForm values={values} onChange={update} />
      default:
        return null
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="relative flex w-full max-w-lg flex-col border border-[#30363D] bg-[#161b22] shadow-2xl"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#30363D] px-5 py-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">
              {isAdd ? 'New' : confirmDelete ? 'Remove' : 'Edit'} &mdash; {entityLabel}
            </div>
            <h2 className="mt-0.5 text-[13px] font-black uppercase tracking-widest text-[#C9D1D9]">
              {isAdd
                ? `Add ${entityLabel}`
                : confirmDelete
                  ? `Remove ${entityLabel}`
                  : `Edit ${entityLabel}`}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8B949E] transition-colors hover:text-[#C9D1D9]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="min-h-0 overflow-y-auto px-5 py-5">
          {confirmDelete ? (
            <div className="flex items-start gap-3 border border-[#F85149]/30 bg-[#F85149]/5 p-4">
              <AlertTriangle size={16} className="mt-0.5 shrink-0 text-[#F85149]" />
              <div>
                <div className="text-[12px] font-bold text-[#F85149]">Confirm removal</div>
                <div className="mt-1 text-[11px] leading-relaxed text-[#8B949E]">
                  This will permanently remove this {entityLabel.toLowerCase()} from the plan. This action cannot be undone.
                </div>
              </div>
            </div>
          ) : (
            renderForm()
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-[#30363D] px-5 py-4">
          {!isAdd && !confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#F85149]/60 transition-colors hover:text-[#F85149]"
            >
              <Trash2 size={12} />
              Remove
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={confirmDelete ? () => setConfirmDelete(false) : onClose}
              className="border border-[#30363D] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#8B949E] transition-colors hover:border-[#58A6FF]/30 hover:text-[#C9D1D9]"
            >
              {confirmDelete ? 'Back' : 'Cancel'}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className={cn(
                'border px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors',
                confirmDelete
                  ? 'border-[#F85149]/30 bg-[#F85149]/15 text-[#F85149] hover:bg-[#F85149]/25'
                  : 'border-[#58A6FF]/30 bg-[#58A6FF]/15 text-[#58A6FF] hover:bg-[#58A6FF]/25',
              )}
            >
              {confirmDelete ? 'Confirm Remove' : isAdd ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
