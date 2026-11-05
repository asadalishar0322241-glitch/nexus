/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 transition-all duration-200 ${
        hoverEffect ? 'hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
