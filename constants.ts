import { MenuData } from './types';

// Palette Constants
export const COLORS = {
  orangeVibrant: '#FF5722',
  yellowStar: '#FFEB3B',
  redFire: '#D50000',
  greenFresh: '#00C853',
  bgParchment: '#F3E5AB',
  bgGrunge: '#F5F5F5',
};

// Data
export const DATA: MenuData = {
  informacion_negocio: {
    nombre: "Chicken's Lei",
    telefono_delivery: "948 327 953",
    servicio: "Delivery Gratis"
  },
  menu: [
    {
      categoria: "Pollos a la Brasa",
      theme: "parchment",
      imagen: "/pollo a la brasa.png",
      items: [
        {
          nombre: "1 Pollo",
          descripcion: "Incluye papas, cremas y ensalada.",
          precio: 60.00
        },
        {
          nombre: "1/2 Pollo",
          descripcion: "Incluye papas, cremas y ensalada.",
          precio: 31.00
        },
        {
          nombre: "1/4 Pollo",
          descripcion: "Incluye papas, cremas y ensalada.",
          precio: 16.00
        },
        {
          nombre: "Salchibrasa",
          descripcion: "1/4 Pollo + Hot Dog + Papas + Cremas + Ensalada.",
          precio: 18.00
        }
      ]
    },
    {
      categoria: "Pollo Broaster",
      theme: "parchment",
      imagen: "/broaster.png",
      nota: "Puedes pedirlo con papas o camotes fritos.",
      additions: [
        { name: "Huevo", price: 1.50 },
        { name: "Queso", price: 1.00 },
        { name: "Tocino", price: 1.00 }
      ],
      items: [
        { nombre: "Presa Pecho", precio: 13.00 },
        { nombre: "Presa Ala", precio: 13.00 },
        { nombre: "Presa Entrepierna", precio: 13.00 },
        { nombre: "Presa Pierna", precio: 13.00 },
        { nombre: "Pollo a la Canasta", descripcion: "Deli delicioso, con papas y camotes fritos.", precio: null }
      ]
    },
    {
      categoria: "Salchipapas",
      theme: "grunge",
      imagen: "/salchipapa.png",
      items: [
        {
          nombre: "Clásica",
          descripcion: "Hot Dog + Papas fritas.",
          precio: 8.00
        },
        {
          nombre: "Salchipapa con Huevo",
          descripcion: "Hot Dog + Huevo + Papas fritas.",
          precio: 10.00
        },
        {
          nombre: "Salchipapa Especial",
          descripcion: "Hamburguesa de carne + Hot Dog + Huevo + Papas fritas.",
          precio: 12.00
        },
        {
          nombre: "Salchichorizo",
          descripcion: "Hot Dog + Chorizo + Papas fritas.",
          precio: 11.00
        },
        {
          nombre: "Salchipollo",
          descripcion: "Hot Dog + Pollo deshilachado + Papas fritas.",
          precio: 12.00
        },
        {
          nombre: "Salchipapa Bravazo",
          descripcion: "Filete de pechuga de pollo + Hot Dog + Huevo + Queso.",
          precio: 15.00
        },
        {
          nombre: "Salchipapa Contundente",
          descripcion: "Hot Dog + Huevo + Queso + Jamón + Tocino + Papas fritas.",
          precio: 15.00
        }
      ]
    },
    {
      categoria: "Hamburguesas",
      theme: "grunge",
      imagen: "/hamburguesa.png",
      additions: [
        { name: "Huevo", price: 1.50 },
        { name: "Queso", price: 1.00 },
        { name: "Tocino", price: 1.00 }
      ],
      items: [
        { nombre: "Carne", precio: 7.00, descripcion: "Incluye papas fritas y ensalada." },
        { nombre: "Pollo", precio: 7.00, descripcion: "Incluye papas fritas y ensalada." },
        { nombre: "Pollo Deshilachado", precio: 7.00, descripcion: "Incluye papas fritas y ensalada." },
        { nombre: "Hot Dog", precio: 7.00, descripcion: "Incluye papas fritas y ensalada." },
        { nombre: "Chorizo", precio: 8.00, descripcion: "Incluye papas fritas y ensalada." },
        { nombre: "Filete de Pollo", precio: 8.00, descripcion: "Incluye papas fritas y ensalada." }
      ]
    },
    {
      categoria: "Hamburguesas Especiales",
      theme: "grunge",
      imagen: "/especiales.png",
      additions: [
        { name: "Huevo", price: 1.50 },
        { name: "Queso", price: 1.00 },
        { name: "Tocino", price: 1.00 }
      ],
      items: [
        {
          nombre: "Ranchera",
          descripcion: "Carne + Huevo + Tocino.",
          precio: 10.00
        },
        {
          nombre: "Royal",
          descripcion: "Carne + Huevo + Queso.",
          precio: 10.00
        },
        {
          nombre: "A lo Pobre",
          descripcion: "Carne + Huevo + Plátano.",
          precio: 10.00
        },
        {
          nombre: "Hawaiana",
          descripcion: "Carne + Queso Mozzarella + Piña.",
          precio: 12.00
        },
        {
          nombre: "Contundente",
          descripcion: "Carne + Huevo + Queso + Jamón + Tocino.",
          precio: 12.00
        },
        {
          nombre: "Pollo Especial",
          descripcion: "Pollo deshilachado + Hot Dog + Huevo + Queso.",
          precio: 12.00
        },
        {
          nombre: "Mega Carne",
          descripcion: "Carne doble + Queso doble + Tocino.",
          precio: 15.00
        },
        {
          nombre: "La Bataclana",
          descripcion: "Carne + Chorizo + Huevo + Queso + Tocino.",
          precio: 16.00
        },
        {
          nombre: "La Golosa",
          descripcion: "Carne + Filete de pollo + Huevo + Queso + Jamón + Tocino.",
          precio: 20.00
        }
      ]
    },
    {
      categoria: "Gaseosas",
      theme: "parchment",
      imagen: "/gaseosas.png",
      nota: "Sabores: Inka Cola o Coca-Cola",
      items: [
        // Gaseosa de vidrio
        { nombre: "Gaseosa Vidrio 1.5 Lt", precio: 9.00 },
        { nombre: "Gaseosa Vidrio 1 Lt", precio: 6.00 },
        { nombre: "Gaseosa Vidrio 500 ml", precio: 4.00, descripcion: "1/2 Litro" },
        { nombre: "Gaseosa Vidrio 296 ml", precio: 2.00 },
        { nombre: "Gaseosa Vidrio 137 ml", precio: 1.50 },

        // Gaseosa de plástico
        { nombre: "Gaseosa Plástico 3 Lt", precio: 15.00 },
        { nombre: "Gaseosa Plástico 1.5 Lt", precio: 9.00 },
        { nombre: "Gaseosa Plástico 1 Lt", precio: 6.00 },
        { nombre: "Gaseosa Plástico 600 ml", precio: 3.50 }
      ]
    }
  ]
};