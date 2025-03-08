import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  favorites: any[];
  addToFavorites: (item: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const addToFavorites = (item: any) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === item.id)
        ? prevFavorites.filter((fav) => fav.id !== item.id)
        : [...prevFavorites, item]
    );
  };

  return (
    <AppContext.Provider value={{ favorites, addToFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};
