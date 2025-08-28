import type { AlgorithmKey } from '../algorithms/registry';
import { getAlgorithmIcon } from './algorithmIcons';

export function AlgorithmIcon({ algorithmKey, size = '2xl' }: { algorithmKey: AlgorithmKey; size?: '2xl' | '4xl' }) {
  const icon = getAlgorithmIcon(algorithmKey);
  const sizeClass = size === '4xl' ? 'text-4xl' : 'text-2xl';
  return <span className={sizeClass}>{icon}</span>;
}
