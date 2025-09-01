import type { AlgorithmKey } from '../algorithms/registry';

export const ICON_MAP: Record<AlgorithmKey, string> = {
  'bubble-sort': '🫧',
  'selection-sort': '🎯',
  'insertion-sort': '📝',
  'merge-sort': '🔀',
  'counting-sort': '🔢',
  'radix-sort': '📊',
  'quick-sort': '⚡',
  'gnome-sort': '🧙',
  'heap-sort': '🌲',
  'cocktail-sort': '🍸',
  'odd-even-sort': '🧱',
  'bogo-sort': '😂',
  'stooge-sort': '🌀',
  'pancake-sort': '🥞',
  'shell-sort': '🐚',
  'comb-sort': '🔧',
  'cycle-sort': '🔁',
  'bitonic-sort': '🔷',
  'bucket-sort': '🪣'
} as const;

export const getAlgorithmIcon = (algorithmKey: AlgorithmKey): string => {
  return ICON_MAP[algorithmKey] || '⚡';
};
