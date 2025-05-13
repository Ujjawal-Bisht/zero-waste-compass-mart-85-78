
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { COUNTRY_CODES } from '@/utils/countryCodes';

const phoneSchema = z.object({
  countryCode: z.string().min(1, { message: 'Country code is required' }),
  phoneNumber: z.string().min(5, { message: 'Phone number must be at least 5 characters' })
});

export type PhoneFormValues = z.infer<typeof phoneSchema>;

interface PhoneNumberFormProps {
  onSubmit: (values: PhoneFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(COUNTRY_CODES);

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+1', // Default to US
      phoneNumber: ''
    }
  });

  useEffect(() => {
    // Filter countries based on search query
    if (searchQuery) {
      const filtered = COUNTRY_CODES.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        country.dialCode.includes(searchQuery)
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(COUNTRY_CODES);
    }
  }, [searchQuery]);

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={phoneForm.control}
          name="countryCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country Code</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {field.value ? 
                        `${field.value} ${COUNTRY_CODES.find(country => country.dialCode === field.value)?.name || ''}` : 
                        "Select country code"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput 
                      placeholder="Search country..." 
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus:placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      value={searchQuery}
                      onValueChange={setSearchQuery}
                    />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {filteredCountries.map((country) => (
                          <CommandItem
                            key={country.code}
                            value={`${country.dialCode}-${country.name}`}
                            onSelect={() => {
                              field.onChange(country.dialCode);
                              setOpen(false);
                            }}
                          >
                            <span className="font-medium">{country.dialCode}</span>
                            <span className="ml-2 text-muted-foreground">{country.name}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={phoneForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="123-456-7890" 
                  {...field}
                  className="w-full" 
                  type="tel"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            type="button" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            className="zwm-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Code'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PhoneNumberForm;
