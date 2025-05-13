
import React from 'react';

const LoginLink: React.FC = () => {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
        Sign in
      </a>
    </div>
  );
};

export default LoginLink;
