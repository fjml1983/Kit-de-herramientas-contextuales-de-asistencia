import {createContext, useState, useCallback} from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [shoot, setShoot] = useState(false);
  const trigger = useCallback(
    () => {
      setShoot(true);
      setShoot(false);
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