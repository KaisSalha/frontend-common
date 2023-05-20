import { useAtom } from "jotai";
import { useCallback } from "react";
import { atomWithStorage } from "../utils/atom-with-storage";

const compareListingsIdsAtom = atomWithStorage<Array<string>>(
	"compare-ids",
	[]
);

export const useCompareListingsIds = () => {
	const [compareListingsIds, setCompareListingsIds] = useAtom(
		compareListingsIdsAtom
	);

	const addListing = useCallback(
		(listingId: string) => {
			if (compareListingsIds.includes(listingId)) {
				return;
			}

			setCompareListingsIds((ids) => [...ids, listingId]);
		},
		[compareListingsIds, setCompareListingsIds]
	);

	const removeListing = useCallback(
		(listingId: string) => {
			setCompareListingsIds((ids) =>
				ids.filter((id) => id !== listingId)
			);
		},
		[setCompareListingsIds]
	);

	const clearListings = useCallback(() => {
		setCompareListingsIds([]);
	}, [setCompareListingsIds]);

	const isListingInCompare = useCallback(
		(listingId: string) => compareListingsIds.includes(listingId),
		[compareListingsIds]
	);

	return {
		compareListingsIds,
		addListing,
		removeListing,
		clearListings,
		isListingInCompare,
	};
};
