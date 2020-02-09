import {
  existInTable,
  isFruit,
  getRecipeDetails,
  searchRecipes
} from '../../services/fruitManager';

describe('fruitManager Helper', () => {
  test('existInTable - should return trun if fruit in csv', async () => {
    expect(await existInTable('banana')).toBeTruthy();
  });

  test('existInTable - should return false if fruit not in csv', async () => {
    expect(await existInTable('fjdspfdosjf')).toBeFalsy();
  });

  test('isFruit - should return true if the query is fruit', async () => {
    expect(await isFruit('banana')).toBeTruthy();
  });

  test('isFruit - should return false if the query is not fruit', async () => {
    expect(await isFruit('oisaosdifydiof')).toBeFalsy();
  });

  test('getRecipeDetails - should return recipe details', async () => {
    const recipe = await getRecipeDetails(
      'recipes/choc-chip-banana-muffins/b262be02-4eac-43ad-9f4c-e516ab50e4b0'
    );
    expect(recipe.RecipeName === 'Choc chip banana muffins').toBeTruthy();
  });

  test('searchRecipes - should return recipes hrefs if the query is fruit', async () => {
    const hrefs = await searchRecipes('banana');
    expect(hrefs.length).toBeGreaterThan(0);
  });
});
