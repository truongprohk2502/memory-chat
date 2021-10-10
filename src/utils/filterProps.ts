export const getFilterPropsObject = (object: any, props: string[]) => {
  const filterObject = {};
  for (const prop in object) {
    if (!props.includes(prop)) {
      filterObject[prop] = object[prop];
    }
  }
  return filterObject;
};
