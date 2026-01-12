import { Category } from "./category";
import { Recipe } from "./recipes";

export interface HomePageInfo {
  count: number;
  category: Category[];
  recipes: Recipe[];
}
