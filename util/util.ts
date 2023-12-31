/* eslint-disable no-param-reassign */

export function noop() {} // eslint-disable-line @typescript-eslint/no-empty-function

export function identity<T>(value: T): T {
  return value;
}

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

export function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

export function range(min: number, max?: number): number[] {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return Array.from({ length: max - min }, (_, i) => i + min);
}

export function lowerCase(str: string) {
  return str.toLowerCase();
}

export function startsWith(fullStr: string, subStr: string) {
  return fullStr.toLowerCase().startsWith(subStr.toLowerCase());
}

export function upperFirst(str: string) {
  if (str.length < 2) {
    return str.toUpperCase();
  }

  const [firstChar = "", rest] = [str[0], str.slice(1)];

  return `${firstChar.toUpperCase()}${rest.toLowerCase()}`;
}

export function capitalize(str?: string) {
  return isString(str) ? str.split(" ").map(upperFirst).join(" ") : "";
}

export function keyBy<A extends object, K extends PropertyKey>(
  array: A[],
  keyFn: (x: A) => K,
) {
  return array.reduce(
    (r, x) => ({ ...r, [keyFn(x)]: x }),
    {} as { [P in K]: A },
  );
}

export function uniqueBy<A, F extends (x: A) => PropertyKey>(
  arr: A[],
  selector: F,
) {
  const obj = arr.reduce(
    (accumulator, element) => {
      return {
        ...accumulator,
        [selector(element)]: element,
      };
    },
    {} as Record<PropertyKey, A>,
  );

  return Object.values(obj);
}

export const compareStrings = (valueA: string, valueB: string) => {
  return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
};

export const compareNumbers = (valueA: number, valueB: number) => {
  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};
