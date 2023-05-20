import {
	atomWithStorage as jotaiAtomWithStorage,
	createJSONStorage,
} from "jotai/utils";
import { StorageManager } from "./storage";
import { getInitialValue } from "./get-initial-value";

export const atomWithStorage = <T>(key: string, initialValue: T) =>
	jotaiAtomWithStorage<T>(
		key,
		getInitialValue(key) ?? initialValue,
		createJSONStorage<T>(StorageManager.getStorage)
	);
