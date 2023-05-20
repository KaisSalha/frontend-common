import { useAtom } from "jotai";
import { useCallback } from "react";
import { atomWithStorage } from "../utils/atom-with-storage";
const compareListingsIdsAtom = atomWithStorage("compare-ids", []);
export const useCompareListingsIds = () => {
    const [compareListingsIds, setCompareListingsIds] = useAtom(compareListingsIdsAtom);
    const addListing = useCallback((listingId) => {
        if (compareListingsIds.includes(listingId)) {
            return;
        }
        setCompareListingsIds((ids) => [...ids, listingId]);
    }, [compareListingsIds, setCompareListingsIds]);
    const removeListing = useCallback((listingId) => {
        setCompareListingsIds((ids) => ids.filter((id) => id !== listingId));
    }, [setCompareListingsIds]);
    const clearListings = useCallback(() => {
        setCompareListingsIds([]);
    }, [setCompareListingsIds]);
    const isListingInCompare = useCallback((listingId) => compareListingsIds.includes(listingId), [compareListingsIds]);
    return {
        compareListingsIds,
        addListing,
        removeListing,
        clearListings,
        isListingInCompare,
    };
};
//# sourceMappingURL=use-compare-listings-ids.js.map