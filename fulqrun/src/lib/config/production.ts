// Production configuration - requires real credentials
export const productionConfig = {
  // Validate that all required environment variables are set for production
  validateEnvironment: () => {
    const required = [
      'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
      'CLERK_SECRET_KEY', 
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ]

    const missing = required.filter(key => {
      const value = process.env[key]
      return !value || 
        value.includes('your_') || 
        value.includes('demo') || 
        value.includes('placeholder') ||
        value.length < 10
    })

    if (missing.length > 0) {
      throw new Error(`Missing or invalid production environment variables: ${missing.join(', ')}`)
    }

    return true
  },

  // Check if we're in production mode
  isProduction: () => {
    try {
      productionConfig.validateEnvironment()
      return true
    } catch {
      return false
    }
  },

  // Get environment-specific settings
  getSettings: () => {
    const isProduction = productionConfig.isProduction()
    
    return {
      isProduction,
      requireAuth: isProduction,
      enableDatabase: isProduction,
      enableIntegrations: isProduction,
      enableAI: isProduction,
      showDemoNotices: !isProduction
    }
  }
}