// Library
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { isEqualNotCaseSensetive } from './string';
import { CsvRow } from '../types';
// Target CSV path
const csvPath = path.resolve(__dirname, '../../', 'data', 'fruit.csv');

export const readFromCSV = async (): Promise<CsvRow[]> => {
  return new Promise((resolve, reject) => {
    // Create an result array, return it at the end
    const csvData: CsvRow[] = [];

    // Read every single row of CSV file
    fs.createReadStream(csvPath)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', (row: CsvRow) => csvData.push(row))
      .on('end', (rowCount: number) => resolve(csvData));
  });
};

export const storeInfoToCSV = async (row: CsvRow) => {
  try {
    // Read all fruit data from CSV file
    let database = await readFromCSV();
    // Checking data wheither exist before or not
    // If it is exist in our database, remove it
    database = database.filter((tempRow: CsvRow) =>
      isEqualNotCaseSensetive(tempRow.Fruit, row.Fruit) ? false : true
    );
    // Update / Push new record in the final row
    database.push(row);

    // Generate CSV data format for writing file
    const newData = [['Fruit', 'Recipe', 'Ingredients']];

    // Looping through all the record, create a csv data array for updating csv file
    database.forEach(({ Fruit, Recipe, Ingredients }) =>
      newData.push([Fruit, Recipe, Ingredients])
    );
    // Write array data into csv file
    csv
      .writeToPath(csvPath, newData)
      .on('error', err => console.error(err))
      .on('finish', () => console.log('Done writing.'));
  } catch (error) {
    console.log('Fail to store information to CSV');
    console.error(error);
  }
};
