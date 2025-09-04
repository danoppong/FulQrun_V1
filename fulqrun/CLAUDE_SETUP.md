# Claude AI Integration Setup

## Overview
FulQrun now includes Claude AI integration for intelligent sales insights, lead scoring, deal risk analysis, and champion detection.

## Setup Instructions

### 1. Get Your Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `sk-ant-`)

### 2. Add Environment Variable
Create a `.env.local` file in your project root and add:

```bash
# Claude AI Integration
ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

### 3. Features Enabled
With Claude AI integration, you get:

- **Intelligent Lead Scoring**: AI-powered lead qualification with confidence levels
- **Deal Risk Analysis**: Predictive risk assessment with mitigation strategies
- **Champion Detection**: Automatic identification of potential advocates
- **Next Best Actions**: Context-aware recommendations for sales reps
- **Competitive Analysis**: AI-driven competitive intelligence
- **Call Analysis**: Conversation intelligence for sales coaching
- **Customer Health Scoring**: Predictive churn risk and expansion opportunities

### 4. Fallback Behavior
If Claude AI is unavailable or the API key is missing, the system automatically falls back to the existing mock analysis methods, ensuring your application continues to function.

### 5. API Usage
The integration uses Claude 3.5 Sonnet model with optimized prompts for sales methodology. Each AI analysis includes:
- Structured JSON responses
- Confidence levels
- Actionable recommendations
- Risk assessments
- Next steps

### 6. Cost Considerations
- Claude API charges per token usage
- Typical cost per analysis: $0.01-0.05
- Monitor usage in Anthropic Console
- Consider implementing rate limiting for production use

## Testing the Integration

1. Ensure your API key is set in `.env.local`
2. Start your development server: `npm run dev`
3. Navigate to any page with AI insights (Dashboard, Leads, Opportunities)
4. The AI features will now use Claude instead of mock data

## Troubleshooting

### Common Issues:
1. **"ANTHROPIC_API_KEY environment variable is required"**
   - Ensure `.env.local` exists and contains your API key
   - Restart your development server after adding the key

2. **API errors in console**
   - Check your API key is valid and has sufficient credits
   - Verify network connectivity
   - Check Anthropic Console for usage limits

3. **Fallback to mock data**
   - This is expected behavior when Claude is unavailable
   - Check console logs for specific error messages

## Production Deployment

For production deployment:
1. Add `ANTHROPIC_API_KEY` to your deployment platform's environment variables
2. Consider implementing rate limiting
3. Monitor API usage and costs
4. Set up error alerting for API failures

## Support

For issues with Claude AI integration:
- Check Anthropic documentation: https://docs.anthropic.com/
- Review FulQrun logs for error details
- Ensure your API key has proper permissions
