export interface Country {
  name: string;
  dialCode: string;
  flag: string;
}

// Starter list — extend with the rest of the ISO country list as needed.
export const POPULAR_COUNTRIES: Country[] = [
  { name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", dialCode: "+1", flag: "🇨🇦" },
];

export const ALL_COUNTRIES: Country[] = [
  ...POPULAR_COUNTRIES,
  { name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { name: "China", dialCode: "+86", flag: "🇨🇳" },
  { name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { name: "France", dialCode: "+33", flag: "🇫🇷" },
  { name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { name: "Ghana", dialCode: "+233", flag: "🇬🇭" },
  { name: "India", dialCode: "+91", flag: "🇮🇳" },
  { name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { name: "Norfolk Island", dialCode: "+672", flag: "🇳🇫" },
  { name: "Niue", dialCode: "+683", flag: "🇳🇺" },
  { name: "North Korea", dialCode: "+850", flag: "🇰🇵" },
  { name: "North Macedonia", dialCode: "+389", flag: "🇲🇰" },
  { name: "North Mariana Islands", dialCode: "+1670", flag: "🇲🇵" },
  { name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
];
