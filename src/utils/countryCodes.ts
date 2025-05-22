
export interface CountryCodeOption {
  code: string;
  label: string;
  flag: string;
}

export const COUNTRY_CODES: CountryCodeOption[] = [
  { code: "+91", label: "India", flag: "🇮🇳" },
  { code: "+1", label: "USA", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+61", label: "Australia", flag: "🇦🇺" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+86", label: "China", flag: "🇨🇳" },
  { code: "+7", label: "Russia", flag: "🇷🇺" },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+55", label: "Brazil", flag: "🇧🇷" },
  { code: "+62", label: "Indonesia", flag: "🇮🇩" },
  { code: "+63", label: "Philippines", flag: "🇵🇭" },
  { code: "+880", label: "Bangladesh", flag: "🇧🇩" },
  // Add more as needed...
];

export function searchCountryCodes(query: string) {
  return COUNTRY_CODES.filter(code =>
    code.label.toLowerCase().includes(query.toLowerCase()) ||
    code.code.includes(query) ||
    code.flag.includes(query)
  );
}
