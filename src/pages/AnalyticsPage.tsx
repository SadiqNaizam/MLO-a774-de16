import React from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip as ShadcnChartTooltip, // Renaming to avoid conflict if any
  ChartTooltipContent as ShadcnChartTooltipContent,
  ChartLegend as ShadcnChartLegend,
  ChartLegendContent as ShadcnChartLegendContent,
} from "@/components/ui/chart"


const salesTrendData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
  { name: 'Apr', sales: 2780, profit: 3908 },
  { name: 'May', sales: 1890, profit: 4800 },
  { name: 'Jun', sales: 2390, profit: 3800 },
  { name: 'Jul', sales: 3490, profit: 4300 },
];

const customerSegmentData = [
  { name: 'New Customers', value: 400 },
  { name: 'Returning Customers', value: 300 },
  { name: 'VIP Customers', value: 100 },
  { name: 'Churned Customers', value: 50 },
];

const topProductsData = [
  { product: 'Interactive Globe', sales: 120, revenue: '$12,000' },
  { product: 'STEM Robot Kit', sales: 98, revenue: '$9,800' },
  { product: 'Art Easel Set', sales: 75, revenue: '$3,750' },
  { product: 'Dinosaur Dig Kit', sales: 60, revenue: '$1,500' },
];

const chartConfigSales = {
  sales: { label: "Sales", color: "hsl(var(--chart-1))" },
  profit: { label: "Profit", color: "hsl(var(--chart-2))" },
};

const chartConfigCustomers = {
  value: { label: "Customers", color: "hsl(var(--chart-1))" },
};


const AnalyticsPage = () => {
  console.log('AnalyticsPage loaded');
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <AppSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <AppHeader />
        <ScrollArea className="flex-1 px-4 py-2 sm:px-6 md:py-4">
          <main className="grid flex-1 items-start gap-4 md:gap-8">
            <Breadcrumb className="hidden md:flex mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Analytics</h1>
              <Select defaultValue="last30days">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="last7days">Last 7 Days</SelectItem>
                  <SelectItem value="last30days">Last 30 Days</SelectItem>
                  <SelectItem value="last90days">Last 90 Days</SelectItem>
                  <SelectItem value="alltime">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Trends</CardTitle>
                  <CardDescription>Monthly sales and profit trends.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfigSales} className="min-h-[300px] w-full">
                    <LineChart data={salesTrendData} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ShadcnChartTooltip content={<ShadcnChartTooltipContent />} />
                      <ShadcnChartLegend content={<ShadcnChartLegendContent />} />
                      <Line type="monotone" dataKey="sales" stroke="var(--color-sales)" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Segmentation</CardTitle>
                  <CardDescription>Breakdown of customer types.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfigCustomers} className="min-h-[300px] w-full">
                    <BarChart data={customerSegmentData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <ShadcnChartTooltip content={<ShadcnChartTooltipContent />} />
                      <ShadcnChartLegend content={<ShadcnChartLegendContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Products with the highest sales and revenue.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Units Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProductsData.map((product) => (
                      <TableRow key={product.product}>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{product.revenue}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AnalyticsPage;