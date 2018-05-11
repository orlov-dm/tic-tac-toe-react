function cloneDeepObject(obj) {
    let clone = {};
    for (const [ key, value ] of Object.entries(obj)) {
        switch (Object.prototype.toString.call(value)) {
            case '[object Object]': clone[key] = cloneDeepObject(value); break
            case '[object Array]': clone[key] = cloneDeepArray(value); break
            default: clone[key] = value;
        }
    }
    Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
    return clone;
};

function cloneDeepArray(arr) {
    let clone = [];
    for (const value of arr) {
        switch (Object.prototype.toString.call(value)) {
            case '[object Object]': clone.push(cloneDeepObject(value)); break
            case '[object Array]': clone.push(cloneDeepArray(value)); break
            default: clone.push(value);
        }
    }
    return clone;
};

export function cloneDeep(any) {
    switch (Object.prototype.toString.call(any)) {
        case '[object Object]': return cloneDeepObject(any);
        case '[object Array]': return cloneDeepArray(any);
        default: return any;
    }
}
