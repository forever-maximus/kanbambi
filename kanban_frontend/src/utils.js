
// Use this to convert entities from server to more manageable format for redux 
export const arrayToObject = (array, keyField) => (
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})
);