export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cookTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  instructions: string[];
  author: string;
  createdAt: string;
}