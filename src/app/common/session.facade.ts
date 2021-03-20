export function SessionFacade<T>(sessionId: string) {
    sessionStorage.SessionName = sessionId;

    return {
        save: (item: T) => sessionStorage.setItem(sessionId, JSON.stringify(item)),
        load: (): T | undefined => sessionStorage.getItem(sessionId) ? JSON.parse(sessionStorage.getItem(sessionId) as string) : undefined
    }
}