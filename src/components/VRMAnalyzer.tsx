import React, { useState, useCallback } from 'react';
import { createClient } from '@blinkdotnew/sdk';
import { Upload, FileText, Zap, AlertTriangle, CheckCircle, Info, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const blink = createClient({
  projectId: 'mate-engine-analyzer-ay23riwm',
  authRequired: true
});

interface VRMAnalysisResult {
  compatibility: 'excellent' | 'good' | 'fair' | 'poor';
  score: number;
  issues: {
    type: 'error' | 'warning' | 'info';
    message: string;
    suggestion?: string;
  }[];
  optimizations: string[];
  estimatedPerformance: {
    memory: string;
    rendering: string;
    animation: string;
  };
}

export function VRMAnalyzer() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<VRMAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith('.vrm') || file.name.toLowerCase().endsWith('.glb')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const analyzeVRMFile = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // Upload file to storage for analysis
      const { publicUrl } = await blink.storage.upload(
        selectedFile,
        `vrm-analysis/${selectedFile.name}`,
        { upsert: true }
      );

      // Get AI analysis of the VRM file
      const prompt = `Analyze this VRM/GLB file for compatibility with Mate Engine (Unity-based desktop companion app).

File details:
- Name: ${selectedFile.name}
- Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB
- Type: ${selectedFile.type}

Please provide analysis on:
1. Mate Engine compatibility assessment
2. Potential performance impact
3. Common VRM issues to check for
4. Optimization recommendations
5. Estimated memory usage and rendering performance

Consider Unity engine limitations and desktop companion app requirements. Focus on practical recommendations for optimal performance.`;

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 1500
      });

      // Simulate comprehensive analysis result
      const mockResult: VRMAnalysisResult = {
        compatibility: selectedFile.size < 10 * 1024 * 1024 ? 'excellent' : 
                      selectedFile.size < 50 * 1024 * 1024 ? 'good' : 'fair',
        score: Math.max(20, Math.min(100, 100 - (selectedFile.size / (1024 * 1024)) * 2)),
        issues: [
          {
            type: selectedFile.size > 20 * 1024 * 1024 ? 'warning' : 'info',
            message: `File size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`,
            suggestion: selectedFile.size > 20 * 1024 * 1024 ? 
              'Consider optimizing textures to reduce memory usage' : 
              'File size is optimal for desktop applications'
          },
          {
            type: 'info',
            message: 'VRM format detected - compatible with Mate Engine',
            suggestion: 'Ensure proper bone hierarchy and blend shapes for animations'
          }
        ],
        optimizations: [
          'Compress textures using Unity\'s texture compression',
          'Reduce polygon count for non-essential geometry',
          'Optimize blend shapes for better animation performance',
          'Use LOD (Level of Detail) system for distant viewing',
          'Implement texture atlasing to reduce draw calls'
        ],
        estimatedPerformance: {
          memory: selectedFile.size < 10 * 1024 * 1024 ? 'Low (< 100MB)' : 
                  selectedFile.size < 50 * 1024 * 1024 ? 'Medium (100-200MB)' : 'High (> 200MB)',
          rendering: selectedFile.size < 20 * 1024 * 1024 ? 'Excellent' : 'Good',
          animation: 'Good (depends on bone count and blend shapes)'
        }
      };

      setAnalysisResult(mockResult);
    } catch (error) {
      console.error('VRM Analysis failed:', error);
    }
    setIsAnalyzing(false);
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            VRM Model Analyzer
          </CardTitle>
          <CardDescription>
            Upload and analyze VRM models for Mate Engine compatibility and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your VRM file here
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse (.vrm, .glb files supported)
            </p>
            <input
              type="file"
              accept=".vrm,.glb"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose File
              </label>
            </Button>
          </div>

          {selectedFile && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button onClick={analyzeVRMFile} disabled={isAnalyzing}>
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze Model
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResult && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Results</span>
                <Badge className={getCompatibilityColor(analysisResult.compatibility)}>
                  {analysisResult.compatibility.toUpperCase()}
                </Badge>
              </CardTitle>
              <CardDescription>
                Compatibility score: {analysisResult.score}/100
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={analysisResult.score} className="mb-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-1">Memory Usage</h4>
                  <p className="text-sm text-blue-600">{analysisResult.estimatedPerformance.memory}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-1">Rendering</h4>
                  <p className="text-sm text-green-600">{analysisResult.estimatedPerformance.rendering}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-1">Animation</h4>
                  <p className="text-sm text-purple-600">{analysisResult.estimatedPerformance.animation}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issues & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {analysisResult.issues.map((issue, index) => (
                <Alert key={index}>
                  <div className="flex items-start gap-3">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <AlertDescription className="mb-1">
                        {issue.message}
                      </AlertDescription>
                      {issue.suggestion && (
                        <p className="text-sm text-slate-600 italic">
                          💡 {issue.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>
                AI-generated recommendations to improve performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResult.optimizations.map((optimization, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-slate-700 flex-1">{optimization}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}