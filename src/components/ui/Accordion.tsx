/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenId,
  allowMultiple = false,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]));
    } else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-5">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between text-left text-base font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none"
              aria-expanded={isOpen}
            >
              <span className="pr-4">{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 pr-8">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
