
import React, { useState } from 'react';
import { Item } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface DynamicPricingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: {
    enabled: boolean;
    minPrice?: number;
    maxPrice?: number;
    strategy?: string;
    automaticAdjustment?: boolean;
  }) => void;
  product: Item;
}

const DynamicPricingDialog: React.FC<DynamicPricingDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  product
}) => {
  const [enabled, setEnabled] = useState(product.dynamicPricingEnabled || false);
  const [minPrice, setMinPrice] = useState(product.dynamicPricingSettings?.minPrice || Math.round(product.currentPrice * 0.7));
  const [maxPrice, setMaxPrice] = useState(product.dynamicPricingSettings?.maxPrice || Math.round(product.currentPrice * 1.3));
  const [strategy, setStrategy] = useState(product.dynamicPricingSettings?.strategy || 'demand-based');
  const [automaticAdjustment, setAutomaticAdjustment] = useState(product.dynamicPricingSettings?.automaticAdjustment || false);

  const handleSave = () => {
    onSave({
      enabled,
      minPrice,
      maxPrice,
      strategy,
      automaticAdjustment
    });
  };

  const currentPrice = product.currentPrice;
  const originalPrice = product.originalPrice || product.currentPrice;
  const priceRatio = Math.round((currentPrice / originalPrice) * 100);
  const isPriceLow = priceRatio < 85;
  const isPriceHigh = priceRatio > 115;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-indigo-500" />
            Dynamic Pricing Settings
          </DialogTitle>
          <DialogDescription>
            Configure how prices automatically adjust based on market conditions, inventory levels, and demand.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="dynamic-pricing" className="font-medium">Enable Dynamic Pricing</Label>
            <Switch
              id="dynamic-pricing"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pricing-strategy">Pricing Strategy</Label>
            <Select
              value={strategy}
              onValueChange={setStrategy}
              disabled={!enabled}
            >
              <SelectTrigger id="pricing-strategy" className="w-full">
                <SelectValue placeholder="Select a pricing strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demand-based">Demand-Based</SelectItem>
                <SelectItem value="time-based">Time-Based</SelectItem>
                <SelectItem value="inventory-based">Inventory-Based</SelectItem>
                <SelectItem value="competitor-based">Competitor-Based</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-price">Minimum Price (₹)</Label>
              <Input
                id="min-price"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                disabled={!enabled}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-price">Maximum Price (₹)</Label>
              <Input
                id="max-price"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                disabled={!enabled}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-adjust" className="font-medium">Automatic Adjustments</Label>
              <p className="text-sm text-gray-500">Allow system to adjust price automatically</p>
            </div>
            <Switch
              id="auto-adjust"
              checked={automaticAdjustment}
              onCheckedChange={setAutomaticAdjustment}
              disabled={!enabled}
            />
          </div>

          {enabled && (
            <div className="bg-gray-50 p-3 rounded-lg mt-2">
              <h4 className="text-sm font-medium flex items-center mb-2">
                <TrendingUp className="h-4 w-4 mr-1 text-indigo-500" />
                Current Price Analysis
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Original price:</span>
                  <span>₹{originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current price:</span>
                  <span className={`font-medium ${isPriceLow ? 'text-green-600' : isPriceHigh ? 'text-red-600' : ''}`}>
                    ₹{currentPrice.toFixed(2)} ({priceRatio}%)
                  </span>
                </div>
                {(isPriceLow || isPriceHigh) && (
                  <div className="flex items-center text-xs mt-1 bg-amber-50 p-1.5 rounded">
                    <AlertTriangle className="h-3 w-3 mr-1 text-amber-500" />
                    {isPriceLow ? 'Price is significantly below original' : 'Price is significantly above original'}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={!enabled}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicPricingDialog;
