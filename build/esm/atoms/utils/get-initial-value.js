import { StorageManager } from "./storage";
export const getInitialValue = (key) => {
    try {
        const value = StorageManager.getStorage().getItem(key);
        return value ? JSON.parse(value) : undefined;
    }
    catch (error) {
        return undefined;
    }
};
//# sourceMappingURL=get-initial-value.js.map