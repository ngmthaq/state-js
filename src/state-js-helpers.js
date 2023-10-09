export class StateJSHelpers {
  timeouts = {};

  isObj(obj) {
    return (
      obj !== null &&
      obj !== undefined &&
      typeof obj === "object" &&
      !Array.isArray(obj)
    );
  }

  isObjDeepEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = this.isObj(val1) && this.isObj(val2);
      if (
        (areObjects && !this.isObjDeepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        return false;
      }
    }

    return true;
  }

  getObjDiffKeys(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const diffKeys = [];

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      const val1 = obj1[key];
      const val2 = obj2[key];
      const areObjects = this.isObj(val1) && this.isObj(val2);
      if (
        (areObjects && !this.isObjDeepEqual(val1, val2)) ||
        (!areObjects && val1 !== val2)
      ) {
        diffKeys.push(key);
      }
    }

    return diffKeys;
  }

  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  debounce(name, callback, ms = 1000) {
    if (this.timeouts[name]) clearTimeout(this.timeouts[name]);
    this.timeouts[name] = setTimeout(() => callback(), ms);
  }
}
