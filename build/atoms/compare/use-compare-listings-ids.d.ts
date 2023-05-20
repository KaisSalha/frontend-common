export declare const useCompareListingsIds: () => {
    compareListingsIds: string[];
    addListing: (listingId: string) => void;
    removeListing: (listingId: string) => void;
    clearListings: () => void;
    isListingInCompare: (listingId: string) => boolean;
};
