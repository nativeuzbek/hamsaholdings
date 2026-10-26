import React, { createContext, useContext, useState, useEffect } from 'react';
import { Car, Language } from '../types';
import { INITIAL_CARS } from '../data/cars';
import { translations } from '../translations';

interface AppContextType {
  cars: Car[];
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  addCar: (car: Omit<Car, 'id'>) => Car;
  updateCar: (id: number, car: Partial<Car>) => void;
  deleteCar: (id: number) => void;
  toggleCarStatus: (id: number) => void;
  activeModalCar: Car | null;
  setActiveModalCar: (car: Car | null) => void;
  t: typeof translations['en'];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_CARS = 'hamsa_cars_v1';
const STORAGE_KEY_LANG = 'hamsa_lang_v1';
const STORAGE_KEY_AUTH = 'hamsa_admin_auth_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CARS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading cars from localStorage', e);
    }
    return INITIAL_CARS;
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LANG) as Language;
      if (stored && (stored === 'en' || stored === 'uz' || stored === 'ru')) {
        return stored;
      }
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [activeModalCar, setActiveModalCar] = useState<Car | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CARS, JSON.stringify(cars));
    } catch (e) {
      console.error('Failed saving cars', e);
    }
  }, [cars]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, lang);
    } catch {
      // ignore
    }
  };

  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === 'admin' && pass.trim() === 'hamsa2024') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    } catch {}
  };

  const addCar = (newCarData: Omit<Car, 'id'>): Car => {
    const nextId = cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1;
    const newCar: Car = {
      ...newCarData,
      id: nextId,
    };
    setCars(prev => [newCar, ...prev]);
    return newCar;
  };

  const updateCar = (id: number, updatedFields: Partial<Car>) => {
    setCars(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteCar = (id: number) => {
    setCars(prev => prev.filter(c => c.id !== id));
  };

  const toggleCarStatus = (id: number) => {
    setCars(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'Available' ? 'Sold' : 'Available' }
          : c
      )
    );
  };

  const t = translations[language] || translations.en;

  return (
    <AppContext.Provider
      value={{
        cars,
        language,
        setLanguage,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addCar,
        updateCar,
        deleteCar,
        toggleCarStatus,
        activeModalCar,
        setActiveModalCar,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
