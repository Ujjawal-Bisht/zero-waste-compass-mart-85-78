
import React, { useEffect, useRef } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { UseFormReturn } from 'react-hook-form';
import { ItemFormValues } from '../schemas/itemFormSchema';

interface ExpiryDatePickerProps {
  form: UseFormReturn<ItemFormValues, any, undefined>;
  isUpdated?: boolean;
}

const ExpiryDatePicker: React.FC<ExpiryDatePickerProps> = ({ form, isUpdated = false }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Add animation when field is updated (e.g., from barcode scan)
  useEffect(() => {
    if (isUpdated && buttonRef.current) {
      const button = buttonRef.current;
      button.classList.add('form-field-success');
      
      // Remove the animation class after animation completes
      const timer = setTimeout(() => {
        button.classList.remove('form-field-success');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isUpdated]);

  return (
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
                  ref={buttonRef}
                  variant="outline"
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    isUpdated && "form-field-success"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick an expiry date</span>
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
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ExpiryDatePicker;
