"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atomWithStorage = void 0;
const utils_1 = require("jotai/utils");
const storage_1 = require("./storage");
const get_initial_value_1 = require("./get-initial-value");
const atomWithStorage = (key, initialValue) => {
    var _a;
    return (0, utils_1.atomWithStorage)(key, (_a = (0, get_initial_value_1.getInitialValue)(key)) !== null && _a !== void 0 ? _a : initialValue, (0, utils_1.createJSONStorage)(storage_1.StorageManager.getStorage));
};
exports.atomWithStorage = atomWithStorage;
//# sourceMappingURL=atom-with-storage.js.map