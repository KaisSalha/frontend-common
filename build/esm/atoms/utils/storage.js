const getLocalStorage = () => typeof window !== "undefined"
    ? window === null || window === void 0 ? void 0 : window.localStorage
    : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
    };
const Store = () => {
    let storage = getLocalStorage();
    const setStorage = (newStorage) => {
        storage = newStorage;
    };
    const getStorage = () => storage;
    return { getStorage, setStorage };
};
export const StorageManager = Store();
//# sourceMappingURL=storage.js.map