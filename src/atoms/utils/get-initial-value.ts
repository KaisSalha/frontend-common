import { StorageManager } from "./storage";

export const getInitialValue = (key: string) => {
	try {
		const value = StorageManager.getStorage().getItem(key);

		return value ? JSON.parse(value) : undefined;
	} catch (error) {
		return undefined;
	}
};
