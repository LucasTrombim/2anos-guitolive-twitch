import { createContext, useContext, useEffect, useState } from 'react';

export const GlobalConfigs = createContext({});

export function useConfigs() {
  return useContext(GlobalConfigs);
}

export function GlobalConfigsProvider({ children }) {
  const value = {
  };

  return (
    <GlobalConfigs.Provider value={value}>{children}</GlobalConfigs.Provider>
  );
}
