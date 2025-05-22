
export interface CountryCodeOption {
  code: string;   // "+1", "+91", etc.
  label: string;  // "India", "USA"
  flag: string;   // "🇮🇳", "🇺🇸", etc.
}

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "+1", label: "United States", flag: "🇺🇸" },
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+971", label: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+7", label: "Russia", flag: "🇷🇺" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+55", label: "Brazil", flag: "🇧🇷" },
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+63", label: "Philippines", flag: "🇵🇭" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
  { code: "+234", label: "Nigeria", flag: "🇳🇬" },
  { code: "+92", label: "Pakistan", flag: "🇵🇰" },
  { code: "+20", label: "Egypt", flag: "🇪🇬" },
  { code: "+82", label: "South Korea", flag: "🇰🇷" },
  { code: "+39", label: "Italy", flag: "🇮🇹" },
  { code: "+34", label: "Spain", flag: "🇪🇸" },
  { code: "+90", label: "Turkey", flag: "🇹🇷" },
  { code: "+27", label: "South Africa", flag: "🇿🇦" },
  { code: "+964", label: "Iraq", flag: "🇮🇶" },
  { code: "+380", label: "Ukraine", flag: "🇺🇦" },
  { code: "+98", label: "Iran", flag: "🇮🇷" },
  { code: "+1", label: "Canada", flag: "🇨🇦" },
  // Add more as needed...
];

export function searchCountryCodes(query: string) {
  return COUNTRY_CODES.filter(code =>
    code.label.toLowerCase().includes(query.toLowerCase()) ||
    code.code.includes(query) ||
    code.flag.includes(query)
  );
}
