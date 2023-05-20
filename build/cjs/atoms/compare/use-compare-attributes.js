"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCompareAttributes = void 0;
const jotai_1 = require("jotai");
const react_1 = require("react");
const atom_with_storage_1 = require("../utils/atom-with-storage");
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
const compareAttributesAtom = (0, atom_with_storage_1.atomWithStorage)("compare-attributes", [
    { value: "type", label: "Type", key: "type" },
    { value: "beds", label: "Beds", key: "beds" },
    { value: "baths", label: "Baths", key: "baths" },
    { value: "sqft", label: "Sqft", key: "sqft" },
]);
const useCompareAttributes = () => {
    const [_selectedAttributes, setSelectedAttributes] = (0, jotai_1.useAtom)(compareAttributesAtom);
    const addSelectedAttribute = (0, react_1.useCallback)((attributeKey) => {
        setSelectedAttributes([
            ..._selectedAttributes,
            attributes.find((attribute) => attribute.key === attributeKey),
        ]);
    }, [_selectedAttributes, setSelectedAttributes]);
    const removeSelectedAttribute = (0, react_1.useCallback)((attributeKey) => {
        setSelectedAttributes(_selectedAttributes.filter((selectedAttribute) => selectedAttribute.key !== attributeKey));
    }, [_selectedAttributes, setSelectedAttributes]);
    const selectedAttributes = (0, react_1.useMemo)(() => attributes.filter((el) => _selectedAttributes.some((f) => f.key === el.key)), [_selectedAttributes]);
    return {
        attributes,
        selectedAttributes,
        addSelectedAttribute,
        removeSelectedAttribute,
        setSelectedAttributes,
    };
};
exports.useCompareAttributes = useCompareAttributes;
//# sourceMappingURL=use-compare-attributes.js.map