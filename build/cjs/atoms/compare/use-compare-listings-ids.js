"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompareListingsIds = void 0;
const jotai_1 = require("jotai");
const react_1 = require("react");
const atom_with_storage_1 = require("../utils/atom-with-storage");
const compareListingsIdsAtom = (0, atom_with_storage_1.atomWithStorage)("compare-ids", []);
const useCompareListingsIds = () => {
    const [compareListingsIds, setCompareListingsIds] = (0, jotai_1.useAtom)(compareListingsIdsAtom);
    const addListing = (0, react_1.useCallback)((listingId) => {
        if (compareListingsIds.includes(listingId)) {
            return;
        }
        setCompareListingsIds((ids) => [...ids, listingId]);
    }, [compareListingsIds, setCompareListingsIds]);
    const removeListing = (0, react_1.useCallback)((listingId) => {
        setCompareListingsIds((ids) => ids.filter((id) => id !== listingId));
    }, [setCompareListingsIds]);
    const clearListings = (0, react_1.useCallback)(() => {
        setCompareListingsIds([]);
    }, [setCompareListingsIds]);
    const isListingInCompare = (0, react_1.useCallback)((listingId) => compareListingsIds.includes(listingId), [compareListingsIds]);
    return {
        compareListingsIds,
        addListing,
        removeListing,
        clearListings,
        isListingInCompare,
    };
};
exports.useCompareListingsIds = useCompareListingsIds;
//# sourceMappingURL=use-compare-listings-ids.js.map