'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Award, 
  Play,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Brain,
  Trophy
} from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  category: 'peak' | 'meddpicc' | 'sales_skills' | 'product' | 'compliance'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // minutes
  modules: number
  progress: number // 0-100
  status: 'not_started' | 'in_progress' | 'completed'
  certification: boolean
  instructor: string
  rating: number
}

interface Certification {
  id: string
  name: string
  description: string
  requirements: string[]
  validityPeriod: number // months
  status: 'available' | 'in_progress' | 'earned' | 'expired'
  earnedDate?: string
  expiryDate?: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'PEAK Methodology Fundamentals',
    description: 'Master the Prospect → Engage → Acquire → Keep sales process',
    category: 'peak',
    difficulty: 'beginner',
    duration: 45,
    modules: 4,
    progress: 100,
    status: 'completed',
    certification: true,
    instructor: 'Sarah Johnson, VP Sales',
    rating: 4.8
  },
  {
    id: '2',
    title: 'MEDDPICC Qualification Mastery',
    description: 'Advanced opportunity qualification using MEDDPICC framework',
    category: 'meddpicc',
    difficulty: 'intermediate',
    duration: 60,
    modules: 7,
    progress: 65,
    status: 'in_progress',
    certification: true,
    instructor: 'Mike Chen, Sales Director',
    rating: 4.9
  },
  {
    id: '3',
    title: 'AI-Powered Sales Insights',
    description: 'Leverage AI recommendations for better sales outcomes',
    category: 'product',
    difficulty: 'intermediate',
    duration: 30,
    modules: 3,
    progress: 0,
    status: 'not_started',
    certification: false,
    instructor: 'FulQrun AI Team',
    rating: 4.7
  },
  {
    id: '4',
    title: 'Advanced Objection Handling',
    description: 'Master techniques for overcoming common sales objections',
    category: 'sales_skills',
    difficulty: 'advanced',
    duration: 90,
    modules: 8,
    progress: 25,
    status: 'in_progress',
    certification: true,
    instructor: 'Lisa Williams, Sales Trainer',
    rating: 4.6
  },
  {
    id: '5',
    title: 'GDPR Compliance for Sales',
    description: 'Understand data protection requirements in sales processes',
    category: 'compliance',
    difficulty: 'beginner',
    duration: 25,
    modules: 2,
    progress: 0,
    status: 'not_started',
    certification: true,
    instructor: 'Legal Team',
    rating: 4.5
  }
]

const certifications: Certification[] = [
  {
    id: '1',
    name: 'FulQrun PEAK Certified',
    description: 'Demonstrates mastery of the PEAK sales methodology',
    requirements: ['Complete PEAK Fundamentals', 'Pass certification exam', 'Complete 3 practical exercises'],
    validityPeriod: 12,
    status: 'earned',
    earnedDate: '2024-01-15',
    expiryDate: '2025-01-15'
  },
  {
    id: '2',
    name: 'MEDDPICC Expert',
    description: 'Advanced qualification specialist certification',
    requirements: ['Complete MEDDPICC Mastery', 'Achieve 80%+ MEDDPICC scores', 'Mentor 2 team members'],
    validityPeriod: 24,
    status: 'in_progress'
  },
  {
    id: '3',
    name: 'Sales Operations Specialist',
    description: 'Comprehensive sales operations and process optimization',
    requirements: ['Complete all core courses', 'Implement process improvement', 'Lead team training'],
    validityPeriod: 36,
    status: 'available'
  }
]

export function LearningPlatform() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')


  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'peak', name: 'PEAK Methodology' },
    { id: 'meddpicc', name: 'MEDDPICC' },
    { id: 'sales_skills', name: 'Sales Skills' },
    { id: 'product', name: 'Product Training' },
    { id: 'compliance', name: 'Compliance' }
  ]

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory)

  const completedCourses = courses.filter(c => c.status === 'completed').length
  const inProgressCourses = courses.filter(c => c.status === 'in_progress').length
  const earnedCertifications = certifications.filter(c => c.status === 'earned').length

  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
    }
  }



  const getCertificationStatusColor = (status: Certification['status']) => {
    switch (status) {
      case 'earned':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'available':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">FulQrun Learning Platform</h2>
        <p className="text-muted-foreground">
          Enhance your sales skills with methodology-focused training and certifications
        </p>
      </div>

      {/* Learning Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Completed Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCourses}</div>
            <p className="text-xs text-muted-foreground">of {courses.length} available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCourses}</div>
            <p className="text-xs text-blue-600">Continue learning</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earnedCertifications}</div>
            <p className="text-xs text-green-600">Earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-purple-600">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Categories */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                {course.certification && (
                  <Award className="h-5 w-5 text-yellow-600" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Course Metadata */}
                <div className="flex items-center justify-between text-sm">
                  <span className={`px-2 py-1 rounded-full ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration} min
                  </span>
                  <span>{course.modules} modules</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                {/* Progress Bar */}
                {course.progress > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Instructor */}
                <p className="text-xs text-muted-foreground">
                  Instructor: {course.instructor}
                </p>

                {/* Action Button */}
                <Button 
                  className="w-full"
                  variant={course.status === 'completed' ? 'outline' : 'default'}
                >
                  {course.status === 'completed' && <CheckCircle className="mr-2 h-4 w-4" />}
                  {course.status === 'in_progress' && <Play className="mr-2 h-4 w-4" />}
                  {course.status === 'not_started' && <BookOpen className="mr-2 h-4 w-4" />}
                  
                  {course.status === 'completed' ? 'Review Course' :
                   course.status === 'in_progress' ? 'Continue Learning' :
                   'Start Course'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="mr-2 h-5 w-5" />
            Certifications
          </CardTitle>
          <CardDescription>
            Earn industry-recognized certifications for sales methodology mastery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.id} className={`border rounded-lg p-4 ${getCertificationStatusColor(cert.status)}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm opacity-80">{cert.description}</p>
                  </div>
                  <Award className="h-5 w-5" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium">Requirements:</p>
                  <ul className="text-xs space-y-1">
                    {cert.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {cert.status === 'earned' && cert.earnedDate && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs">
                      Earned: {new Date(cert.earnedDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs">
                      Valid until: {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString() : 'Lifetime'}
                    </p>
                  </div>
                )}

                <Button
                  className="w-full mt-3"
                  size="sm"
                  variant={cert.status === 'earned' ? 'outline' : 'default'}
                  disabled={cert.status === 'available' && cert.requirements.length > 0}
                >
                  {cert.status === 'earned' ? 'View Certificate' :
                   cert.status === 'in_progress' ? 'Continue Certification' :
                   'Start Certification'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Micro-Learning */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Daily Micro-Learning
          </CardTitle>
          <CardDescription>
            Quick 5-minute lessons to reinforce key concepts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Today&apos;s Lesson</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  5 min
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
    &quot;Identifying Economic Buyers in Complex Organizations&quot;
              </p>
              <Button size="sm">
                <Play className="mr-2 h-3 w-3" />
                Start Lesson
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded">
                <p className="text-lg font-bold">7</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center p-3 bg-muted rounded">
                <p className="text-lg font-bold">23</p>
                <p className="text-xs text-muted-foreground">Lessons Completed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" />
            Team Learning Leaderboard
          </CardTitle>
          <CardDescription>
            See how your learning progress compares to your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'You', score: 890, courses: 4, rank: 1 },
              { name: 'Sarah J.', score: 850, courses: 3, rank: 2 },
              { name: 'Mike C.', score: 720, courses: 3, rank: 3 },
              { name: 'Lisa W.', score: 680, courses: 2, rank: 4 }
            ].map((learner, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    learner.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                    learner.rank === 2 ? 'bg-gray-100 text-gray-800' :
                    learner.rank === 3 ? 'bg-orange-100 text-orange-800' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    #{learner.rank}
                  </div>
                  <div>
                    <p className="font-medium">{learner.name}</p>
                    <p className="text-sm text-muted-foreground">{learner.courses} courses completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{learner.score}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}