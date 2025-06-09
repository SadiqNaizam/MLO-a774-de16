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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label'; // Label is also part of FormItem, but can be used standalone
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast"; // For showing notifications

const profileFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  // Optional: Add more fields like bio, phone, etc.
});
type ProfileFormValues = z.infer<typeof profileFormSchema>;

const passwordFormSchema = z.object({
    currentPassword: z.string().min(1, {message: "Current password is required."}), // Simple check, real app needs more
    newPassword: z.string().min(8, {message: "New password must be at least 8 characters."}),
    confirmPassword: z.string().min(8, {message: "Confirm password must be at least 8 characters."}),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
});
type PasswordFormValues = z.infer<typeof passwordFormSchema>;


const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "Admin User", // Placeholder, fetch real data in useEffect
      email: "admin@example.com",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile data submitted:", data);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    console.log("Password change submitted:", data);
    // Actual password change logic here
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    passwordForm.reset();
  }


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
                  <BreadcrumbPage>User Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-2xl font-semibold my-2">User Profile</h1>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <FormField
                            control={profileForm.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Save Changes</Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your account password.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                             <FormField
                            control={passwordForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl><Input type="password" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={passwordForm.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl><Input type="password" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={passwordForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl><Input type="password" {...field} /></FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit">Update Password</Button>
                        </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
            {/* Could add other sections like Notification Preferences, API Keys, etc. */}
          </main>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UserProfilePage;