import _ from 'lodash';

export const formatString = (str: string) => {
  return _.trim(str).toLowerCase();
};

export const isEqualNotCaseSensetive = (strA: string, strB: string) => {
  return formatString(strA) === formatString(strB);
};
