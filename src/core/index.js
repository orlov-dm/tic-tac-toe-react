function cloneDeepObject(obj) {
  const clone = {};
  Object.entries(obj).forEach((entry) => {
    const [key, value] = entry;
    switch (Object.prototype.toString.call(value)) {
      case '[object Object]': clone[key] = cloneDeepObject(value); break;
      case '[object Array]': clone[key] = cloneDeepArray(value); break;
      default: clone[key] = value;
    }
  });
  Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
  return clone;
}

function cloneDeepArray(arr) {
  const clone = [];
  arr.forEach((value) => {
    switch (Object.prototype.toString.call(value)) {
      case '[object Object]': clone.push(cloneDeepObject(value)); break;
      case '[object Array]': clone.push(cloneDeepArray(value)); break;
      default: clone.push(value);
    }
  });
  return clone;
}

export function cloneDeep(any) {
  switch (Object.prototype.toString.call(any)) {
    case '[object Object]': return cloneDeepObject(any);
    case '[object Array]': return cloneDeepArray(any);
    default: return any;
  }
}

export default class Core {
  static get cloneDeep() {
    return cloneDeep;
  }
}
