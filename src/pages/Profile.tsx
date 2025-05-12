
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, User, Lock, Mail, Camera, Phone, MapPin, Building, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const profileSchema = z.object({
  displayName: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  bio: z.string().optional(),
  dob: z.string().optional(),
  occupation: z.string().optional(),
  organization: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Current password must be at least 6 characters.',
  }),
  newPassword: z.string().min(6, {
    message: 'New password must be at least 6 characters.',
  }),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(currentUser?.photoURL || null);
  const [activeTab, setActiveTab] = useState('profile');

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      city: currentUser?.city || '',
      state: currentUser?.state || '',
      zipCode: currentUser?.zipCode || '',
      country: currentUser?.country || '',
      bio: currentUser?.bio || '',
      dob: currentUser?.dob || '',
      occupation: currentUser?.occupation || '',
      organization: currentUser?.organization || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpdateProfile = async (data: z.infer<typeof profileSchema>) => {
    try {
      setIsUpdating(true);
      await updateProfile({
        displayName: data.displayName,
        photoURL: profileImage,
        phoneNumber: data.phoneNumber,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        bio: data.bio,
        dob: data.dob,
        occupation: data.occupation,
        organization: data.organization,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const onChangePassword = async (data: z.infer<typeof passwordSchema>) => {
    try {
      setIsChangingPassword(true);
      // Simulate password change
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully');
      passwordForm.reset();
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { delay: i * 0.1, duration: 0.3 } 
    })
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <motion.div 
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <h1 className="text-3xl font-bold gradient-text bg-gradient-to-r from-zwm-primary to-zwm-secondary">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </motion.div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={18} /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield size={18} /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Avatar className="h-40 w-40 border-4 border-zwm-primary/20 shadow-xl">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-zwm-primary to-zwm-secondary text-white">
                        {getInitials(currentUser?.displayName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="profile-image"
                        onChange={handleProfileImageChange}
                      />
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 hover:bg-zwm-primary/10"
                        onClick={() => document.getElementById('profile-image')?.click()}
                      >
                        <Camera size={16} /> Change Picture
                      </Button>
                    </div>
                  </motion.div>
                  
                  <div className="flex-1 w-full">
                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onUpdateProfile)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div custom={0} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="displayName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                          
                          <motion.div custom={1} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" disabled />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={2} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" placeholder="Enter phone number" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={3} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="dob"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Date of Birth</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" placeholder="YYYY-MM-DD" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>

                        <Separator className="my-4" />
                        <h3 className="text-lg font-medium mb-4">Professional Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div custom={4} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="occupation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Occupation</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" placeholder="Enter occupation" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={5} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="organization"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Organization</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" placeholder="Enter organization" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>

                        <motion.div custom={6} initial="hidden" animate="visible" variants={itemVariants}>
                          <FormField
                            control={profileForm.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    {...field} 
                                    placeholder="Tell us a bit about yourself" 
                                    className="min-h-[80px] resize-y"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        <Separator className="my-4" />
                        <h3 className="text-lg font-medium mb-4">Address Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <motion.div custom={7} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                      <Input {...field} className="pl-10" placeholder="Enter address" />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={8} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="city"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>City</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter city" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={9} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="state"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter state" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={10} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="zipCode"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Zip Code</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter zip code" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div custom={11} initial="hidden" animate="visible" variants={itemVariants}>
                            <FormField
                              control={profileForm.control}
                              name="country"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country</FormLabel>
                                  <FormControl>
                                    <Select 
                                      value={field.value} 
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="india">India</SelectItem>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="canada">Canada</SelectItem>
                                        <SelectItem value="australia">Australia</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          className="pt-4"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            type="submit"
                            className="zwm-gradient-hover transition-all duration-300 w-full md:w-auto"
                            disabled={isUpdating}
                          >
                            {isUpdating ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-pop hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password here.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onChangePassword)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input type="password" {...field} className="pl-10" />
                            </div>
                          </FormControl>
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
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input type="password" {...field} className="pl-10" />
                            </div>
                          </FormControl>
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
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input type="password" {...field} className="pl-10" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="zwm-gradient-hover transition-all duration-300 w-full md:w-auto"
                        disabled={isChangingPassword}
                      >
                        {isChangingPassword ? 'Updating...' : 'Change Password'}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
