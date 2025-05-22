
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COUNTRY_CODES, CountryCodeOption, searchCountryCodes } from "@/utils/countryCodes";

interface Props {
  onRequestOtp: (fullNumber: string) => Promise<void>;
  isLoading: boolean;
}

const TwoFactorMobileOtpSetup: React.FC<Props> = ({ onRequestOtp, isLoading }) => {
  const [countryQuery, setCountryQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeOption>(COUNTRY_CODES[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [phone, setPhone] = useState("");

  const filtered = searchCountryCodes(countryQuery);

  const handleCountrySelect = (c: CountryCodeOption) => {
    setSelectedCountry(c);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 5) return; // basic check
    await onRequestOtp(selectedCountry.code + phone);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Mobile Number</label>
        <div className="flex relative items-center">
          <button
            type="button"
            className="flex items-center py-2 px-3 border rounded-l-md bg-gray-50 hover:bg-gray-100 min-w-[80px] gap-2"
            onClick={() => setShowDropdown((v) => !v)}
            tabIndex={-1}
          >
            <span>{selectedCountry.flag}</span>
            <span className="font-semibold">{selectedCountry.code}</span>
            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 9l6 6 6-6"/></svg>
          </button>
          {showDropdown && (
            <div className="absolute top-10 left-0 z-50 bg-white border rounded-md shadow-md w-72 max-h-60 overflow-y-auto">
              <input
                autoFocus
                value={countryQuery}
                onChange={(e) => setCountryQuery(e.target.value)}
                placeholder="Search country..."
                className="w-full px-3 py-2 border-b outline-none"
              />
              <ul>
                {filtered.map((option) => (
                  <li
                    key={option.code}
                    onClick={() => handleCountrySelect(option)}
                    className="flex items-center px-3 py-2 cursor-pointer hover:bg-blue-50 gap-2"
                  >
                    <span>{option.flag}</span>
                    <span className="min-w-[60px]">{option.code}</span>
                    <span>{option.label}</span>
                  </li>
                ))}
                {!filtered.length && (
                  <li className="px-3 py-2 text-gray-400">No matches found</li>
                )}
              </ul>
            </div>
          )}
          <Input
            className="rounded-l-none"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Enter mobile number"
            required
            minLength={5}
            maxLength={15}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">A code will be sent via SMS to the selected number.</p>
      </div>
      <Button type="submit" className="w-full zwm-gradient-hover" disabled={isLoading}>
        {isLoading ? "Sending OTP..." : "Send OTP"}
      </Button>
    </form>
  );
};

export default TwoFactorMobileOtpSetup;
