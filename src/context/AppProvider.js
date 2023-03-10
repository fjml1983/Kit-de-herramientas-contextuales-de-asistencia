import {createContext, useState, useCallback} from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [shoot, setShoot] = useState(false);
  const trigger = useCallback(
    () => {
      setShoot(true);      
      setTimeout(() => setShoot(false), 1000);      
    },
    []
  );

  return (
      <AppContext.Provider value={{shoot, trigger}}>
        {children}
      </AppContext.Provider>
  );
};

export default AppProvider;