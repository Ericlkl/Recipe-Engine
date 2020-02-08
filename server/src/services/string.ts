// Library
import _ from 'lodash';

// Format the string in order to make the search progress smooth
// 1. Trim the string so that will be no redundant space in string
// 2. convert the string to lowercase
export const formatString = (str: string) => {
  return _.trim(str).toLowerCase();
};

// Compare two case in a Not Case Sensetive Enviornment
export const isEqualNotCaseSensetive = (strA: string, strB: string) => {
  return formatString(strA) === formatString(strB);
};
