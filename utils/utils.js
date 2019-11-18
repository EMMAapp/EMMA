export function addOrRemove(items, item) {
    const index = items.indexOf(item);
    if (index === -1) {
        return [...items, item];
    } else {
        items.splice(index, 1);
        return [...items];
    }
}

export function pushByKey(obj, key, item) {
    const group = obj[key];
    if (group) {
        obj[key] = [...group, item];
    } else {
        obj[key] = [item];
    }
}
