import { useQuery } from '@tanstack/react-query';
import { httpService } from '../../services';

type CocktailDto = {
    idDrink: string | null;
    strDrink: string | null;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strVideo: string | null;
    strCategory: string | null;
    strIBA: string | null;
    strAlcoholic: string | null;
    strGlass: string | null;
    strInstructions: string | null;
    strDrinkThumb: string | null;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strImageSource: string | null;
    strImageAttribution: string | null;
    strCreativeCommonsConfirmed: 'No';
    dateModified: '2017-09-02 17:39:48';
};

type Cocktail = {
    idDrink: string | null;
    strDrink: string | null;
    strCategory: string | null;
    strAlcoholic: string | null;
    strGlass: string | null;
    strInstructions: string | null;
    strDrinkThumb: string | null;
    ingredients: { ingredient: string; measure: string }[];
};

const mapCocktailDtoToCocktail = (dto: CocktailDto): Cocktail => {
    const dtoKeys = Object.keys(dto) as Array<keyof CocktailDto>;

    const ingredients = dtoKeys.reduce<Cocktail['ingredients']>((acc, rec) => {
        if (rec.startsWith('strIngredient')) {
            if (dto[rec]) {
                const index = rec.replace('strIngredient', '');
                const measureKey = `strMeasure${index}` as keyof CocktailDto;

                acc.push({
                    ingredient: dto[rec],
                    measure: dto[measureKey] || '—',
                });
            }
        }

        return acc;
    }, []);

    return {
        ...dto,
        ingredients,
    };
};

export const useGetCocktails = (cocktail: string) => {
    return useQuery({
        queryKey: [cocktail],
        queryFn: async () =>
            await httpService
                .get<{ drinks: CocktailDto[] }>(cocktail)
                .then((res) => res.drinks.map(mapCocktailDtoToCocktail)),
        staleTime: Infinity,
    });
};
