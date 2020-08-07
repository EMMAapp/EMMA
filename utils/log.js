export function logInfo(message) {
    if (!__DEV__) {
        return;
    }
    console.log(message)
}

export function logWarn(message) {
    if (!__DEV__) {
        return;
    }
    console.warn(message)
}

export function logError(context, message) {
    // In this case, you might want to report the error to your error reporting service, for example Sentry
    console.error(context, message)
}
