import React from 'react';

export type CountCardState = 'primary' | 'secondary' | undefined;

interface CountCardProps {
  topLabel: React.ReactNode;
  bottomValue: React.ReactNode;
  activeState?: CountCardState;
  minWidth?: string;
}

export function CountCard({ topLabel, bottomValue, activeState, minWidth = '52px' }: CountCardProps) {
  const base = 'min-w-[52px] flex flex-col items-center justify-center p-2 rounded-lg transition-shadow duration-200';
  const state = activeState === 'primary'
    ? 'bg-rose-200 text-slate-900 shadow-sm'
    : activeState === 'secondary'
    ? 'bg-blue-100 text-slate-900 shadow-sm'
    : 'bg-white/10 text-white';

  return (
    <div className={`${base} ${state}`} style={{ minWidth }}>
      <div className="w-full flex items-center justify-center">
        <div className="text-xs font-semibold leading-none text-center select-none">{topLabel}</div>
      </div>

      <div className="w-full my-2">
        <div className="h-px bg-white/20 mx-2 rounded" />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="text-lg font-semibold leading-tight text-center">{bottomValue}</div>
      </div>
    </div>
  );
}

export default CountCard;
