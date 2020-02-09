// Import Target
import { isEqualNotCaseSensetive, formatString } from '../../helper/string';

describe('string helper', () => {
  test('formatString - should trim and lowercase', () => {
    expect(formatString(' ASD ')).toBe('asd');
  });

  test(`isEqualNotCaseSensetive - 
    match two string without counting extra space and case `, () => {
    expect(isEqualNotCaseSensetive('  AbCCEd', '    abcceD  ')).toBeTruthy();
  });
});
