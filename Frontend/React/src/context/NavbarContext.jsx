import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  const openNavbar = () => {
    setIsOpen(true);
    // Pokreni animaciju nakon što se meni otvori
    setTimeout(() => {
      setCartAnimation(true);
      // Resetuj animaciju nakon 2 sekunde
      setTimeout(() => {
        setCartAnimation(false);
      }, 2000);
    }, 300); // Sačekaj da se meni otvori
  };

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen, cartAnimation, openNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
}; 