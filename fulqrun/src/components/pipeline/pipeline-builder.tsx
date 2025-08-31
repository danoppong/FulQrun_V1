'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Plus, 
  GripVertical, 
  Edit, 
  Trash2, 
  Zap, 
  Clock,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

interface PipelineStage {
  id: string
  name: string
  peakPhase: 'prospect' | 'engage' | 'acquire' | 'keep'
  probabilityDefault: number
  color: string
  automations: Automation[]
  requirements: string[]
  duration: number // days
}

interface Automation {
  id: string
  type: 'email' | 'task' | 'notification' | 'webhook'
  trigger: 'stage_entry' | 'stage_exit' | 'time_delay' | 'field_change'
  action: string
  delay?: number
  conditions?: Record<string, unknown>
}

const defaultStages: PipelineStage[] = [
  {
    id: '1',
    name: 'Prospecting',
    peakPhase: 'prospect',
    probabilityDefault: 10,
    color: '#94a3b8',
    automations: [],
    requirements: ['Contact information', 'Company research'],
    duration: 7
  },
  {
    id: '2',
    name: 'Initial Contact',
    peakPhase: 'prospect',
    probabilityDefault: 20,
    color: '#64748b',
    automations: [],
    requirements: ['First meeting scheduled', 'Basic needs identified'],
    duration: 14
  },
  {
    id: '3',
    name: 'Qualification',
    peakPhase: 'engage',
    probabilityDefault: 30,
    color: '#3b82f6',
    automations: [],
    requirements: ['MEDDPICC started', 'Budget confirmed'],
    duration: 21
  },
  {
    id: '4',
    name: 'Needs Analysis',
    peakPhase: 'engage',
    probabilityDefault: 40,
    color: '#1d4ed8',
    automations: [],
    requirements: ['Pain points identified', 'Solution fit confirmed'],
    duration: 28
  },
  {
    id: '5',
    name: 'Proposal',
    peakPhase: 'engage',
    probabilityDefault: 60,
    color: '#16a34a',
    automations: [],
    requirements: ['Proposal sent', 'Decision criteria met'],
    duration: 14
  },
  {
    id: '6',
    name: 'Negotiation',
    peakPhase: 'acquire',
    probabilityDefault: 80,
    color: '#15803d',
    automations: [],
    requirements: ['Terms agreed', 'Legal review started'],
    duration: 21
  },
  {
    id: '7',
    name: 'Closed Won',
    peakPhase: 'acquire',
    probabilityDefault: 100,
    color: '#22c55e',
    automations: [],
    requirements: ['Contract signed', 'Payment terms agreed'],
    duration: 1
  },
  {
    id: '8',
    name: 'Customer Success',
    peakPhase: 'keep',
    probabilityDefault: 100,
    color: '#a855f7',
    automations: [],
    requirements: ['Onboarding complete', 'Success metrics defined'],
    duration: 90
  }
]

function SortableStage({ stage, onEdit, onDelete }: { 
  stage: PipelineStage
  onEdit: (stage: PipelineStage) => void
  onDelete: (id: string) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: stage.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const getPeakPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'prospect': return '🎯'
      case 'engage': return '🤝'
      case 'acquire': return '💰'
      case 'keep': return '❤️'
      default: return '📊'
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border rounded-lg p-4 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
          >
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              {getPeakPhaseIcon(stage.peakPhase)} {stage.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              PEAK: {stage.peakPhase} • {stage.probabilityDefault}% probability
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => onEdit(stage)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(stage.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-3 w-3" />
          <span>{stage.duration} days avg</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Target className="h-3 w-3" />
          <span>{stage.requirements.length} requirements</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Zap className="h-3 w-3" />
          <span>{stage.automations.length} automations</span>
        </div>
      </div>

      {stage.requirements.length > 0 && (
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground mb-1">Requirements:</p>
          <ul className="text-xs space-y-1">
            {stage.requirements.slice(0, 2).map((req, index) => (
              <li key={index} className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                {req}
              </li>
            ))}
            {stage.requirements.length > 2 && (
              <li className="text-muted-foreground">+{stage.requirements.length - 2} more...</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

interface PipelineBuilderProps {
  organizationId?: string
}

export function PipelineBuilder({ organizationId: _organizationId }: PipelineBuilderProps) {
  const [stages, setStages] = useState<PipelineStage[]>(defaultStages)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingStage, setEditingStage] = useState<PipelineStage | null>(null)
  const [isAddingStage, setIsAddingStage] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setStages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }, [])

  const handleEditStage = (stage: PipelineStage) => {
    setEditingStage(stage)
    setIsEditModalOpen(true)
  }

  const handleDeleteStage = (id: string) => {
    setStages(prev => prev.filter(stage => stage.id !== id))
  }

  const handleAddStage = () => {
    const newStage: PipelineStage = {
      id: Date.now().toString(),
      name: 'New Stage',
      peakPhase: 'engage',
      probabilityDefault: 50,
      color: '#3b82f6',
      automations: [],
      requirements: [],
      duration: 14
    }
    setEditingStage(newStage)
    setIsAddingStage(true)
    setIsEditModalOpen(true)
  }

  const handleSaveStage = (updatedStage: PipelineStage) => {
    if (isAddingStage) {
      setStages(prev => [...prev, updatedStage])
      setIsAddingStage(false)
    } else {
      setStages(prev => prev.map(stage => 
        stage.id === updatedStage.id ? updatedStage : stage
      ))
    }
    setIsEditModalOpen(false)
    setEditingStage(null)
  }

  const savePipeline = async () => {
    try {
      // In production, this would save to Supabase
      console.log('Saving pipeline configuration:', stages)
      alert('Pipeline configuration saved successfully!')
    } catch (error) {
      console.error('Error saving pipeline:', error)
      alert('Failed to save pipeline configuration')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pipeline Builder</h2>
          <p className="text-muted-foreground">
            Configure your sales pipeline with PEAK methodology and workflow automation
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddStage}>
            <Plus className="mr-2 h-4 w-4" />
            Add Stage
          </Button>
          <Button onClick={savePipeline}>
            Save Pipeline
          </Button>
        </div>
      </div>

      {/* PEAK Process Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRight className="mr-2 h-5 w-5" />
            PEAK Process Flow
          </CardTitle>
          <CardDescription>
            Your pipeline stages mapped to the PEAK methodology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {['prospect', 'engage', 'acquire', 'keep'].map((phase) => {
              const phaseStages = stages.filter(s => s.peakPhase === phase)
              return (
                <div key={phase} className="text-center">
                  <div className={`w-full h-2 rounded-full mb-2 ${
                    phase === 'prospect' ? 'bg-gray-400' :
                    phase === 'engage' ? 'bg-blue-400' :
                    phase === 'acquire' ? 'bg-green-400' : 'bg-purple-400'
                  }`} />
                  <p className="font-medium capitalize">{phase}</p>
                  <p className="text-sm text-muted-foreground">{phaseStages.length} stages</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Drag and Drop Pipeline Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Stages</CardTitle>
          <CardDescription>
            Drag and drop to reorder stages. Click to edit stage details and automations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={stages.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {stages.map((stage) => (
                  <SortableStage
                    key={stage.id}
                    stage={stage}
                    onEdit={handleEditStage}
                    onDelete={handleDeleteStage}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </CardContent>
      </Card>

      {/* Stage Edit Modal */}
      {editingStage && (
        <StageEditModal
          stage={editingStage}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingStage(null)
            setIsAddingStage(false)
          }}
          onSave={handleSaveStage}
        />
      )}
    </div>
  )
}

function StageEditModal({ 
  stage, 
  isOpen, 
  onClose, 
  onSave 
}: { 
  stage: PipelineStage
  isOpen: boolean
  onClose: () => void
  onSave: (stage: PipelineStage) => void
}) {
  const [editedStage, setEditedStage] = useState<PipelineStage>(stage)

  const handleSave = () => {
    onSave(editedStage)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pipeline Stage</DialogTitle>
          <DialogDescription>
            Configure stage details, requirements, and automations
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Stage Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stage Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stage-name">Stage Name</Label>
                <Input
                  id="stage-name"
                  value={editedStage.name}
                  onChange={(e) => setEditedStage(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="peak-phase">PEAK Phase</Label>
                <select
                  id="peak-phase"
                  value={editedStage.peakPhase}
                  onChange={(e) => setEditedStage(prev => ({ 
                    ...prev, 
                    peakPhase: e.target.value as PipelineStage['peakPhase']
                  }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="prospect">Prospect</option>
                  <option value="engage">Engage</option>
                  <option value="acquire">Acquire</option>
                  <option value="keep">Keep</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="probability">Default Probability (%)</Label>
                <Input
                  id="probability"
                  type="number"
                  min="0"
                  max="100"
                  value={editedStage.probabilityDefault}
                  onChange={(e) => setEditedStage(prev => ({ 
                    ...prev, 
                    probabilityDefault: parseInt(e.target.value) || 0 
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="duration">Average Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={editedStage.duration}
                  onChange={(e) => setEditedStage(prev => ({ 
                    ...prev, 
                    duration: parseInt(e.target.value) || 1 
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Stage Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Stage Requirements</h3>
            <div className="space-y-2">
              {editedStage.requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={req}
                    onChange={(e) => {
                      const newReqs = [...editedStage.requirements]
                      newReqs[index] = e.target.value
                      setEditedStage(prev => ({ ...prev, requirements: newReqs }))
                    }}
                    placeholder="Enter requirement"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newReqs = editedStage.requirements.filter((_, i) => i !== index)
                      setEditedStage(prev => ({ ...prev, requirements: newReqs }))
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => setEditedStage(prev => ({ 
                  ...prev, 
                  requirements: [...prev.requirements, ''] 
                }))}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Requirement
              </Button>
            </div>
          </div>

          {/* Automations Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Workflow Automations</h3>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Available in Phase 2:</p>
              <ul className="text-sm space-y-1">
                <li>• Automatic email sequences</li>
                <li>• Task creation and assignment</li>
                <li>• Slack/Teams notifications</li>
                <li>• CRM field updates</li>
                <li>• Integration webhooks</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Stage
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}