'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Trophy,
  Medal,
  Award,
  Star,
  TrendingUp,
  Target,
  Zap,
  Crown,
  Users,
  Calendar,
  BarChart3,
  Gift,
  Flame
} from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  name: string
  avatar?: string
  points: number
  badge: string
  streak: number
  achievements: Achievement[]
  cstpvScore: number
  improvement: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  earnedDate: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface Challenge {
  id: string
  name: string
  description: string
  target: number
  current: number
  timeframe: string
  reward: string
  participants: number
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    name: 'Sarah Johnson',
    points: 2850,
    badge: 'PEAK Master',
    streak: 12,
    achievements: [
      { id: '1', name: 'Quota Crusher', description: '150% quota attainment', icon: <Trophy className="h-4 w-4" />, earnedDate: '2024-01-15', rarity: 'epic' },
      { id: '2', name: 'MEDDPICC Expert', description: '90%+ MEDDPICC scores', icon: <Target className="h-4 w-4" />, earnedDate: '2024-01-10', rarity: 'rare' }
    ],
    cstpvScore: 94,
    improvement: 15
  },
  {
    rank: 2,
    name: 'Mike Chen',
    points: 2680,
    badge: 'Pipeline Ninja',
    streak: 8,
    achievements: [
      { id: '3', name: 'Speed Demon', description: 'Fastest deal closure', icon: <Zap className="h-4 w-4" />, earnedDate: '2024-01-12', rarity: 'rare' },
      { id: '4', name: 'Team Player', description: 'Most helpful teammate', icon: <Users className="h-4 w-4" />, earnedDate: '2024-01-08', rarity: 'common' }
    ],
    cstpvScore: 88,
    improvement: 8
  },
  {
    rank: 3,
    name: 'Lisa Williams',
    points: 2420,
    badge: 'Relationship Builder',
    streak: 15,
    achievements: [
      { id: '5', name: 'Champion Finder', description: 'Identified 10+ champions', icon: <Crown className="h-4 w-4" />, earnedDate: '2024-01-14', rarity: 'epic' },
      { id: '6', name: 'Consistency King', description: '15-day activity streak', icon: <Flame className="h-4 w-4" />, earnedDate: '2024-01-15', rarity: 'rare' }
    ],
    cstpvScore: 91,
    improvement: 12
  },
  {
    rank: 4,
    name: 'John Davis',
    points: 2180,
    badge: 'Rising Star',
    streak: 5,
    achievements: [
      { id: '7', name: 'Learning Enthusiast', description: 'Completed 5 courses', icon: <Award className="h-4 w-4" />, earnedDate: '2024-01-11', rarity: 'common' }
    ],
    cstpvScore: 82,
    improvement: 22
  }
]

const mockChallenges: Challenge[] = [
  {
    id: '1',
    name: 'Q1 Pipeline Blitz',
    description: 'Build $500K+ pipeline this quarter',
    target: 500000,
    current: 380000,
    timeframe: '12 days remaining',
    reward: '$500 Amazon gift card + Trophy',
    participants: 24
  },
  {
    id: '2',
    name: 'MEDDPICC Mastery',
    description: 'Achieve 85%+ MEDDPICC score on 10 opportunities',
    target: 10,
    current: 7,
    timeframe: '3 weeks remaining',
    reward: 'MEDDPICC Expert badge + Training credit',
    participants: 18
  },
  {
    id: '3',
    name: 'Champion Network',
    description: 'Identify and develop 5 new champions',
    target: 5,
    current: 3,
    timeframe: '1 month remaining',
    reward: 'Champion Finder badge + Executive lunch',
    participants: 15
  }
]

const cstpvMetrics = {
  calls: { avg: 142, top: 185, target: 120 },
  social: { avg: 78, top: 120, target: 100 },
  territory: { avg: 85, top: 95, target: 90 },
  pipeline: { avg: 2100000, top: 3200000, target: 2000000 },
  volume: { avg: 89, top: 125, target: 100 }
}

export function Leaderboards() {
  const [selectedPeriod, setSelectedPeriod] = useState('current_month')
  const [selectedMetric, setSelectedMetric] = useState('overall_points')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2: return <Medal className="h-5 w-5 text-gray-400" />
      case 3: return <Award className="h-5 w-5 text-orange-500" />
      default: return <Star className="h-5 w-5 text-blue-500" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
      case 2: return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
      case 3: return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
      default: return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200'
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-500 bg-purple-100 text-purple-800'
      case 'epic': return 'border-yellow-500 bg-yellow-100 text-yellow-800'
      case 'rare': return 'border-blue-500 bg-blue-100 text-blue-800'
      default: return 'border-gray-500 bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Trophy className="mr-3 h-8 w-8 text-yellow-600" />
            Team Leaderboards & Gamification
          </h1>
          <p className="text-muted-foreground">
            Drive performance through competition, recognition, and CSTPV excellence
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="current_month">This Month</option>
            <option value="current_quarter">This Quarter</option>
            <option value="current_year">This Year</option>
            <option value="all_time">All Time</option>
          </select>
        </div>
      </div>

      {/* CSTPV Performance Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            CSTPV Team Performance
          </CardTitle>
          <CardDescription>
            Calls, Social, Territory, Pipeline, Volume metrics across the team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{cstpvMetrics.calls.avg}</div>
              <p className="text-sm text-muted-foreground">Avg Calls</p>
              <p className="text-xs text-green-600">Target: {cstpvMetrics.calls.target}</p>
              <p className="text-xs font-medium">Top: {cstpvMetrics.calls.top}</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{cstpvMetrics.social.avg}</div>
              <p className="text-sm text-muted-foreground">Social Score</p>
              <p className="text-xs text-green-600">Target: {cstpvMetrics.social.target}</p>
              <p className="text-xs font-medium">Top: {cstpvMetrics.social.top}</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{cstpvMetrics.territory.avg}%</div>
              <p className="text-sm text-muted-foreground">Territory Coverage</p>
              <p className="text-xs text-green-600">Target: {cstpvMetrics.territory.target}%</p>
              <p className="text-xs font-medium">Top: {cstpvMetrics.territory.top}%</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">${(cstpvMetrics.pipeline.avg / 1000000).toFixed(1)}M</div>
              <p className="text-sm text-muted-foreground">Avg Pipeline</p>
              <p className="text-xs text-green-600">Target: ${(cstpvMetrics.pipeline.target / 1000000).toFixed(1)}M</p>
              <p className="text-xs font-medium">Top: ${(cstpvMetrics.pipeline.top / 1000000).toFixed(1)}M</p>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{cstpvMetrics.volume.avg}</div>
              <p className="text-sm text-muted-foreground">Activity Volume</p>
              <p className="text-xs text-green-600">Target: {cstpvMetrics.volume.target}</p>
              <p className="text-xs font-medium">Top: {cstpvMetrics.volume.top}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Crown className="mr-2 h-5 w-5" />
            Performance Leaderboard
          </CardTitle>
          <CardDescription>
            Top performers based on CSTPV metrics and overall contribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLeaderboard.map((entry) => (
              <div key={entry.rank} className={`border rounded-lg p-4 ${getRankColor(entry.rank)}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      <span className="text-2xl font-bold">#{entry.rank}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{entry.name}</h3>
                      <p className="text-sm text-muted-foreground">{entry.badge}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold">{entry.points.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium">{entry.cstpvScore}</p>
                    <p className="text-muted-foreground">CSTPV Score</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium flex items-center justify-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      {entry.streak}
                    </p>
                    <p className="text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-green-600">+{entry.improvement}%</p>
                    <p className="text-muted-foreground">Improvement</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{entry.achievements.length}</p>
                    <p className="text-muted-foreground">Achievements</p>
                  </div>
                </div>

                {/* Recent Achievements */}
                {entry.achievements.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium mb-2">Recent Achievements:</p>
                    <div className="flex gap-2 flex-wrap">
                      {entry.achievements.slice(0, 3).map((achievement) => (
                        <span 
                          key={achievement.id}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getRarityColor(achievement.rarity)}`}
                        >
                          {achievement.icon}
                          {achievement.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Active Challenges
          </CardTitle>
          <CardDescription>
            Team challenges to drive specific behaviors and outcomes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {mockChallenges.map((challenge) => {
              const progress = (challenge.current / challenge.target) * 100
              
              return (
                <div key={challenge.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{challenge.name}</h3>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {challenge.participants} participants
                    </span>
                  </div>

                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{challenge.current.toLocaleString()}</span>
                        <span>{challenge.target.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Challenge Details */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {challenge.timeframe}
                      </span>
                      <span className="flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        {challenge.reward}
                      </span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Gallery */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5" />
            Achievement Gallery
          </CardTitle>
          <CardDescription>
            Unlock achievements through excellent sales performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {[
              { name: 'Quota Crusher', description: '150%+ quota attainment', rarity: 'epic', earned: true },
              { name: 'MEDDPICC Master', description: '90%+ avg MEDDPICC score', rarity: 'rare', earned: true },
              { name: 'Speed Demon', description: 'Fastest deal closure', rarity: 'rare', earned: false },
              { name: 'Pipeline Builder', description: '$1M+ pipeline built', rarity: 'epic', earned: false },
              { name: 'Champion Finder', description: '10+ champions identified', rarity: 'epic', earned: true },
              { name: 'Team Player', description: 'Most helpful teammate', rarity: 'common', earned: true },
              { name: 'Learning Pro', description: 'All courses completed', rarity: 'rare', earned: false },
              { name: 'Consistency King', description: '30-day activity streak', rarity: 'legendary', earned: false }
            ].map((achievement, index) => (
              <div key={index} className={`border rounded-lg p-3 text-center ${
                achievement.earned ? getRarityColor(achievement.rarity) : 'bg-gray-50 border-gray-200 opacity-60'
              }`}>
                <div className="mb-2">
                  {achievement.earned ? (
                    <Award className="h-8 w-8 mx-auto" />
                  ) : (
                    <Award className="h-8 w-8 mx-auto text-gray-400" />
                  )}
                </div>
                <h4 className="font-medium text-sm">{achievement.name}</h4>
                <p className="text-xs mt-1">{achievement.description}</p>
                {achievement.earned && (
                  <span className="text-xs mt-1 block font-medium">Earned!</span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}