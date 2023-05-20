"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialValue = void 0;
const storage_1 = require("./storage");
const getInitialValue = (key) => {
    try {
        const value = storage_1.StorageManager.getStorage().getItem(key);
        return value ? JSON.parse(value) : undefined;
    }
    catch (error) {
        return undefined;
    }
};
exports.getInitialValue = getInitialValue;
//# sourceMappingURL=get-initial-value.js.map