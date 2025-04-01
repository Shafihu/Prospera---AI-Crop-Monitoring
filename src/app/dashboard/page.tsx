"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  // Sample data for charts
  const cropHealthData = [
    { name: "Jan", healthy: 65, unhealthy: 12, atRisk: 23 },
    { name: "Feb", healthy: 59, unhealthy: 15, atRisk: 26 },
    { name: "Mar", healthy: 80, unhealthy: 5, atRisk: 15 },
    { name: "Apr", healthy: 81, unhealthy: 4, atRisk: 15 },
    { name: "May", healthy: 76, unhealthy: 8, atRisk: 16 },
    { name: "Jun", healthy: 55, unhealthy: 25, atRisk: 20 },
    { name: "Jul", healthy: 40, unhealthy: 35, atRisk: 25 },
  ];

  const yieldData = [
    { name: "2018", actual: 4000, predicted: 4200 },
    { name: "2019", actual: 4500, predicted: 4300 },
    { name: "2020", actual: 3800, predicted: 4000 },
    { name: "2021", actual: 4200, predicted: 4100 },
    { name: "2022", actual: 4800, predicted: 4600 },
    { name: "2023", actual: 5100, predicted: 5000 },
    { name: "2024", actual: null, predicted: 5500 },
  ];

  const soilData = [
    { name: "Field A", nitrogen: 40, phosphorus: 24, potassium: 35 },
    { name: "Field B", nitrogen: 30, phosphorus: 18, potassium: 22 },
    { name: "Field C", nitrogen: 50, phosphorus: 35, potassium: 42 },
    { name: "Field D", nitrogen: 35, phosphorus: 20, potassium: 30 },
  ];

  const recentReports = [
    {
      id: 1,
      title: "Weekly Crop Health Report",
      date: "2024-03-15",
      status: "Completed",
    },
    {
      id: 2,
      title: "Soil Analysis - Field A",
      date: "2024-03-12",
      status: "Completed",
    },
    {
      id: 3,
      title: "Pest Detection Alert",
      date: "2024-03-10",
      status: "Requires Action",
    },
    {
      id: 4,
      title: "Irrigation Recommendation",
      date: "2024-03-08",
      status: "In Progress",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, John
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s an overview of your farm&apos;s performance and health
          status.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Crops</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-primary"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk Crops</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-yellow-500"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16%</div>
            <p className="text-xs text-muted-foreground">
              -2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unhealthy Crops
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-red-500"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8%</div>
            <p className="text-xs text-muted-foreground">
              -3.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Yield
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-primary"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,500 kg</div>
            <p className="text-xs text-muted-foreground">+10% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 ">
            {/* <Card className="col-span-4 backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle>Crop Health Trends</CardTitle>
                <CardDescription>
                  Monthly breakdown of crop health status
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    healthy: {
                      label: "Healthy",
                      color: "hsl(var(--primary))",
                    },
                    unhealthy: {
                      label: "Unhealthy",
                      color: "hsl(var(--destructive))",
                    },
                    atRisk: {
                      label: "At Risk",
                      color: "hsl(var(--secondary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cropHealthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="healthy"
                        stroke="var(--color-healthy)"
                        fill="var(--color-healthy)"
                        fillOpacity={0.2}
                        stackId="1"
                      />
                      <Area
                        type="monotone"
                        dataKey="atRisk"
                        stroke="var(--color-atRisk)"
                        fill="var(--color-atRisk)"
                        fillOpacity={0.2}
                        stackId="1"
                      />
                      <Area
                        type="monotone"
                        dataKey="unhealthy"
                        stroke="var(--color-unhealthy)"
                        fill="var(--color-unhealthy)"
                        fillOpacity={0.2}
                        stackId="1"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card> */}
            <Card className=" col-span-7 backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle>Soil Nutrient Analysis</CardTitle>
                <CardDescription>
                  Current nutrient levels by field
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    nitrogen: {
                      label: "Nitrogen",
                      color: "hsl(var(--chart-1))",
                    },
                    phosphorus: {
                      label: "Phosphorus",
                      color: "hsl(var(--chart-2))",
                    },
                    potassium: {
                      label: "Potassium",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={soilData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="nitrogen" fill="var(--color-nitrogen)" />
                      <Bar
                        dataKey="phosphorus"
                        fill="var(--color-phosphorus)"
                      />
                      <Bar dataKey="potassium" fill="var(--color-potassium)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* <Card className="col-span-4 backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle>Yield Prediction</CardTitle>
                <CardDescription>
                  Actual vs. Predicted Yield (kg/hectare)
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    actual: {
                      label: "Actual Yield",
                      color: "hsl(var(--primary))",
                    },
                    predicted: {
                      label: "Predicted Yield",
                      color: "hsl(var(--secondary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={yieldData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="var(--color-actual)"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="predicted"
                        stroke="var(--color-predicted)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card> */}
            <Card className="col-span-7 backdrop-blur-sm bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Latest analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {report.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {report.date}
                        </p>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          report.status === "Completed"
                            ? "bg-primary/20 text-primary"
                            : report.status === "Requires Action"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-secondary/20 text-secondary"
                        }`}
                      >
                        {report.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card className="backdrop-blur-sm bg-card/80 border-primary/20">
            <CardHeader>
              <CardTitle>All Reports</CardTitle>
              <CardDescription>
                View and download all your farm reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                    <div>Report Name</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {[
                      ...recentReports,
                      {
                        id: 5,
                        title: "Monthly Yield Forecast",
                        date: "2024-03-05",
                        status: "Completed",
                      },
                      {
                        id: 6,
                        title: "Water Usage Analysis",
                        date: "2024-03-01",
                        status: "Completed",
                      },
                      {
                        id: 7,
                        title: "Seasonal Planning Guide",
                        date: "2024-02-25",
                        status: "Completed",
                      },
                    ].map((report) => (
                      <div
                        key={report.id}
                        className="grid grid-cols-4 gap-4 p-4 items-center"
                      >
                        <div className="font-medium">{report.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.date}
                        </div>
                        <div>
                          <div
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              report.status === "Completed"
                                ? "bg-primary/20 text-primary"
                                : report.status === "Requires Action"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-secondary/20 text-secondary"
                            }`}
                          >
                            {report.status}
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            View
                          </button>
                          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
