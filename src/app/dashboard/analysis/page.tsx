"use client";

import type React from "react";

import { useState, useRef } from "react";
import { AlertCircle, Check, FileText, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Input } from "@/components/ui/input";
import useCropAnalyzer from "@/hooks/useCropAnalyzer";
import { generateAnalysisResult } from "../../../../utils/crop-analysis";

export default function AnalysisPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { model, loading, error } = useCropAnalyzer();
  const [prediction, setPrediction] = useState(null);
  const [analysisResult, setAnalysisResult] = useState<null | {
    status: "healthy" | "unhealthy" | "at-risk";
    confidence: number;
    issues: string[];
    recommendations: string[];
  }>(null);

  // Create a ref for the image element
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Sample historical data for the chart
  const historicalData = [
    { date: "Jan", health: 85, pest: 5, disease: 10 },
    { date: "Feb", health: 82, pest: 8, disease: 10 },
    { date: "Mar", health: 78, pest: 12, disease: 10 },
    { date: "Apr", health: 75, pest: 10, disease: 15 },
    { date: "May", health: 80, pest: 8, disease: 12 },
    { date: "Jun", health: 85, pest: 5, disease: 10 },
    { date: "Jul", health: 90, pest: 3, disease: 7 },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    if (!model || files.length === 0) {
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);

    try {
      // Create an image element for the model to analyze
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = URL.createObjectURL(files[0]);

      // Set up progress simulation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 200);

      // Wait for the image to load
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Run the prediction
      const predictions = await model.predict(img);
      console.log(predictions);
      setPrediction(predictions);

      // Complete the progress
      clearInterval(interval);
      setProgress(100);

      // Generate dynamic analysis result based on predictions
      const result = generateAnalysisResult(predictions);
      setAnalysisResult({
        status: result.status,
        confidence: result.confidence,
        issues: result.issues.map(
          (issue) =>
            `${issue.name}: ${issue.description} (${issue.severity} severity)`
        ),
        recommendations: result.recommendations.map(
          (rec) => `${rec.action} ${rec.timeframe} (${rec.importance})`
        ),
      });
    } catch (err) {
      console.error("Error analyzing image:", err);
      // Fallback to sample data if prediction fails
      const fallbackResult = generateAnalysisResult([
        { probability: 0.65, className: "Unknown" },
      ]);
      setAnalysisResult({
        status: fallbackResult.status,
        confidence: fallbackResult.confidence,
        issues: fallbackResult.issues.map(
          (issue) =>
            `${issue.name}: ${issue.description} (${issue.severity} severity)`
        ),
        recommendations: fallbackResult.recommendations.map(
          (rec) => `${rec.action} ${rec.timeframe} (${rec.importance})`
        ),
      });
    } finally {
      setIsAnalyzing(false);
      setProgress(100);
    }
  };

  const resetAnalysis = () => {
    setFiles([]);
    setAnalysisResult(null);
    setPrediction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">AI Crop Analysis</h2>
        <p className="text-muted-foreground">
          Upload crop images for instant AI-powered health analysis and
          recommendations.
        </p>
      </div>

      {loading && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Loading AI Model</AlertTitle>
          <AlertDescription>
            Please wait while we load the crop analysis model...
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Model</AlertTitle>
          <AlertDescription>
            {error}. Please refresh the page or try again later.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>
              Drag and drop or select crop images for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Drag and drop your images here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, PNG, WEBP (max 10MB)
              </p>
              <Input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                Select Files
              </Button>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Selected Images ({files.length})
                </p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="text-sm truncate max-w-[180px]">
                          {file.name}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={resetAnalysis}
              disabled={files.length === 0 || isAnalyzing}
            >
              Clear All
            </Button>
            <Button
              onClick={startAnalysis}
              disabled={files.length === 0 || isAnalyzing || loading || !!error}
            >
              {isAnalyzing ? "Analyzing..." : "Start Analysis"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-generated insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isAnalyzing ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping"></div>
                    <div className="absolute inset-2 rounded-full border-4 border-t-primary border-primary/30 animate-spin"></div>
                    <div className="absolute inset-4 rounded-full border-4 border-r-primary border-primary/30 animate-spin-reverse"></div>
                    <div className="absolute inset-6 rounded-full border-4 border-b-primary border-primary/30 animate-spin"></div>
                    <div className="absolute inset-8 rounded-full border-4 border-l-primary border-primary/30 animate-spin-reverse"></div>
                  </div>
                  <p className="mt-4 text-center font-medium">
                    AI Processing...
                  </p>
                  <p className="text-sm text-muted-foreground text-center">
                    Analyzing crop health, detecting issues, and generating
                    recommendations
                  </p>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-center text-muted-foreground">
                  {progress}% complete
                </p>
              </div>
            ) : analysisResult ? (
              <div className="space-y-4 fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Crop Health Status</p>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold mt-1 ${
                        analysisResult.status === "healthy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : analysisResult.status === "unhealthy"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {analysisResult.status === "healthy"
                        ? "Healthy"
                        : analysisResult.status === "unhealthy"
                        ? "Unhealthy"
                        : "Needs Attention"}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Confidence Score</p>
                    <p className="text-2xl font-bold">
                      {analysisResult.confidence}%
                    </p>
                  </div>
                </div>

                <Alert
                  variant="default"
                  className={
                    analysisResult.status === "healthy"
                      ? "border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-100"
                      : analysisResult.status === "unhealthy"
                      ? "border-red-500 bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-100"
                      : "border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-100"
                  }
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>
                    {analysisResult.status === "healthy"
                      ? "Healthy Crop Detected"
                      : analysisResult.status === "unhealthy"
                      ? "Unhealthy Crop Detected"
                      : "Crop Requires Attention"}
                  </AlertTitle>
                  <AlertDescription>
                    {analysisResult.status === "healthy"
                      ? "Your crop appears to be in good health. Continue with your current care routine."
                      : analysisResult.status === "unhealthy"
                      ? "Immediate action required. Follow the recommendations below."
                      : "Early intervention recommended. Address the issues below to prevent further decline."}
                  </AlertDescription>
                </Alert>

                <div>
                  <p className="text-sm font-medium mb-2">Detected Issues</p>
                  <ul className="space-y-1">
                    {analysisResult.issues.map((issue, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-yellow-500" />
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Recommendations</p>
                  <ul className="space-y-1">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-primary" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload images to see AI analysis results here
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {analysisResult && (
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader>
            <CardTitle>Historical Comparison</CardTitle>
            <CardDescription>
              Compare current analysis with historical crop health data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="health">
              <TabsList className="mb-4">
                <TabsTrigger value="health">Health Trends</TabsTrigger>
                <TabsTrigger value="comparison">
                  Seasonal Comparison
                </TabsTrigger>
              </TabsList>
              <TabsContent value="health">
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      health: {
                        label: "Overall Health",
                        color: "hsl(var(--primary))",
                      },
                      pest: {
                        label: "Pest Risk",
                        color: "hsl(var(--destructive))",
                      },
                      disease: {
                        label: "Disease Risk",
                        color: "hsl(var(--secondary))",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="health"
                          stroke="var(--color-health)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="pest"
                          stroke="var(--color-pest)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="disease"
                          stroke="var(--color-disease)"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>
              <TabsContent value="comparison">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Current vs. Previous Season
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Health</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">75%</span>
                          <span className="text-xs text-red-500">-5%</span>
                        </div>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pest Resistance</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">82%</span>
                          <span className="text-xs text-green-500">+3%</span>
                        </div>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Disease Resistance</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">68%</span>
                          <span className="text-xs text-red-500">-7%</span>
                        </div>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Nutrient Uptake</span>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2">79%</span>
                          <span className="text-xs text-green-500">+2%</span>
                        </div>
                      </div>
                      <Progress value={79} className="h-2" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm font-medium">Seasonal Analysis</p>
                    <div className="space-y-2 text-sm">
                      <p>
                        Your crop&apos;s overall health has decreased slightly
                        compared to the previous season, primarily due to
                        increased disease susceptibility.
                      </p>
                      <p className="mt-2">
                        The current powdery mildew detection is consistent with
                        seasonal patterns, but appears earlier than usual. Early
                        intervention is recommended.
                      </p>
                      <p className="mt-2">
                        Nutrient uptake has improved slightly, likely due to the
                        improved fertilization schedule implemented last month.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
