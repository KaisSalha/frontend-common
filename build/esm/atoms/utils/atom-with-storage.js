import { atomWithStorage as jotaiAtomWithStorage, createJSONStorage, } from "jotai/utils";
import { StorageManager } from "./storage";
import { getInitialValue } from "./get-initial-value";
export const atomWithStorage = (key, initialValue) => {
    var _a;
    return jotaiAtomWithStorage(key, (_a = getInitialValue(key)) !== null && _a !== void 0 ? _a : initialValue, createJSONStorage(StorageManager.getStorage));
};
//# sourceMappingURL=atom-with-storage.js.map