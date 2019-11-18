export function addOrRemove(items, item) {
    const index = items.indexOf(item);
    if (index === -1) {
        return [...items, item];
    } else {
        items.splice(index, 1);
        return [...items];
    }
}
