
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  
  const footerSections = [
    {
      title: "Platform",
      links: [
        { label: "How It Works", href: "#" },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
      ]
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Privacy", href: "#" },
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "Twitter", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Instagram", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <div className="h-10 w-10 rounded-full zwm-gradient flex items-center justify-center text-white font-bold text-xl">
                Z
              </div>
              <span className="ml-3 text-xl font-bold font-heading">Zero Waste Mart</span>
            </div>
            <p className="mt-2 text-gray-400 max-w-md mx-auto md:mx-0">
              A platform for reducing waste and building community through sharing.
            </p>
          </div>
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-3'} gap-8`}>
            {footerSections.map((section, index) => (
              <div key={index} className={isMobile && index === 2 ? "col-span-2" : ""}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-center md:text-left">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex} className="text-center md:text-left">
                      <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 md:mt-12 border-t border-gray-800 pt-6 md:pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} Zero Waste Mart. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm text-center mt-2 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 text-red-500 mx-1 fill-red-500" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
