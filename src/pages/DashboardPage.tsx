import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import DataMetricWidget from '@/components/widgets/DataMetricWidget';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { DollarSign, ShoppingCart, Users, Activity, CreditCard } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, ResponsiveContainer } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const salesData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--chart-1))" },
  mobile: { label: "Mobile", color: "hsl(var(--chart-2))" },
};

const recentTransactions = [
    { id: "TRX001", date: "2024-07-28", customer: "John Doe", amount: "$150.00", status: "Completed" },
    { id: "TRX002", date: "2024-07-28", customer: "Jane Smith", amount: "$75.50", status: "Pending" },
    { id: "TRX003", date: "2024-07-27", customer: "Alice Brown", amount: "$220.00", status: "Completed" },
    { id: "TRX004", date: "2024-07-27", customer: "Bob Green", amount: "$45.99", status: "Failed" },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <AppHeader />
        <ScrollArea className="flex-1 px-4 py-2 sm:px-6 md:py-4">
          <main className="grid flex-1 items-start gap-4 md:gap-8">
            <h1 className="text-2xl font-semibold my-2">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <DataMetricWidget
                title="Total Revenue"
                value="$45,231.89"
                description="+20.1% from last month"
                icon={DollarSign}
                trend="up"
                trendValue="+20.1%"
              />
              <DataMetricWidget
                title="Subscriptions"
                value="+2350"
                description="+180.1% from last month"
                icon={Users}
                trend="up"
                trendValue="+180.1%"
              />
              <DataMetricWidget
                title="Sales"
                value="+12,234"
                description="+19% from last month"
                icon={CreditCard}
                trend="up"
                trendValue="+19%"
              />
              <DataMetricWidget
                title="Active Now"
                value="+573"
                description="+201 since last hour"
                icon={Activity}
                trend="neutral"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Monthly sales performance.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart accessibilityLayer data={salesData}>
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                      <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest transactions processed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.slice(0, 3).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{transaction.id}</TableCell>
                          <TableCell>{transaction.customer}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>{transaction.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardPage;