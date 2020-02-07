import XLSX from 'xlsx';

export const searchFruitInTable = (fruit: string) => {
  let workbook = XLSX.readFile('food.xlsx');
  console.log(workbook); //should print an array with the excel file data
};
