export type BurgerIngredientKey =
  | 'breadTop'
  | 'breadBottom'
  | 'patty'
  | 'cheese'
  | 'lettuce'
  | 'tomato'
  | 'onion'
  | 'pickle'
  | 'bacon'
  | 'sauce';

export type IngredientConfig = {
  key: BurgerIngredientKey;
  label: string;
  max: number;
  // Ruta esperada del asset 3D GLB. Úsala cuando conectes el renderizador 3D.
  modelPath: string;
};

export const TOTAL_INGREDIENTS_LIMIT = 10;

export const BURGER_INGREDIENTS: IngredientConfig[] = [
  { key: 'breadBottom', label: 'PanAbajo', max: 1, modelPath: 'assets/model/PanAbajo' },
  { key: 'patty', label: 'Carne', max: 2, modelPath: 'assets/model/Carne.glb' },
  { key: 'cheese', label: 'Queso', max: 2, modelPath: 'assets/model/queso.glb' },
  { key: 'tomato', label: 'Tomates', max: 2, modelPath: 'assets/model/Tomates.glb' },
  { key: 'breadTop', label: 'PanArriba', max: 1, modelPath: 'assets/model/PanArriba.glb' },
];