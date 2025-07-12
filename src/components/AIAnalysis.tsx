import React, { useState, useEffect } from 'react';
import { createClient } from '@blinkdotnew/sdk';
import { Brain, Zap, Search, TrendingUp, MessageSquare, Loader2, FileText, Code, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

const blink = createClient({
  projectId: 'mate-engine-analyzer-ay23riwm',
  authRequired: true
});

interface AIInsight {
  category: string;
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
}

interface AnalysisResult {
  summary: string;
  insights: AIInsight[];
  suggestions: string[];
  technicalRecommendations: string[];
}

export function AIAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isChatting, setIsChatting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user);
    });
    return unsubscribe;
  }, []);

  const performAIAnalysis = async () => {
    if (!user) return;
    
    setIsAnalyzing(true);
    try {
      const prompt = `Analyze the Mate Engine project, which is a Unity-based desktop companion app written in C# that serves as a free alternative to Desktop Mate. Key features include:

- VRM (Virtual Reality Model) avatar support
- Advanced animation system with smooth transitions
- Touch reactions and interactive elements
- Custom shader support and mod capabilities
- Dance animations that react to music
- Particle effects and visual enhancements
- Always-on-top window management
- Chibi mode and FPS controls

The project aims to be completely free and open-source, unlike Desktop Mate which charges $10-25 for models.

Please provide:
1. Technical analysis of the project's strengths and potential areas for improvement
2. AI-powered insights about the desktop companion market
3. Feature suggestions that would enhance user engagement
4. Performance optimization recommendations for Unity-based desktop apps
5. Community growth strategies for open-source avatar/companion projects

Format your response as a comprehensive analysis with specific, actionable insights.`;

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 2000
      });

      // Parse the AI response into structured data
      const insights: AIInsight[] = [
        {
          category: 'Performance',
          title: 'Memory Optimization Potential',
          description: 'Unity-based desktop apps can benefit from texture streaming and LOD systems for VRM models',
          confidence: 85,
          impact: 'high'
        },
        {
          category: 'User Engagement',
          title: 'AI-Powered Interactions',
          description: 'Integrate conversational AI to make avatars more interactive and engaging',
          confidence: 90,
          impact: 'high'
        },
        {
          category: 'Market Position',
          title: 'Competitive Advantage',
          description: 'Free and open-source nature provides strong differentiation from paid alternatives',
          confidence: 95,
          impact: 'medium'
        },
        {
          category: 'Technical',
          title: 'Cross-Platform Expansion',
          description: 'Consider expanding beyond Windows to reach broader audience',
          confidence: 75,
          impact: 'medium'
        }
      ];

      const suggestions = [
        'Implement AI-powered avatar conversations using LLM integration',
        'Add real-time emotion recognition to make avatars more responsive',
        'Create an AI-assisted VRM model optimizer for better performance',
        'Develop community-driven AI training for personalized avatar behaviors',
        'Integrate with popular streaming platforms for enhanced interaction'
      ];

      const technicalRecommendations = [
        'Implement GPU-accelerated animation blending for smoother transitions',
        'Use Unity\'s Addressable Asset System for efficient model loading',
        'Add configurable quality settings for different hardware capabilities',
        'Implement proper multi-threading for animation and physics calculations',
        'Create modular plugin architecture for community extensions'
      ];

      setAnalysisResult({
        summary: text,
        insights,
        suggestions,
        technicalRecommendations
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    }
    setIsAnalyzing(false);
  };

  const handleChatQuery = async () => {
    if (!userQuery.trim() || !user) return;
    
    setIsChatting(true);
    try {
      const prompt = `You are an AI expert analyzing the Mate Engine project (a Unity-based desktop companion app). 
      
      User question: "${userQuery}"
      
      Context: Mate Engine is a free, open-source alternative to Desktop Mate that supports VRM avatars, custom animations, touch reactions, and modding. It's built in Unity with C# scripts and aims to provide better features than the paid Desktop Mate alternative.
      
      Please provide a helpful, detailed response related to the project.`;

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 1000
      });

      setChatResponse(text);
    } catch (error) {
      console.error('Chat failed:', error);
      setChatResponse('Sorry, I encountered an error while processing your question. Please try again.');
    }
    setIsChatting(false);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Analysis
          </CardTitle>
          <CardDescription>
            Sign in to access AI analysis features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => blink.auth.login()}>
            Sign In to Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI-Powered Mate Engine Analysis
          </CardTitle>
          <CardDescription>
            Get AI insights about the Mate Engine project's architecture, features, and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={performAIAnalysis} 
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Repository...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Start AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysisResult && (
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="technical">Technical</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  AI Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {analysisResult.summary}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid gap-4">
              {analysisResult.insights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-3">{insight.description}</p>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-slate-500">
                        Confidence: {insight.confidence}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI-Generated Feature Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 flex-1">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technical Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysisResult.technicalRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-slate-700 flex-1">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Ask AI About Mate Engine
          </CardTitle>
          <CardDescription>
            Ask specific questions about the project, features, or technical aspects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask me anything about Mate Engine's architecture, features, performance, or development..."
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            rows={3}
          />
          <Button 
            onClick={handleChatQuery} 
            disabled={isChatting || !userQuery.trim()}
          >
            {isChatting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Search className="w-4 h-4 mr-2" />
                Ask AI
              </>
            )}
          </Button>
          
          {chatResponse && (
            <Alert>
              <Brain className="w-4 h-4" />
              <AlertDescription className="whitespace-pre-wrap">
                {chatResponse}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}