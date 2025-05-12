
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Barcode, X, Scan } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { ItemCategory } from '@/types';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Item name must be at least 2 characters.',
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.',
  }),
  category: z.enum(['food', 'clothing', 'electronics', 'furniture', 'household', 'books', 'toys', 'other'] as const),
  expiryDate: z.date({
    required_error: 'Expiry date is required.',
  }),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  originalPrice: z.number().optional(),
  currentPrice: z.number().optional(),
  quantity: z.number().optional(),
});

const foodCategories: { value: ItemCategory; label: string }[] = [
  { value: 'food', label: 'Food' },
  { value: 'household', label: 'Household' },
  { value: 'other', label: 'Other' },
];

// Mock barcode data for demonstration
const barcodeDatabase = {
  '9780140157376': {
    name: 'Organic Milk',
    description: 'Fresh organic milk from local farms',
    category: 'food',
    originalPrice: 4.99,
    currentPrice: 3.99,
  },
  '7350053850019': {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    category: 'food',
    originalPrice: 3.49,
    currentPrice: 2.99,
  },
  '5901234123457': {
    name: 'Bananas (Bunch)',
    description: 'Organic fair trade bananas',
    category: 'food',
    originalPrice: 2.99,
    currentPrice: 2.49,
  }
};

const AddItem: React.FC = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerIntervalRef = useRef<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      originalPrice: undefined,
      currentPrice: undefined,
      quantity: 1,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScanner = async () => {
    setIsScanning(true);
    
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        videoRef.current.srcObject = stream;
        
        // In a real app, we would use a real barcode scanning library
        // For demo purposes, we'll simulate a successful scan after 3 seconds
        setTimeout(() => {
          // Pick a random barcode from our mock database
          const barcodes = Object.keys(barcodeDatabase);
          const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
          setBarcodeResult(randomBarcode);
          
          if (randomBarcode && barcodeDatabase[randomBarcode as keyof typeof barcodeDatabase]) {
            const item = barcodeDatabase[randomBarcode as keyof typeof barcodeDatabase];
            form.setValue('name', item.name);
            form.setValue('description', item.description);
            form.setValue('category', item.category as any);
            form.setValue('originalPrice', item.originalPrice);
            form.setValue('currentPrice', item.currentPrice);
            
            toast.success(`Scanned item: ${item.name}`);
          }
          
          stopScanner();
        }, 3000);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Could not access camera. Please check permissions.');
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    if (scannerIntervalRef.current) {
      clearInterval(scannerIntervalRef.current);
      scannerIntervalRef.current = null;
    }
    
    setIsScanning(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      console.log('Form values:', values);
      console.log('Image:', imagePreview);
      
      // Show success message
      toast.success('Item added successfully');
      
      // Navigate back to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Item</h1>
        <p className="text-muted-foreground">List an item for donation or discount</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border card-hover">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter item name" {...field} className="transition-all" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="mt-8 button-glow"
                        title="Scan Barcode"
                      >
                        <Barcode className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Scan Barcode</DialogTitle>
                      </DialogHeader>
                      <div className="flex flex-col items-center justify-center space-y-4">
                        {isScanning ? (
                          <div className="relative w-full aspect-video bg-black rounded-md overflow-hidden">
                            <video 
                              ref={videoRef} 
                              className="w-full h-full object-cover"
                              autoPlay 
                              playsInline
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-2/3 h-1/3 border-2 border-zwm-primary animate-pulse-slow opacity-70"></div>
                              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zwm-primary opacity-70"></div>
                            </div>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm" 
                              className="absolute top-2 right-2 bg-white/80"
                              onClick={stopScanner}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center space-y-4 p-8">
                            <Scan className="h-16 w-16 text-zwm-primary animate-pulse-slow" />
                            <p className="text-center text-sm text-muted-foreground">
                              Position the barcode in front of your camera to scan automatically
                            </p>
                            <Button 
                              type="button"
                              onClick={startScanner}
                              className="zwm-gradient hover:opacity-90"
                            >
                              Start Scanner
                            </Button>
                          </div>
                        )}
                        
                        {barcodeResult && (
                          <div className="text-center p-2 bg-muted rounded w-full">
                            <p className="text-sm font-semibold">Barcode detected: {barcodeResult}</p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="transition-all">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {foodCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal transition-all",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} className="transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="originalPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Original Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01"
                            placeholder="0.00" 
                            onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                            value={field.value === undefined ? '' : field.value}
                            className="transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currentPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discounted Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01" 
                            placeholder="0.00" 
                            onChange={e => field.onChange(parseFloat(e.target.value) || undefined)} 
                            value={field.value === undefined ? '' : field.value}
                            className="transition-all" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          placeholder="1" 
                          onChange={e => field.onChange(parseInt(e.target.value) || undefined)} 
                          value={field.value === undefined ? '' : field.value}
                          className="transition-all" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter a detailed description of the item" 
                          className="h-32 transition-all"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Item Image</FormLabel>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-all hover:border-zwm-primary">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-48 object-cover rounded-md animate-fade-in"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white transition-colors"
                          onClick={() => setImagePreview(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="text-zwm-primary mb-2 animate-float">
                          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                        </div>
                        <p className="text-sm text-gray-500">
                          Click to upload an image or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG or WEBP (max. 5MB)
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="image-upload"
                          onChange={handleImageChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-4 transition-all hover:border-zwm-primary"
                          onClick={() => document.getElementById('image-upload')?.click()}
                        >
                          Select Image
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={isSubmitting}
                className="transition-all hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="zwm-gradient-hover transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Item'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddItem;
