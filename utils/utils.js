export function addOrRemove(items, item) {
    const index = items.indexOf(item);
    if (index === -1) {
        return [...items, item];
    }
    else {
        items.splice(index, 1);
        return [...items];
    }
}

export function pushByKey(obj, key, item) {
    const group = obj[key];
    if (group) {
        obj[key] = [...group, item];
    }
    else {
        obj[key] = [item];
    }
}

export function pushByMapKey(obj, key, item) {
    const subObj = obj[key];
    if (subObj) {
        obj[key] = {...subObj, ...item};
    }
    else {
        obj[key] = {...item};
    }
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
