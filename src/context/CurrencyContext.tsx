/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    exchangeRateFromUSD: 1.0,
    flag: '🇺🇸',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    exchangeRateFromUSD: 0.79,
    flag: '🇬🇧',
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    exchangeRateFromUSD: 3.6725,
    flag: '🇦🇪',
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  config: CurrencyConfig;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInUSD: number, options?: { showCents?: boolean }) => string;
  convertFromUSD: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('nexus_currency') as CurrencyCode | null;
    if (saved && (saved === 'USD' || saved === 'GBP' || saved === 'AED')) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('nexus_currency', newCurrency);
  };

  const config = CURRENCY_CONFIGS[currency];

  const convertFromUSD = (amountInUSD: number): number => {
    return Math.round(amountInUSD * config.exchangeRateFromUSD);
  };

  const formatPrice = (amountInUSD: number, options?: { showCents?: boolean }): string => {
    const converted = convertFromUSD(amountInUSD);
    const formattedNum = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: options?.showCents ? 2 : 0,
      minimumFractionDigits: options?.showCents ? 2 : 0,
    }).format(converted);

    if (currency === 'AED') {
      return `${formattedNum} د.إ`;
    }
    return `${config.symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        config,
        setCurrency,
        formatPrice,
        convertFromUSD,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
