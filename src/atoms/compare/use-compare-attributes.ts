import { useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import { atomWithStorage } from "../utils/atom-with-storage";

export type AttributeKey =
	| "type"
	| "beds"
	| "baths"
	| "sqft"
	| "built"
	| "priceSqft"
	| "maintenanceFee"
	| "parking"
	| "locker"
	| "ensuiteLaundry"
	| "outdoorSpace"
	| "exposure"
	| "amenities";

export interface Attribute {
	value: string;
	label: string;
	key: AttributeKey;
}

export type CompareAttributes = Attribute[];

const attributes: CompareAttributes = [
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

const compareAttributesAtom = atomWithStorage<CompareAttributes>(
	"compare-attributes",
	[
		{ value: "type", label: "Type", key: "type" },
		{ value: "beds", label: "Beds", key: "beds" },
		{ value: "baths", label: "Baths", key: "baths" },
		{ value: "sqft", label: "Sqft", key: "sqft" },
	]
);

export const useCompareAttributes = () => {
	const [_selectedAttributes, setSelectedAttributes] = useAtom(
		compareAttributesAtom
	);

	const addSelectedAttribute = useCallback(
		(attributeKey: AttributeKey) => {
			setSelectedAttributes([
				..._selectedAttributes,
				attributes.find(
					(attribute) => attribute.key === attributeKey
				) as Attribute,
			]);
		},
		[_selectedAttributes, setSelectedAttributes]
	);

	const removeSelectedAttribute = useCallback(
		(attributeKey: AttributeKey) => {
			setSelectedAttributes(
				_selectedAttributes.filter(
					(selectedAttribute) =>
						selectedAttribute.key !== attributeKey
				)
			);
		},
		[_selectedAttributes, setSelectedAttributes]
	);

	const selectedAttributes = useMemo(
		() =>
			attributes.filter((el) =>
				_selectedAttributes.some((f) => f.key === el.key)
			),
		[_selectedAttributes]
	);

	return {
		attributes,
		selectedAttributes,
		addSelectedAttribute,
		removeSelectedAttribute,
		setSelectedAttributes,
	};
};
