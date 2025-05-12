
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Shield, Upload } from 'lucide-react';

const VerificationForm: React.FC = () => {
  const { currentUser, verifySellerAccount, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: currentUser?.businessName || '',
    businessType: currentUser?.businessType || 'retailer',
  });

  if (currentUser?.verified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-500" />
            Verified Seller
          </CardTitle>
          <CardDescription>
            Your account has been verified
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-green-50 rounded-md border border-green-100">
            <div className="text-sm text-green-800">
              <p className="font-medium">Your business is verified!</p>
              <p className="mt-1">You now have full access to all seller features and your trust score has been increased.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!businessInfo.businessName) {
      toast.error('Please enter your business name');
      return;
    }
    
    if (selectedFiles.length === 0) {
      toast.error('Please upload at least one document for verification');
      return;
    }

    try {
      setIsLoading(true);
      
      // First update the business info
      await updateProfile({
        businessName: businessInfo.businessName,
        businessType: businessInfo.businessType as any,
        isSeller: true
      });
      
      // Then submit verification documents
      await verifySellerAccount(selectedFiles);
      
      toast.success('Verification completed successfully!');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify your account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seller Verification</CardTitle>
        <CardDescription>
          Verify your business to increase your trust score and unlock all seller features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              value={businessInfo.businessName}
              onChange={(e) => handleBusinessInfoChange('businessName', e.target.value)}
              placeholder="Your business name"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type</Label>
            <Select
              value={businessInfo.businessType}
              onValueChange={(value) => handleBusinessInfoChange('businessType', value)}
              disabled={isLoading}
            >
              <SelectTrigger id="businessType">
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retailer">Retailer</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="manufacturer">Manufacturer</SelectItem>
                <SelectItem value="individual">Individual Seller</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="documents">Business Documents</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-1">
                Upload business registration, permits, or other verification documents
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Supported formats: PDF, JPEG, PNG (Max 10MB)
              </p>
              <Input
                id="documents"
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => document.getElementById('documents')?.click()}
                disabled={isLoading}
              >
                Select Files
              </Button>
            </div>
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">{selectedFiles.length} file(s) selected:</p>
                <ul className="mt-1 text-xs text-gray-500">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full zwm-gradient hover:opacity-90 transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit for Verification'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
