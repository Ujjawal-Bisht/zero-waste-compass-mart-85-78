
export interface CountryCodeOption {
  code: string;   // "+1", "+91", etc.
  label: string;  // "India", "USA"
  flag: string;   // "🇮🇳", "🇺🇸", etc.
}

// Added more country codes, removed duplicate "+1"
export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+7", label: "Russia", flag: "🇷🇺" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
  { code: "+970", label: "Palestine", flag: "🇵🇸" },
  { code: "+212", label: "Morocco", flag: "🇲🇦" },
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
  { code: "+971", label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+386", label: "Slovenia", flag: "🇸🇮" },
  { code: "+351", label: "Portugal", flag: "🇵🇹" },
  { code: "+34", label: "Spain", flag: "🇪🇸" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+254", label: "Kenya", flag: "🇰🇪" },
  { code: "+55", label: "Brazil", flag: "🇧🇷" },
  { code: "+351", label: "Portugal", flag: "🇵🇹" },
  { code: "+82", label: "South Korea", flag: "🇰🇷" },
  { code: "+380", label: "Ukraine", flag: "🇺🇦" },
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+64", label: "New Zealand", flag: "🇳🇿" },
  { code: "+63", label: "Philippines", flag: "🇵🇭" },
  { code: "+92", label: "Pakistan", flag: "🇵🇰" },
  { code: "+98", label: "Iran", flag: "🇮🇷" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+964", label: "Iraq", flag: "🇮🇶" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+90", label: "Turkey", flag: "🇹🇷" },
  { code: "+88", label: "Bangladesh", flag: "🇧🇩" },
  { code: "+853", label: "Macau", flag: "🇲🇴" },
  { code: "+852", label: "Hong Kong", flag: "🇭🇰" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+995", label: "Georgia", flag: "🇬🇪" },
  { code: "+972", label: "Israel", flag: "🇮🇱" },
  // ... add more as needed
];

// Robust search (also on code and flag)
export function searchCountryCodes(query: string) {
  return COUNTRY_CODES.filter(code =>
    code.label.toLowerCase().includes(query.toLowerCase()) ||
    code.code.includes(query) ||
    code.flag.includes(query)
  );
}
