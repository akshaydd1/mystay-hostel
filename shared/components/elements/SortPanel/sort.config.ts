// Centralized sort configuration for different feature contexts.
// Replace or extend these arrays when integrating with backend metadata.

export type SortContext = 'stocks' | 'baskets' | 'reports' | 'ratings' | 'consensus' | 'default';

export interface SortOption {
  label: string;
  value: string;
}

// Core stock recommendation sorts.
export const stockSortOptions: SortOption[] = [
  { label: 'Latest Recommendations', value: 'latest' },
  { label: 'Potential Upside — High to Low', value: 'upside-high-low' },
  { label: 'Potential Upside — Low to High', value: 'upside-low-high' },
  { label: 'Live Price — High to Low', value: 'price-high-low' },
  { label: 'Live Price — Low to High', value: 'price-low-high' },
  { label: 'Most Popular', value: 'popular' },
];

// Basket page sorts.
export const basketSortOptions: SortOption[] = [
  { label: 'Latest Baskets', value: 'latest-baskets' },
  { label: 'Returns — High to Low', value: 'returns-high-low' },
  { label: 'Investment — High to Low', value: 'investment-high-low' },
];

// Reports have no sort (empty to signal hidden panel).
export const reportSortOptions: SortOption[] = [];

// Ratings / Consensus may disable sorts (empty arrays).
export const ratingSortOptions: SortOption[] = [];
export const consensusSortOptions: SortOption[] = [];

export function getSortOptionsByContext(context: SortContext): SortOption[] {
  switch (context) {
    case 'stocks':
      return stockSortOptions;
    case 'baskets':
      return basketSortOptions;
    case 'reports':
      return reportSortOptions;
    case 'ratings':
      return ratingSortOptions;
    case 'consensus':
      return consensusSortOptions;
    default:
      return stockSortOptions; // fallback
  }
}
