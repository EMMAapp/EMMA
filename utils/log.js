
const DEV = __DEV__ || true

export function logInfo(message) {
    if (!DEV) {
        return;
    }
    console.log(message)
}

export function logWarn(message) {
    if (!DEV) {
        return;
    }
    console.warn(message)
}

export function logError(context, message) {
    console.error(context, message)
}
