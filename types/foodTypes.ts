export type InitStateFood = {
    foods: [];
    category: [];
    mealDetails: null | IMeal;
    loading: number;
    error: null | string;
};
export interface IFoods {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}
export interface IMeal {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strInstructions: string;
}
