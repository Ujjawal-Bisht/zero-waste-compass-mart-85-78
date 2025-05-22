
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface ManualEntryCodeProps {
  code: string;
}

const ManualEntryCode: React.FC<ManualEntryCodeProps> = ({ code }) => {
  const handleCopyClick = () => {
    navigator.clipboard.writeText(code);
  };
  
  // Format the code with spaces for better readability
  const formatCode = (code: string) => {
    return code.match(/.{1,4}/g)?.join(' ') || code;
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4 my-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Manual Entry Code</span>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-8 px-2 text-blue-600"
          onClick={handleCopyClick}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
      </div>
      <div className="font-mono text-sm bg-white border border-dashed border-gray-300 p-2 rounded break-all">
        {formatCode(code)}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        If you can't scan the QR code, you can manually enter this code into your authenticator app.
      </p>
    </div>
  );
};

export default ManualEntryCode;
