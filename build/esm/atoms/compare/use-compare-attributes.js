import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { atomWithStorage } from "../utils/atom-with-storage";
const attributes = [
    { value: "type", label: "Type", key: "type" },
    { value: "beds", label: "Beds", key: "beds" },
    { value: "baths", label: "Baths", key: "baths" },
    { value: "sqft", label: "Sqft", key: "sqft" },
    { value: "built", label: "Built", key: "built" },
    { value: "priceSqft", label: "Price sqft", key: "priceSqft" },
    {
        value: "maintenanceFee",
        label: "Maintenance fee",
        key: "maintenanceFee",
    },
    { value: "parking", label: "Parking", key: "parking" },
    { value: "locker", label: "Locker", key: "locker" },
    {
        value: "ensuiteLaundry",
        label: "Ensuite laundry",
        key: "ensuiteLaundry",
    },
    { value: "outdoorSpace", label: "Outdoor space", key: "outdoorSpace" },
    { value: "exposure", label: "Exposure", key: "exposure" },
    { value: "amenities", label: "Amenities", key: "amenities" },
];
const compareAttributesAtom = atomWithStorage("compare-attributes", [
    { value: "type", label: "Type", key: "type" },
    { value: "beds", label: "Beds", key: "beds" },
    { value: "baths", label: "Baths", key: "baths" },
    { value: "sqft", label: "Sqft", key: "sqft" },
]);
export const useCompareAttributes = () => {
    const [_selectedAttributes, setSelectedAttributes] = useAtom(compareAttributesAtom);
    const addSelectedAttribute = useCallback((attributeKey) => {
        setSelectedAttributes([
            ..._selectedAttributes,
            attributes.find((attribute) => attribute.key === attributeKey),
        ]);
    }, [_selectedAttributes, setSelectedAttributes]);
    const removeSelectedAttribute = useCallback((attributeKey) => {
        setSelectedAttributes(_selectedAttributes.filter((selectedAttribute) => selectedAttribute.key !== attributeKey));
    }, [_selectedAttributes, setSelectedAttributes]);
    const selectedAttributes = useMemo(() => attributes.filter((el) => _selectedAttributes.some((f) => f.key === el.key)), [_selectedAttributes]);
    return {
        attributes,
        selectedAttributes,
        addSelectedAttribute,
        removeSelectedAttribute,
        setSelectedAttributes,
    };
};
//# sourceMappingURL=use-compare-attributes.js.map