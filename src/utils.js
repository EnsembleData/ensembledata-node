/**
 * @param {string} str
 * @returns {string}
 */
function toSnakeCase(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

/**
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export function toSnakeCaseObject(obj) {
    /** @type {Record<string, any>} */
    const newObj = {};
    for (let key in obj) {
        const snakeKey = toSnakeCase(key);
        newObj[snakeKey] = obj[key];
    }
    return newObj;
}

/**
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 */
export function filterUndefinedValues(obj) {
    /** @type {Record<string, any>} */
    const newObj = {};
    for (let key in obj) {
        if (obj[key] !== undefined) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
