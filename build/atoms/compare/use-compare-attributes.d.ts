export type AttributeKey = "type" | "beds" | "baths" | "sqft" | "built" | "priceSqft" | "maintenanceFee" | "parking" | "locker" | "ensuiteLaundry" | "outdoorSpace" | "exposure" | "amenities";
export interface Attribute {
    value: string;
    label: string;
    key: AttributeKey;
}
export type CompareAttributes = Attribute[];
export declare const useCompareAttributes: () => {
    attributes: CompareAttributes;
    selectedAttributes: Attribute[];
    addSelectedAttribute: (attributeKey: AttributeKey) => void;
    removeSelectedAttribute: (attributeKey: AttributeKey) => void;
    setSelectedAttributes: (args_0: typeof import("jotai/utils").RESET | CompareAttributes | ((prev: CompareAttributes) => typeof import("jotai/utils").RESET | CompareAttributes)) => void;
};
