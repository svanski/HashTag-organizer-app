type Unit<T> = {
    content: T;
}


export function SessionFacade<T>(sessionId: string) {
    sessionStorage.SessionName = sessionId;
    return {
        save: (item: T) => sessionStorage.setItem(sessionId, JSON.stringify({ content: item } as Unit<T>)),
       
        load: (): T | undefined => {
            const data = sessionStorage.getItem(sessionId);
            if (!data) {
                return undefined;
            }

            const unit = JSON.parse(data) as Unit<T>;
            return unit.content;
        }
    }
}