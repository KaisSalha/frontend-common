import { SyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";
export declare const StorageManager: {
    getStorage: () => SyncStringStorage;
    setStorage: (newStorage: SyncStringStorage) => void;
};
