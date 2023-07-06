import { LocationApi } from "../../services/api";
import { useGetGeoByParentIds } from "./use-get-geo-by-parent-ids";
import { useGetGeoByPoints } from "./use-get-geo-by-points";

interface useGeosParams extends LocationApi.getGeoByPointsParams {
	zoom: number;
}

export const useGeos = ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	zoom,
}: useGeosParams) => {
	const divisionsResponse = useGetGeoByPoints({
		ne_lat,
		ne_lng,
		sw_lat,
		sw_lng,
		geo_level: "division",
	});

	const subdivisionsResponse = useGetGeoByParentIds({
		ids:
			divisionsResponse?.data?.polygons.map((division) => division.id) ??
			[],
		geo_level: "subdivision",
		parent_level: "division",
	});

	const tractsResponse = useGetGeoByParentIds({
		ids:
			divisionsResponse?.data?.polygons.map((division) => division.id) ??
			[],
		geo_level: "tract",
		parent_level: "division",
		enabled: zoom > 8,
	});

	return {
		divisionsResponse,
		subdivisionsResponse,
		tractsResponse,
	};
};
