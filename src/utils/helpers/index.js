import { Map, List } from "immutable";

export const isMapContain = map => Map.isMap(map) && map.size > 0;
export const isListContain = list => List.isList(list) && list.size > 0;
export const isArrayContain = array => Array.isArray(array) && array.length > 0;

export const isInList = (list, value, key) => {
  if (isListContain(list)) {
    const comp = key
      ? list.findIndex(item => item.get(key) === value)
      : list.findIndex(item => item === value);
    return comp !== -1;
  }
  return false;
};
export const findInList = (list, value, key) => {
  if (isListContain(list)) {
    let result = List([]);
    list.forEach(item => {
      if (item.get(key) === value) {
        result = result.push(item);
      }
    });
    return result ? result.first() : null;
  }
  return false;
};

export const isInArray = (array, value, key) => {
  if (isArrayContain(array)) {
    const comp = key
      ? array.findIndex(item => item[key] === value)
      : array.findIndex(item => item === value);
    return comp !== -1;
  }
  return false;
};
export const findInArray = (array, value, key) => {
  if (isArrayContain(array)) {
    const result = [];
    array.forEach(item => {
      if (item[key] === value) {
        result.push(item);
      }
    });
    return result ? result[0] : null;
  }
  return false;
};
