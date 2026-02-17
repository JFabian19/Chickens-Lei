
import { MenuData, MenuCategory, MenuItem } from '../types';

export const GoogleSheetsService = {
    async fetchFromGoogleSheets(categoriesUrl: string, dishesUrl: string): Promise<MenuData | null> {
        try {
            const [categoriesResponse, dishesResponse] = await Promise.all([
                fetch(categoriesUrl),
                fetch(dishesUrl)
            ]);

            if (!categoriesResponse.ok || !dishesResponse.ok) {
                throw new Error('Failed to fetch data from Google Sheets');
            }

            const categoriesCsv = await categoriesResponse.text();
            const dishesCsv = await dishesResponse.text();

            return this.parseMenuData(categoriesCsv, dishesCsv);
        } catch (error) {
            console.error('Error fetching menu data:', error);
            return null;
        }
    },

    parseCSV(csvText: string): Record<string, string>[] {
        const lines = csvText.split('\n').map(line => line.trim()).filter(line => line);
        if (lines.length < 2) return [];

        const parseLine = (line: string): string[] => {
            const values: string[] = [];
            let inQuote = false;
            let currentValue = '';

            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '"') {
                    inQuote = !inQuote;
                } else if (char === ',' && !inQuote) {
                    values.push(currentValue);
                    currentValue = '';
                } else {
                    currentValue += char;
                }
            }
            values.push(currentValue);
            return values;
        };

        const headers = parseLine(lines[0]).map(h => h.trim());

        return lines.slice(1).map(line => {
            const values = parseLine(line);
            return headers.reduce((obj, header, index) => {
                obj[header] = values[index]?.trim() || '';
                return obj;
            }, {} as Record<string, string>);
        });
    },

    parseMenuData(categoriesCsv: string, dishesCsv: string): MenuData {
        const categoriesRaw = this.parseCSV(categoriesCsv);
        const dishesRaw = this.parseCSV(dishesCsv);

        const menuCategories: MenuCategory[] = categoriesRaw.map(cat => ({
            categoria: cat.categoria,
            theme: (cat.theme || 'parchment') as 'parchment' | 'grunge',
            imagen: cat.imagen || undefined,
            nota: cat.nota || undefined,
            items: []
        }));

        dishesRaw.forEach(dish => {
            const category = menuCategories.find(c => c.categoria === dish.categoria);
            if (category) {
                const price = dish.precio ? parseFloat(dish.precio) : null;
                category.items.push({
                    nombre: dish.nombre,
                    descripcion: dish.descripcion || undefined,
                    precio: isNaN(price as number) ? null : price
                });
            }
        });

        // Default business info for now, usually static or another sheet
        return {
            informacion_negocio: {
                nombre: "Chicken's Lei",
                telefono_delivery: "948 327 953",
                servicio: "Delivery Gratis"
            },
            menu: menuCategories
        };
    }
};
