import { LocationApi } from "../../services/api";
import { useGetGeoByParentIds } from "./use-get-geo-by-parent-ids";
import { useGetGeoByPoints } from "./use-get-geo-by-points";

interface useGeosParams extends LocationApi.getGeoByPointsParams {
	zoom: number;
	enabled?: boolean;
}

export const useGeos = ({
	ne_lat,
	ne_lng,
	sw_lat,
	sw_lng,
	zoom,
	enabled = true,
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
		enabled: zoom > 8 && enabled,
	});

	const tractsResponse = useGetGeoByParentIds({
		ids:
			subdivisionsResponse?.data?.polygons
				?.filter((subdivision) => !!subdivision?.id)
				.map((subdivision) => subdivision!.id) ?? [],
		geo_level: "tract",
		parent_level: "subdivision",
		enabled: zoom > 10 && enabled,
	});

	return {
		divisionsResponse,
		subdivisionsResponse,
		tractsResponse,
	};
};
