let accessToken: string | null = null;
let listeners: Array<() => void> = [];

export const authStore = {
    getAccessToken: () => accessToken,

    setAccessToken: (token: string | null) => {
        accessToken = token;
        listeners.forEach(l => l());
    },

    isAuthenticated: () => !!accessToken,

    subscribe: (listener: () => void) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    },

    clear: () => {
        accessToken = null;
        listeners.forEach(l => l());
    }
};
