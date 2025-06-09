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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { PlusCircle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const sampleOrders = [
  { id: 'ORD001', customer: 'Olivia Martin', date: '2023-11-23', total: '$150.00', status: 'Fulfilled', payment: 'Paid' },
  { id: 'ORD002', customer: 'Jackson Lee', date: '2023-11-20', total: '$45.99', status: 'Processing', payment: 'Pending' },
  { id: 'ORD003', customer: 'Isabella Nguyen', date: '2023-11-18', total: '$299.50', status: 'Shipped', payment: 'Paid' },
  { id: 'ORD004', customer: 'William Kim', date: '2023-11-15', total: '$75.00', status: 'Cancelled', payment: 'Refunded' },
  { id: 'ORD005', customer: 'Sofia Davis', date: '2023-11-12', total: '$120.25', status: 'Fulfilled', payment: 'Paid' },
];

const OrdersPage = () => {
  console.log('OrdersPage loaded');
  const [selectedOrder, setSelectedOrder] = React.useState<typeof sampleOrders[0] | null>(null);

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
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Orders</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search orders..." className="pl-8 sm:w-[300px]" />
                </div>
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Order</span>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleOrders.map((order) => (
                      <TableRow key={order.id} onClick={() => setSelectedOrder(order)}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'Fulfilled' ? 'default' : 
                            order.status === 'Processing' ? 'secondary' :
                            order.status === 'Shipped' ? 'outline' :
                            'destructive'
                          }>{order.status}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={order.payment === 'Paid' ? 'default' : order.payment === 'Pending' ? 'secondary' : 'destructive'}>
                            {order.payment}
                           </Badge>
                        </TableCell>
                        <TableCell>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>View</Button>
                          </DialogTrigger>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </ScrollArea>
      </div>

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(isOpen) => !isOpen && setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details: {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Customer: {selectedOrder.customer} <br />
                Date: {selectedOrder.date} <br />
                Total: {selectedOrder.total} <br />
                Status: {selectedOrder.status} <br />
                Payment: {selectedOrder.payment}
              </DialogDescription>
            </DialogHeader>
            {/* Add more details or actions here */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button>Update Status</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrdersPage;