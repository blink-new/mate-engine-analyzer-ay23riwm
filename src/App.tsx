import React, { useState, useEffect } from 'react';
import { Github, Star, GitBranch, Users, FileText, ExternalLink, Download, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface RepositoryInfo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  size: string;
  license: string;
  lastUpdate: string;
}

interface FeatureComparison {
  feature: string;
  desktopMate: string;
  mateEngine: string;
}

function App() {
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock repository data based on the GitHub page
  const repoInfo: RepositoryInfo = {
    name: "Mate-Engine",
    description: "A free, lightweight alternative to Desktop Mate with custom VRM support and modding. Fewer limitations, more freedom.",
    stars: 150, // Estimated
    forks: 25,   // Estimated
    language: "C#",
    size: "~50MB",
    license: "Mixed - GNU AGPL v3 & Copyrighted Components",
    lastUpdate: "2024-12-15"
  };

  const features = [
    "Custom VRM Model Support",
    "Free and Open Source",
    "Advanced Shader Support",
    "Mod Support",
    "Smooth Animation Transitions",
    "Touch Reactions",
    "Dance Animation",
    "Particle Effects",
    "FPS Control",
    "Always-on-Top Toggle",
    "Chibi Mode"
  ];

  const featureComparison: FeatureComparison[] = [
    { feature: "Custom Shader Support", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Advanced .ME Model Format", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Mod Support", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Custom Model Support (.VRM, .ME)", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Window Sitting", desktopMate: "✅", mateEngine: "⏸ (v1.5.0)" },
    { feature: "Taskbar Sitting", desktopMate: "✅", mateEngine: "⏸" },
    { feature: "Dragging Animation", desktopMate: "✅", mateEngine: "✅" },
    { feature: "Idle Animation", desktopMate: "✅", mateEngine: "✅" },
    { feature: "Eye Movement", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Spine Movement", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Touch Reactions", desktopMate: "⏸", mateEngine: "✅" },
    { feature: "Sound Effects", desktopMate: "⏸ (Paid Only)", mateEngine: "✅" },
    { feature: "Particle Effects", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Smooth Animation Transitions", desktopMate: "❌", mateEngine: "✅" },
    { feature: "FPS Control", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Always-on-Top Toggle", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Open Source", desktopMate: "❌", mateEngine: "✅" },
    { feature: "Chibi Mode", desktopMate: "❌", mateEngine: "✅" }
  ];

  const upcomingFeatures = [
    "Wallpaper Engine Integration",
    "Window & Taskbar Sitting",
    "Menu Color Customization"
  ];

  const techStack = [
    { name: "Unity Engine", usage: 85 },
    { name: "C# Scripts", usage: 70 },
    { name: "VRM Support", usage: 90 },
    { name: "Animation System", usage: 80 },
    { name: "Shader Development", usage: 75 }
  ];

  const steamProgress = {
    raised: 239.34,
    target: 100,
    percentage: (239.34 / 100) * 100
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Github className="w-8 h-8 text-slate-700" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mate Engine Analysis
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive analysis of the Mate Engine project - a free alternative to Desktop Mate with VRM support
          </p>
        </div>

        {/* Repository Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold">{repoInfo.stars}</span>
              </div>
              <p className="text-sm text-slate-600">Stars</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <GitBranch className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">{repoInfo.forks}</span>
              </div>
              <p className="text-sm text-slate-600">Forks</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">{repoInfo.language}</span>
              </div>
              <p className="text-sm text-slate-600">Language</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Download className="w-5 h-5 text-purple-500" />
                <span className="text-2xl font-bold">{repoInfo.size}</span>
              </div>
              <p className="text-sm text-slate-600">Size</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack</TabsTrigger>
            <TabsTrigger value="steam">Steam Release</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-700 mb-2">Description</h4>
                    <p className="text-slate-600">{repoInfo.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-700">License</h4>
                      <p className="text-sm text-slate-600">{repoInfo.license}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-700">Last Update</h4>
                      <p className="text-sm text-slate-600">{repoInfo.lastUpdate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5" />
                    Key Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Free & Open Source</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">VRM Model Support</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Mod Support</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Unity Engine</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Advanced Animations</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Why Mate Engine?</CardTitle>
                <CardDescription>
                  The motivation behind creating this alternative to Desktop Mate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    Desktop Mate charges $10–$25 USD for single character models—prices comparable to full games on Steam. 
                    Additionally, modding and custom models were disabled in later versions.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">Completely Free</h4>
                      <p className="text-sm text-green-600">No cost for models or features</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-2">Custom VRM Support</h4>
                      <p className="text-sm text-blue-600">Load any valid VRM model</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-700 mb-2">Open Source & Moddable</h4>
                      <p className="text-sm text-purple-600">Full customization freedom</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Core Features</CardTitle>
                <CardDescription>
                  Current features available in Mate Engine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Features</CardTitle>
                <CardDescription>
                  Features planned for Pre-Release 5-10
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Desktop Mate vs Mate Engine</CardTitle>
                <CardDescription>
                  Feature-by-feature comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Feature</th>
                        <th className="text-center p-3 font-semibold">Desktop Mate</th>
                        <th className="text-center p-3 font-semibold">Mate Engine</th>
                      </tr>
                    </thead>
                    <tbody>
                      {featureComparison.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{item.feature}</td>
                          <td className="text-center p-3">{item.desktopMate}</td>
                          <td className="text-center p-3">{item.mateEngine}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tech" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technology Stack</CardTitle>
                <CardDescription>
                  Technologies and frameworks used in Mate Engine
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {techStack.map((tech, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{tech.name}</span>
                        <span className="text-sm text-slate-600">{tech.usage}%</span>
                      </div>
                      <Progress value={tech.usage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Mate Engine is lightweight and efficient. RAM usage depends on the avatar's texture size.
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Example: "Alice" Model</h4>
                  <p className="text-sm text-slate-600">
                    ~190MB texture memory → ~200MB total RAM usage
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="steam" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Steam Release Progress</CardTitle>
                <CardDescription>
                  Community funding for Steam release
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">Funding Progress</span>
                      <span className="text-green-600 font-semibold">
                        ${steamProgress.raised} / ${steamProgress.target}
                      </span>
                    </div>
                    <Progress value={Math.min(steamProgress.percentage, 100)} className="h-3" />
                    <p className="text-sm text-green-600 mt-1">
                      {steamProgress.percentage.toFixed(0)}% funded - Target exceeded!
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Steam Release Details</h4>
                    <p className="text-sm text-blue-600 mb-2">
                      Target Date: March 26, 2025
                    </p>
                    <p className="text-sm text-blue-600">
                      Price: $3.99 on Steam (always free on GitHub)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Top Supporters</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-2 bg-slate-50 rounded">
                        <span>Gra**** Ja*****</span>
                        <span className="font-semibold">$94.00</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded">
                        <span>Co**** Da*****</span>
                        <span className="font-semibold">$96.00</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded">
                        <span>Dym**** Sk*****</span>
                        <span className="font-semibold">$5.59</span>
                      </div>
                      <div className="flex justify-between p-2 bg-slate-50 rounded">
                        <span>Dreezer</span>
                        <span className="font-semibold">$45.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <a href="https://github.com/shinyflvre/Mate-Engine" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/shinyflvre/Mate-Engine/releases" target="_blank" rel="noopener noreferrer">
              <Download className="w-4 h-4 mr-2" />
              Download Latest Release
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://booth.pm/en/items/1025226" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Get Hatsune Miku VRM
            </a>
          </Button>
        </div>

        {/* Footer */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-slate-700">
                Mate Engine Analysis Tool
              </h3>
              <p className="text-sm text-slate-600">
                Built with React, TypeScript, and Tailwind CSS • Data sourced from GitHub repository
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;