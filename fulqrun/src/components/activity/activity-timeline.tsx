'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { 
  Plus, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

interface Activity {
  id: string
  type: 'email' | 'call' | 'meeting' | 'task' | 'note'
  subject: string
  description: string
  status: 'pending' | 'completed' | 'cancelled'
  dueDate?: string
  completedAt?: string
  createdAt: string
  createdBy: string
  relatedTo?: {
    type: 'lead' | 'opportunity' | 'contact' | 'company'
    id: string
    name: string
  }
}

// Mock activity data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'email',
    subject: 'Follow-up on proposal discussion',
    description: 'Sent follow-up email regarding the CRM proposal',
    status: 'completed',
    completedAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-15T10:30:00Z',
    createdBy: 'John Doe',
    relatedTo: { type: 'opportunity', id: '1', name: 'Enterprise CRM - Acme Corp' }
  },
  {
    id: '2',
    type: 'call',
    subject: 'Discovery call with Sarah Williams',
    description: 'Initial discovery call to understand requirements',
    status: 'completed',
    completedAt: '2024-01-14T14:00:00Z',
    createdAt: '2024-01-14T14:00:00Z',
    createdBy: 'John Doe',
    relatedTo: { type: 'contact', id: '1', name: 'Sarah Williams' }
  },
  {
    id: '3',
    type: 'meeting',
    subject: 'Product demo for TechStart team',
    description: 'Schedule product demonstration for key stakeholders',
    status: 'pending',
    dueDate: '2024-01-18T15:00:00Z',
    createdAt: '2024-01-13T09:00:00Z',
    createdBy: 'John Doe',
    relatedTo: { type: 'opportunity', id: '2', name: 'Sales Automation - TechStart' }
  },
  {
    id: '4',
    type: 'task',
    subject: 'Research Global Systems competitors',
    description: 'Analyze competitive landscape for Global Systems opportunity',
    status: 'pending',
    dueDate: '2024-01-16T17:00:00Z',
    createdAt: '2024-01-12T11:00:00Z',
    createdBy: 'John Doe',
    relatedTo: { type: 'company', id: '3', name: 'Global Systems' }
  },
  {
    id: '5',
    type: 'note',
    subject: 'Champion identified at Acme Corp',
    description: 'Mike Johnson (VP Sales) has agreed to champion our solution internally',
    status: 'completed',
    completedAt: '2024-01-11T16:45:00Z',
    createdAt: '2024-01-11T16:45:00Z',
    createdBy: 'John Doe',
    relatedTo: { type: 'opportunity', id: '1', name: 'Enterprise CRM - Acme Corp' }
  }
]

interface ActivityTimelineProps {
  relatedTo?: {
    type: 'lead' | 'opportunity' | 'contact' | 'company'
    id: string
    name: string
  }
  showAddButton?: boolean
}

export function ActivityTimeline({ relatedTo, showAddButton = true }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false)
  const [newActivity, setNewActivity] = useState({
    type: 'task' as Activity['type'],
    subject: '',
    description: '',
    dueDate: ''
  })

  // Filter activities if relatedTo is specified
  const filteredActivities = relatedTo 
    ? activities.filter(activity => 
        activity.relatedTo?.type === relatedTo.type && 
        activity.relatedTo?.id === relatedTo.id
      )
    : activities

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />
      case 'call':
        return <Phone className="h-4 w-4 text-green-600" />
      case 'meeting':
        return <Calendar className="h-4 w-4 text-purple-600" />
      case 'task':
        return <CheckCircle className="h-4 w-4 text-orange-600" />
      case 'note':
        return <FileText className="h-4 w-4 text-gray-600" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case 'pending':
        return <Clock className="h-3 w-3 text-yellow-600" />
      case 'cancelled':
        return <AlertCircle className="h-3 w-3 text-red-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleAddActivity = () => {
    const activity: Activity = {
      id: Date.now().toString(),
      ...newActivity,
      status: 'pending',
      createdAt: new Date().toISOString(),
      createdBy: 'Current User',
      relatedTo: relatedTo
    }

    setActivities(prev => [activity, ...prev])
    setNewActivity({
      type: 'task',
      subject: '',
      description: '',
      dueDate: ''
    })
    setIsAddActivityModalOpen(false)
  }

  const markAsCompleted = (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? { ...activity, status: 'completed' as const, completedAt: new Date().toISOString() }
        : activity
    ))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Activity Timeline
            </CardTitle>
            <CardDescription>
              {relatedTo ? `Activities for ${relatedTo.name}` : 'Recent activities across all records'}
            </CardDescription>
          </div>
          {showAddButton && (
            <Button onClick={() => setIsAddActivityModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted">
                    {getActivityIcon(activity.type)}
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="h-8 w-px bg-border mt-2" />
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm">{activity.subject}</p>
                        {getStatusIcon(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>
                      
                      {activity.relatedTo && !relatedTo && (
                        <p className="text-xs text-muted-foreground mb-1">
                          Related to: {activity.relatedTo.name}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{activity.createdBy}</span>
                        <span>•</span>
                        <span>
                          {activity.status === 'completed' && activity.completedAt
                            ? `Completed ${formatDate(activity.completedAt)}`
                            : activity.dueDate
                            ? `Due ${formatDate(activity.dueDate)}`
                            : formatDate(activity.createdAt)
                          }
                        </span>
                      </div>
                    </div>
                    
                    {activity.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markAsCompleted(activity.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No activities yet</p>
            </div>
          )}
        </div>
      </CardContent>

      {/* Add Activity Modal */}
      <Dialog open={isAddActivityModalOpen} onOpenChange={setIsAddActivityModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Activity</DialogTitle>
            <DialogDescription>
              Create a new activity to track your sales efforts
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="activity-type">Activity Type</Label>
              <select
                id="activity-type"
                value={newActivity.type}
                onChange={(e) => setNewActivity(prev => ({ ...prev, type: e.target.value as Activity['type'] }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="task">Task</option>
                <option value="call">Phone Call</option>
                <option value="email">Email</option>
                <option value="meeting">Meeting</option>
                <option value="note">Note</option>
              </select>
            </div>

            <div>
              <Label htmlFor="activity-subject">Subject</Label>
              <Input
                id="activity-subject"
                value={newActivity.subject}
                onChange={(e) => setNewActivity(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Brief description of the activity"
              />
            </div>

            <div>
              <Label htmlFor="activity-description">Description</Label>
              <textarea
                id="activity-description"
                value={newActivity.description}
                onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Detailed description of the activity"
              />
            </div>

            {newActivity.type === 'task' && (
              <div>
                <Label htmlFor="activity-due-date">Due Date</Label>
                <Input
                  id="activity-due-date"
                  type="datetime-local"
                  value={newActivity.dueDate}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddActivityModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddActivity}>
              Add Activity
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}