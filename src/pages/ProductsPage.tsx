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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { PlusCircle, Search, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters."),
  price: z.coerce.number().min(0.01, "Price must be positive."),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  category: z.string().optional(),
});
type ProductFormValues = z.infer<typeof productFormSchema>;

const sampleProducts = [
  { id: 'PROD001', name: 'Laser Tag Game Set', category: 'Toys', price: 79.99, stock: 150, status: 'Active' },
  { id: 'PROD002', name: 'Building Blocks Kit', category: 'Educational', price: 49.50, stock: 200, status: 'Active' },
  { id: 'PROD003', name: 'Plush Dragon', category: 'Stuffed Animals', price: 24.99, stock: 0, status: 'Out of Stock' },
  { id: 'PROD004', name: 'Remote Control Car', category: 'Vehicles', price: 35.00, stock: 75, status: 'Archived' },
];

const ProductsPage = () => {
  console.log('ProductsPage loaded');
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<ProductFormValues & { id?: string } | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: { name: "", price: 0, stock: 0, category: "" },
  });

  React.useEffect(() => {
    if (editingProduct) {
      form.reset(editingProduct);
    } else {
      form.reset({ name: "", price: 0, stock: 0, category: "" });
    }
  }, [editingProduct, form]);

  function onSubmit(data: ProductFormValues) {
    console.log("Product data submitted:", data);
    if (editingProduct?.id) {
      console.log("Updating product:", editingProduct.id);
      // API call to update
    } else {
      console.log("Adding new product");
      // API call to create
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  const handleEdit = (product: typeof sampleProducts[0]) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  
  const handleAddNew = () => {
    setEditingProduct(null);
    form.reset({ name: "", price: 0, stock: 0, category: "" });
    setIsFormOpen(true);
  };


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
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Products</h1>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px]" />
                </div>
                <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'Active' ? 'default' : product.status === 'Out of Stock' ? 'destructive' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleEdit(product)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationEllipsis /></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </ScrollArea>
      </div>

      <Dialog open={isFormOpen} onOpenChange={(isOpen) => { setIsFormOpen(isOpen); if(!isOpen) setEditingProduct(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Update the details of this product.' : 'Fill in the details for the new product.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl><Input placeholder="e.g. Awesome Toy" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" step="0.01" placeholder="e.g. 19.99" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g. 100" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl><Input placeholder="e.g. Educational" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">{editingProduct ? 'Save Changes' : 'Create Product'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;