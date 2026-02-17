export interface MenuItem {
  nombre: string;
  descripcion?: string;
  precio: number | null;
}

export interface MenuCategory {
  categoria: string;
  nota?: string;
  items: MenuItem[];
  // Helper for UI theme decision
  theme: 'parchment' | 'grunge';
  imagen?: string;
}

export interface BusinessInfo {
  nombre: string;
  telefono_delivery: string;
  servicio: string;
}

export interface MenuData {
  informacion_negocio: BusinessInfo;
  menu: MenuCategory[];
}