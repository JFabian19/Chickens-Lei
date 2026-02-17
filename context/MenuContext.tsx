
import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuData } from '../types';
import { DATA } from '../constants';
import { GoogleSheetsService } from '../services/GoogleSheetsService';

interface MenuContextType {
    menuData: MenuData;
    loading: boolean;
    error: string | null;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [menuData, setMenuData] = useState<MenuData>(DATA);
    const [loading, setLoading] = useState(false); // Start false to show initial data
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only fetch if URLs are provided in environment or constants
        // For now we use hardcoded placeholders, or check if they are set
        const categoriesUrl = import.meta.env.VITE_CATEGORIES_SHEET_URL || '';
        const dishesUrl = import.meta.env.VITE_DISHES_SHEET_URL || '';

        if (categoriesUrl && dishesUrl) {
            setLoading(true);
            GoogleSheetsService.fetchFromGoogleSheets(categoriesUrl, dishesUrl)
                .then(data => {
                    if (data) {
                        setMenuData(data);
                    } else {
                        setError('Failed to load menu data');
                    }
                })
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }
    }, []);

    return (
        <MenuContext.Provider value={{ menuData, loading, error }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
