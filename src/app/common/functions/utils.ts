import Web3 from 'web3';
import fromExponential from 'from-exponential';

export const maximumUint256Value =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
  
export const isNumeric = (num: any) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !isNaN(num as number);
  
export const generateRandomInteger = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

const repeatStringNumTimes = (string: string, times: string | number) => {
  const timesInNum = +times;
  if (timesInNum < 0) return '';
  if (timesInNum === 1) return string;
  else return string + repeatStringNumTimes(string, timesInNum - 1);
};

export const toDecimals = (amount, decimals) => {
  const amountNonExponential = fromExponential(amount);
  const dotIndex = amountNonExponential.indexOf('.');
  let amountInDecimals =
    dotIndex > -1
      ? amountNonExponential
          .substring(0, dotIndex + +decimals + 1)
          .replace(/\./, '')
      : amountNonExponential;
  if (dotIndex > -1) {
    const amountDecimalCount = amountNonExponential.length - 1 - dotIndex;
    const differenceOfDecimals = decimals - amountDecimalCount;
    if (differenceOfDecimals > 0) {
      amountInDecimals += repeatStringNumTimes(
        '0',
        decimals - (amountNonExponential.length - dotIndex - 1),
      );
    }
  } else {
    amountInDecimals += repeatStringNumTimes('0', decimals);
  }
  return amountInDecimals;
};

export const fromDecimals = (
  amount: string,
  decimals,
  isFixed = false,
): string => {
  let newAmount = '';

  if (amount.length <= decimals) {
    newAmount +=
      repeatStringNumTimes('0', 1 + +decimals - amount.length) + amount;
  } else newAmount = amount;

  newAmount =
    newAmount.substring(0, newAmount.length - decimals) +
    '.' +
    newAmount.substring(newAmount.length - decimals);

  if (newAmount.indexOf('.') > -1) {
    newAmount = newAmount.replace(/^00/, '0');

    newAmount = replaceRecursively(/0$/, newAmount, '');
    newAmount = newAmount.replace(/\.$/, '');
  }

  return newAmount;

  // 6 decimal test cases
  // 123456 => 0.123456
  // 3456 => 0.003456
  // 9123456 => 9.123456
  // 9000000 => 9
  // 123456 => 0.123456
};

export const toExactFixed = (
  number: number | string,
  decimals: number,
  withZeroEnds = false,
): string => {
  let nonExponentialNumber = fromExponential(number);
  if (nonExponentialNumber === '0') {
    return '0';
  }
  const dotIndex = nonExponentialNumber.indexOf('.');

  const partAfterDot =
    dotIndex > -1 ? nonExponentialNumber.substring(dotIndex + 1) : '';

  if (withZeroEnds && partAfterDot.length < decimals) {
    const difference = decimals - partAfterDot.length;
    if (dotIndex === -1) nonExponentialNumber += '.';
    nonExponentialNumber += repeatStringNumTimes('0', difference);
  }

  const subNonExponentialNumber = nonExponentialNumber.substring(
    0,
    dotIndex + +decimals + 1,
  );

  const returnValueWithZeroEnds =
    dotIndex > -1 ? subNonExponentialNumber : nonExponentialNumber;

  return withZeroEnds
    ? returnValueWithZeroEnds
    : dotIndex > -1
    ? String(+returnValueWithZeroEnds)
    : returnValueWithZeroEnds;
};

const replaceRecursively = (pattern, oldString, newString) => {
  if (!pattern.test(oldString)) return oldString;
  const generatedString = oldString.replace(pattern, newString);
  return replaceRecursively(pattern, generatedString, newString);
};

export const hasCorrectDecimals = (
  number: number | string,
  decimals: number,
): boolean => {
  return fromExponential(number) === toExactFixed(number, decimals, true);
};

export const addressIsValid =(address) =>{
  return Web3.utils.isAddress(address);
}