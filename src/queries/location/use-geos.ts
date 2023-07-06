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
		enabled,
	});

	const subdivisionsResponse = useGetGeoByParentIds({
		ids:
			divisionsResponse?.data?.polygons.map((division) => division.id) ??
			[],
		geo_level: "subdivision",
		parent_level: "division",
		enabled:
			zoom > 8 &&
			enabled &&
			!!divisionsResponse?.data?.polygons?.length &&
			!divisionsResponse.isLoading,
	});

	const tractsResponse = useGetGeoByParentIds({
		ids:
			subdivisionsResponse?.data?.polygons
				?.filter((subdivision) => !!subdivision?.id)
				.map((subdivision) => subdivision!.id) ?? [],
		geo_level: "tract",
		parent_level: "subdivision",
		enabled:
			zoom > 10 &&
			enabled &&
			!!subdivisionsResponse?.data?.polygons?.length &&
			!subdivisionsResponse.isLoading &&
			!divisionsResponse.isLoading,
	});

	return {
		divisionsResponse,
		subdivisionsResponse,
		tractsResponse,
		isLoading:
			divisionsResponse.isLoading ||
			subdivisionsResponse.isLoading ||
			tractsResponse.isLoading,
		isFetching:
			divisionsResponse.isFetching ||
			subdivisionsResponse.isFetching ||
			tractsResponse.isFetching,
	};
};
