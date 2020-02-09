// Types
export type Recipe = {
  RecipeName: string;
  Ingredients: string[];
  best?: boolean;
};

export type CsvRow = {
  Fruit: string;
  Recipe: string;
  Ingredients: string;
};
