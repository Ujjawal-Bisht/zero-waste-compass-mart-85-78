
import React from 'react';

const SellerBenefits: React.FC = () => {
  return (
    <div className="p-4 bg-blue-50 border border-blue-100 rounded-md mb-4">
      <h3 className="font-medium text-blue-800">Seller Account Benefits</h3>
      <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
        <li>List your surplus goods and products</li>
        <li>Reach customers interested in sustainable shopping</li>
        <li>Reduce waste and increase revenue</li>
        <li>Track sales and analytics</li>
      </ul>
    </div>
  );
};

export default SellerBenefits;
