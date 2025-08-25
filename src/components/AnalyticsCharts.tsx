import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Area, AreaChart } from "recharts"

const projectProgressData = [
  { month: "Jan", completed: 12, ongoing: 8, delayed: 2 },
  { month: "Feb", completed: 15, ongoing: 10, delayed: 1 },
  { month: "Mar", completed: 18, ongoing: 12, delayed: 3 },
  { month: "Apr", completed: 22, ongoing: 15, delayed: 2 },
  { month: "May", completed: 20, ongoing: 18, delayed: 4 },
  { month: "Jun", completed: 25, ongoing: 20, delayed: 2 },
]

const equipmentUtilizationData = [
  { name: "Excavators", utilization: 85, fill: "var(--color-chart-1)" },
  { name: "Cranes", utilization: 92, fill: "var(--color-chart-2)" },
  { name: "Bulldozers", utilization: 78, fill: "var(--color-chart-3)" },
  { name: "Concrete Mixers", utilization: 88, fill: "var(--color-chart-4)" },
  { name: "Dump Trucks", utilization: 91, fill: "var(--color-chart-5)" },
]

const safetyIncidentsData = [
  { month: "Jan", incidents: 3, nearMisses: 12 },
  { month: "Feb", incidents: 2, nearMisses: 8 },
  { month: "Mar", incidents: 1, nearMisses: 15 },
  { month: "Apr", incidents: 4, nearMisses: 10 },
  { month: "May", incidents: 2, nearMisses: 6 },
  { month: "Jun", incidents: 1, nearMisses: 9 },
]

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  ongoing: {
    label: "Ongoing",
    color: "hsl(var(--chart-2))",
  },
  delayed: {
    label: "Delayed",
    color: "hsl(var(--chart-3))",
  },
  incidents: {
    label: "Safety Incidents",
    color: "hsl(var(--chart-4))",
  },
  nearMisses: {
    label: "Near Misses",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
          <CardDescription>Monthly project completion status</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={projectProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completed" stackId="a" fill="var(--color-chart-1)" />
              <Bar dataKey="ongoing" stackId="a" fill="var(--color-chart-2)" />
              <Bar dataKey="delayed" stackId="a" fill="var(--color-chart-3)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Safety Metrics</CardTitle>
          <CardDescription>Safety incidents and near misses tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart data={safetyIncidentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="nearMisses" stackId="1" stroke="var(--color-chart-5)" fill="var(--color-chart-5)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="incidents" stackId="1" stroke="var(--color-chart-4)" fill="var(--color-chart-4)" fillOpacity={0.8} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Equipment Utilization</CardTitle>
          <CardDescription>Current equipment usage rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={equipmentUtilizationData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="utilization" fill="var(--color-chart-2)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}