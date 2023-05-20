import { SyncStringStorage } from "jotai/vanilla/utils/atomWithStorage";

const getLocalStorage = () =>
	typeof window !== "undefined"
		? window?.localStorage
		: {
				getItem: () => null,
				setItem: () => null,
				removeItem: () => null,
		  };

const Store = () => {
	let storage: SyncStringStorage = getLocalStorage();

	const setStorage = (newStorage: SyncStringStorage) => {
		storage = newStorage;
	};

	const getStorage = (): SyncStringStorage => storage;

	return { getStorage, setStorage };
};

export const StorageManager = Store();
