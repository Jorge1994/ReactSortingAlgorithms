import type { AlgorithmKey } from '../algorithms/registry';

export const ICON_MAP: Record<AlgorithmKey, string> = {
  'bubble-sort': '🫧',
  'selection-sort': '🎯',
  'insertion-sort': '📝',
  'merge-sort': '🔀',
  'counting-sort': '🔢',
  'quick-sort': '⚡',
  'gnome-sort': '🧙',
  'heap-sort': '🌲'
} as const;

export const getAlgorithmIcon = (algorithmKey: AlgorithmKey): string => {
  return ICON_MAP[algorithmKey] || '⚡';
};
