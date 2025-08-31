'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Users, Target, Building2, Contact, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  type: 'lead' | 'opportunity' | 'contact' | 'company'
  title: string
  subtitle: string
  description: string
  score?: number
  value?: number
}

// Mock search data - in production, this would come from API
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    type: 'lead',
    title: 'John Smith',
    subtitle: 'TechCorp Inc',
    description: 'VP of Sales • Score: 85',
    score: 85
  },
  {
    id: '2',
    type: 'opportunity',
    title: 'Enterprise CRM Implementation',
    subtitle: 'Acme Corp',
    description: '$150,000 • Proposal Stage',
    value: 150000
  },
  {
    id: '3',
    type: 'contact',
    title: 'Sarah Williams',
    subtitle: 'Acme Corp',
    description: 'CFO • Economic Buyer'
  },
  {
    id: '4',
    type: 'company',
    title: 'Global Systems',
    subtitle: 'Manufacturing',
    description: '5,000 employees • $250M revenue'
  },
  {
    id: '5',
    type: 'lead',
    title: 'Mike Chen',
    subtitle: 'StartupX',
    description: 'Founder • Score: 78',
    score: 78
  },
  {
    id: '6',
    type: 'opportunity',
    title: 'Multi-location Deployment',
    subtitle: 'Global Systems',
    description: '$300,000 • Needs Analysis',
    value: 300000
  }
]

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchData = async () => {
      if (!query.trim()) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      setIsOpen(true)

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300))

      // Filter mock data based on query
      const filteredResults = mockSearchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )

      setResults(filteredResults)
      setIsLoading(false)
    }

    const debounceTimer = setTimeout(searchData, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false)
    setQuery('')
    
    // Navigate to the appropriate page
    switch (result.type) {
      case 'lead':
        router.push('/leads')
        break
      case 'opportunity':
        router.push('/opportunities')
        break
      case 'contact':
        router.push('/contacts')
        break
      case 'company':
        router.push('/companies')
        break
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <Users className="h-4 w-4 text-blue-600" />
      case 'opportunity':
        return <Target className="h-4 w-4 text-green-600" />
      case 'contact':
        return <Contact className="h-4 w-4 text-purple-600" />
      case 'company':
        return <Building2 className="h-4 w-4 text-orange-600" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search leads, opportunities, contacts..."
          className="w-96 pl-9"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <Card className="absolute top-full mt-2 w-full z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-2">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span className="text-sm text-muted-foreground">Searching...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <div
                    key={`${result.type}-${result.id}`}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-muted cursor-pointer transition-colors"
                    onClick={() => handleResultClick(result)}
                  >
                    {getIcon(result.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{result.title}</p>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                          {getTypeLabel(result.type)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{result.subtitle}</p>
                      <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                    </div>
                    {result.score && (
                      <div className="text-xs">
                        <span className={`font-medium ${
                          result.score >= 80 ? 'text-green-600' : 
                          result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {result.score}
                        </span>
                      </div>
                    )}
                    {result.value && (
                      <div className="text-xs font-medium">
                        ${(result.value / 1000).toFixed(0)}K
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className="flex items-center justify-center p-4">
                <span className="text-sm text-muted-foreground">No results found</span>
              </div>
            ) : null}

            {results.length > 0 && (
              <div className="border-t mt-2 pt-2">
                <p className="text-xs text-muted-foreground text-center">
                  Press Enter to search all results
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}