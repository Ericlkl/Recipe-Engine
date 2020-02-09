import { isEqual } from 'lodash';
import { readFromCSV, storeInfoToCSV } from '../../services/csvhelper';
import { CsvRow } from '../../types';
describe('CSVHelper', () => {
  test('readFromCSV - should return CSV data', async () => {
    const database = await readFromCSV();
    expect(database.length).toBeGreaterThan(0);
  });

  test('storeInfoToCSV - should store new data to last row', async () => {
    const sample: CsvRow = {
      Fruit: 'Banana',
      Recipe: 'Banana cake with cream cheese frosting',
      Ingredients: [
        'Melted butter, to grease',
        '125g butter, at room temperature',
        '315g (1 1/2 cups) caster sugar',
        '1 1/4 cups mashed overripe banana (about 2 large bananas)',
        '2 eggs',
        '1 teaspoon vanilla extract',
        '100ml buttermilk',
        '225g (1 1/2 cups) self-raising flour',
        '1/2 teaspoon bicarbonate of soda',
        '1 banana, extra, to decorate',
        'Fresh lemon juice, to brush',
        '125g cream cheese, at room temperature',
        '50g unsalted butter, at room temperature',
        '230g (1 1/2 cups) icing sugar mixture',
        '1 1/2 teaspoons buttermilk'
      ].join('\r')
    };
    await storeInfoToCSV(sample);
    const database = await readFromCSV();

    expect(database[database.length - 1].Fruit).toBe(sample.Fruit);
    expect(database[database.length - 1].Recipe).toBe(sample.Recipe);
    expect(database[database.length - 1].Ingredients).toBe(sample.Ingredients);
  });
});
