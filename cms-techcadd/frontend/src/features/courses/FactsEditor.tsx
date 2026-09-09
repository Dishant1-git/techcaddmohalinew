import { Plus, Trash2 } from 'lucide-react'

import { Button } from '../../components/common/Button'
import { SortableList } from '../../components/data/SortableList'
import { EmptyState } from '../../components/common/EmptyState'
import { FormField } from '../../components/form/FormField'
import { Input } from '../../components/form/Input'
import { createId } from '../../lib/id'

export interface CourseFact {
  id: string
  label: string
  value: string
  icon: string
  suffix: string
}

interface FactsEditorProps {
  value: CourseFact[]
  onChange: (value: CourseFact[]) => void
}

/**
 * The strip of facts under the course hero.
 *
 * Empty is a real answer, not an unfinished one: with no rows the website
 * prints the four its section already generates — duration, mode, eligibility
 * and what's included — so a course nobody has touched keeps the strip it has
 * today. Adding a single row replaces all four, which is why the empty state
 * says so rather than just inviting a first entry.
 */
export function FactsEditor({ value, onChange }: FactsEditorProps) {
  function patch(id: string, next: Partial<CourseFact>) {
    onChange(value.map((fact) => (fact.id === id ? { ...fact, ...next } : fact)))
  }

  function add() {
    onChange([...value, { id: createId('fact'), label: '', value: '', icon: '', suffix: '' }])
  }

  return (
    <div className="space-y-3">
      {value.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200">
          <EmptyState
            icon={Plus}
            title="Using the generated facts"
            description="Duration, mode, eligibility and what's included are filled in from this course's details. Add a fact here to take over the whole strip."
          />
        </div>
      ) : (
        <SortableList
          items={value}
          getId={(fact) => fact.id}
          onReorder={onChange}
          renderItem={(fact, index) => (
            <div className="flex items-start gap-2">
              <span className="mt-2 text-xs font-semibold text-slate-400">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Label, value and suffix sit in a row once there is room for
                  one. Below `sm` they stack: three inputs and a delete button
                  across a 390px screen leaves each about seventy pixels, which
                  is narrower than the text it holds. */}
              <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[1fr_1fr_5rem]">
                <div className="min-w-0">
                <FormField label={`Fact ${index + 1} label`} hideLabel>
                  <Input
                    value={fact.label}
                    onChange={(event) => patch(fact.id, { label: event.target.value })}
                    placeholder="Duration"
                    aria-label={`Fact ${index + 1} label`}
                  />
                </FormField>
                </div>

                <div className="min-w-0">
                <FormField label={`Fact ${index + 1} value`} hideLabel>
                  <Input
                    value={fact.value}
                    onChange={(event) => patch(fact.id, { value: event.target.value })}
                    placeholder="3 – 9 Months"
                    aria-label={`Fact ${index + 1} value`}
                  />
                </FormField>
                </div>

                {/* Printed after the value in a lighter weight — "+", "★". */}
                <div className="min-w-0">
                <FormField label={`Fact ${index + 1} suffix`} hideLabel>
                  <Input
                    value={fact.suffix}
                    onChange={(event) => patch(fact.id, { suffix: event.target.value })}
                    placeholder="+"
                    aria-label={`Fact ${index + 1} suffix`}
                  />
                </FormField>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                icon={Trash2}
                aria-label={`Remove fact ${index + 1}`}
                className="mt-0.5 text-rose-600 hover:bg-rose-50"
                onClick={() => onChange(value.filter((entry) => entry.id !== fact.id))}
              />
            </div>
          )}
        />
      )}

      <Button variant="secondary" size="sm" icon={Plus} onClick={add}>
        Add fact
      </Button>
    </div>
  )
}
