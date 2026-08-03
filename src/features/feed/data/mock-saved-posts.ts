export interface SavedPost {
  id: string;
  color: string;
  label?: string;
}

export const MOCK_SAVED_POSTS: SavedPost[] = [
  { id: "1", color: "#FF660A", label: "Post" },
  { id: "2", color: "#78350F" },
  { id: "3", color: "#F472B6" },
  { id: "4", color: "#1F2937" },
  { id: "5", color: "#4C1D95" },
  { id: "6", color: "#111827" },
  { id: "7", color: "#92400E" },
  { id: "8", color: "#0F766E" },
  { id: "9", color: "#7C3AED" },
];
