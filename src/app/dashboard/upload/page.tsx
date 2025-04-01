/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useState } from "react";
import { AlertCircle, FileText, Upload, X } from "lucide-react";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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

  const startUpload = () => {
    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => clearInterval(interval);
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadComplete(false);
    setUploadError(null);
  };

  // Sample previous uploads
  const previousUploads = [
    {
      id: 1,
      name: "Field A - North Section.jpg",
      date: "2024-03-15",
      status: "Analyzed",
    },
    {
      id: 2,
      name: "Field A - South Section.jpg",
      date: "2024-03-15",
      status: "Analyzed",
    },
    {
      id: 3,
      name: "Field B - Overview.jpg",
      date: "2024-03-10",
      status: "Analyzed",
    },
    {
      id: 4,
      name: "Corn - Close-up.jpg",
      date: "2024-03-05",
      status: "Analyzed",
    },
    {
      id: 5,
      name: "Wheat Field - East.jpg",
      date: "2024-02-28",
      status: "Analyzed",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Upload Images</h2>
        <p className="text-muted-foreground">
          Upload crop images for AI analysis and monitoring
        </p>
      </div>

      <Tabs defaultValue="upload" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">Upload New Images</TabsTrigger>
          <TabsTrigger value="history">Upload History</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>Upload Crop Images</CardTitle>
              <CardDescription>
                Drag and drop or select images to upload for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!uploadComplete ? (
                <>
                  <div
                    className={`border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center transition-colors ${
                      isDragging
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground mb-2">
                      Drag and drop your images here
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports: JPG, PNG, WEBP (max 20MB per file)
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
                      onClick={() =>
                        document.getElementById("file-upload")?.click()
                      }
                    >
                      Browse Files
                    </Button>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                          Selected Images ({files.length})
                        </p>
                        <Button variant="ghost" size="sm" onClick={resetUpload}>
                          Clear All
                        </Button>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-md"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                                <FileText className="h-6 w-6 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="text-sm font-medium truncate max-w-[200px] md:max-w-[300px]">
                                  {file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
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

                  {uploading && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">
                        Uploading {files.length} images...
                      </p>
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-right text-muted-foreground">
                        {uploadProgress}% complete
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <Alert
                    variant="default"
                    className="border-green-500 bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-100"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upload Complete</AlertTitle>
                    <AlertDescription>
                      Your images have been successfully uploaded and are now
                      being processed for analysis.
                    </AlertDescription>
                  </Alert>
                  <div className="rounded-lg border p-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Upload Summary</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Total Files:</span>
                          <span className="font-medium">{files.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Status:</span>
                          <span className="font-medium text-green-600 dark:text-green-400">
                            Processing
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Estimated Completion:</span>
                          <span className="font-medium">~5 minutes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              {!uploadComplete ? (
                <Button
                  onClick={startUpload}
                  disabled={files.length === 0 || uploading}
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </Button>
              ) : (
                <Button onClick={resetUpload}>Upload More Images</Button>
              )}
            </CardFooter>
          </Card>

          {uploadComplete && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>What&apos;s Next?</AlertTitle>
              <AlertDescription>
                Your images are being processed for AI analysis. You&apos;ll
                receive a notification when the analysis is complete. You can
                view the results in the{" "}
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => setActiveTab("history")}
                >
                  Upload History
                </Button>{" "}
                tab or on the Analysis page.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        <TabsContent value="history">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>Upload History</CardTitle>
              <CardDescription>
                View and manage your previously uploaded images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                  <div>Image Name</div>
                  <div>Upload Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {previousUploads.map((upload) => (
                    <div
                      key={upload.id}
                      className="grid grid-cols-4 gap-4 p-4 items-center"
                    >
                      <div className="font-medium truncate">{upload.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {upload.date}
                      </div>
                      <div>
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {upload.status}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          View Analysis
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
