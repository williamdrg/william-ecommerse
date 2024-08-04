import React, { createContext, useState } from 'react';

export const LoadingContext = createContext({
  load: false,
  setLoad: () => {}
});

export const LoadingProvider = ({ children }) => {
  const [load, setLoad] = useState(false);

  return (
    <LoadingContext.Provider value={{ load, setLoad }}>
      {children}
    </LoadingContext.Provider>
  );
};
