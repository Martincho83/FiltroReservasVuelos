export const categoriasValidas = [
    "Turista",
    "Ejecutiva",
    "Premium",
    "Económica",
    "Familiar",
    "Aventura",
    "Romántica",
    "Negocios",
    "Mochilero",
    "Lujo",
    "Cultural",
    "Deportiva"
  ] as const;
  
  export type Categoria = typeof categoriasValidas[number];
  
  // Verificación en runtime
  export function esCategoriaValida(categoria: string): categoria is Categoria {
    return categoriasValidas.includes(categoria as Categoria);
  }