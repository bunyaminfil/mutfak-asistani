export type InitStateFood = {
    foods: [];
    loading: number;
    error: null | string;
};
export interface IFoods {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}
