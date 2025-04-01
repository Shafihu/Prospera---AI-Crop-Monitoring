"use client";

import type React from "react";

import { useState } from "react";
import { Check, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [formState, setFormState] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Green Valley Farms",
    bio: "Managing 500 acres of corn, wheat, and soybeans with a focus on sustainable farming practices.",
    notifications: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
      cropAlerts: true,
      weatherAlerts: true,
      marketUpdates: false,
    },
    preferences: {
      temperatureUnit: "celsius",
      measurementUnit: "metric",
      dataRefreshRate: "hourly",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setFormState((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handlePreferenceChange = (key: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and farm details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Farm/Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formState.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about your farm and agricultural experience"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={formState.notifications.email}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("email", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="push-notifications">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={formState.notifications.push}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("push", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-notifications">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via text message
                      </p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={formState.notifications.sms}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("sms", checked)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-report">Weekly Farm Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your farm&apos;s performance
                      </p>
                    </div>
                    <Switch
                      id="weekly-report"
                      checked={formState.notifications.weeklyReport}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("weeklyReport", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="crop-alerts">Crop Health Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when AI detects issues with your crops
                      </p>
                    </div>
                    <Switch
                      id="crop-alerts"
                      checked={formState.notifications.cropAlerts}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("cropAlerts", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weather-alerts">Weather Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about severe weather conditions
                      </p>
                    </div>
                    <Switch
                      id="weather-alerts"
                      checked={formState.notifications.weatherAlerts}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("weatherAlerts", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="market-updates">Market Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates on agricultural market prices
                      </p>
                    </div>
                    <Switch
                      id="market-updates"
                      checked={formState.notifications.marketUpdates}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("marketUpdates", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
              <CardDescription>
                Customize your experience with Prospera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Units of Measurement</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="temperature-unit">Temperature Unit</Label>
                    <Select
                      value={formState.preferences.temperatureUnit}
                      onValueChange={(value) =>
                        handlePreferenceChange("temperatureUnit", value)
                      }
                    >
                      <SelectTrigger id="temperature-unit">
                        <SelectValue placeholder="Select temperature unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="celsius">Celsius (°C)</SelectItem>
                        <SelectItem value="fahrenheit">
                          Fahrenheit (°F)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurement-unit">Measurement System</Label>
                    <Select
                      value={formState.preferences.measurementUnit}
                      onValueChange={(value) =>
                        handlePreferenceChange("measurementUnit", value)
                      }
                    >
                      <SelectTrigger id="measurement-unit">
                        <SelectValue placeholder="Select measurement system" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">
                          Metric (meters, kilograms)
                        </SelectItem>
                        <SelectItem value="imperial">
                          Imperial (feet, pounds)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Preferences</h3>
                <div className="space-y-2">
                  <Label htmlFor="data-refresh">Data Refresh Rate</Label>
                  <RadioGroup
                    id="data-refresh"
                    value={formState.preferences.dataRefreshRate}
                    onValueChange={(value) =>
                      handlePreferenceChange("dataRefreshRate", value)
                    }
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="realtime" id="realtime" />
                      <Label htmlFor="realtime" className="font-normal">
                        Real-time
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hourly" id="hourly" />
                      <Label htmlFor="hourly" className="font-normal">
                        Hourly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily" className="font-normal">
                        Daily
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground mt-2">
                    Higher refresh rates may consume more data and battery on
                    mobile devices.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`relative cursor-pointer rounded-lg border-2 bg-background p-4 hover:border-primary ${
                      theme === "light" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <div className="flex h-16 items-center justify-center rounded-md border border-border bg-[#FFFFFF]">
                      <Sun className="h-6 w-6 text-black" />
                    </div>
                    <div className="mt-2 text-center text-sm font-medium">
                      Light
                    </div>
                    {theme === "light" && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative cursor-pointer rounded-lg border-2 bg-background p-4 hover:border-primary ${
                      theme === "dark" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <div className="flex h-16 items-center justify-center rounded-md border border-border bg-[#1F2937]">
                      <Moon className="h-6 w-6 text-white" />
                    </div>
                    <div className="mt-2 text-center text-sm font-medium">
                      Dark
                    </div>
                    {theme === "dark" && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`relative cursor-pointer rounded-lg border-2 bg-background p-4 hover:border-primary ${
                      theme === "system" ? "border-primary" : "border-border"
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <div className="flex h-16 items-center justify-center rounded-md border border-border bg-gradient-to-r from-[#FFFFFF] to-[#1F2937]">
                      <div className="flex h-6 w-6">
                        <Sun className="h-6 w-6 text-black" />
                        <Moon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="mt-2 text-center text-sm font-medium">
                      System
                    </div>
                    {theme === "system" && (
                      <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dashboard Layout</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-view">Default Dashboard View</Label>
                    <Select defaultValue="overview">
                      <SelectTrigger id="default-view">
                        <SelectValue placeholder="Select default view" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Overview</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                        <SelectItem value="reports">Reports</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chart-style">Chart Style</Label>
                    <Select defaultValue="modern">
                      <SelectTrigger id="chart-style">
                        <SelectValue placeholder="Select chart style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Save Appearance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
