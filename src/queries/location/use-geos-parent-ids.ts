import { useMemo } from "react";
import { LocationApi } from "../../services/api";
import { useGetGeoByPoints } from "./use-get-geo-by-points";

interface useGeosParams extends LocationApi.getGeoByPointsParams {
	zoom: number;
	enabled?: boolean;
}

export const useGeosParentIds = ({
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

	const ids = useMemo(
		() => divisionsResponse?.data?.polygons.map((division) => division.id),
		[divisionsResponse?.data?.polygons]
	);

	const subdivisionsResponse = useGetGeoByPoints({
		ne_lat,
		ne_lng,
		sw_lat,
		sw_lng,
		geo_level: "subdivision",
		parent_level: "division",
		ids,
		enabled:
			zoom > 8 &&
			zoom < 12 &&
			enabled &&
			!!divisionsResponse?.data?.polygons?.length &&
			!divisionsResponse.isLoading &&
			!divisionsResponse.isPreviousData,
	});

	const tractsResponse = useGetGeoByPoints({
		ne_lat,
		ne_lng,
		sw_lat,
		sw_lng,
		geo_level: "tract",
		parent_level: "division",
		ids,
		enabled:
			zoom > 11 &&
			enabled &&
			!!divisionsResponse?.data?.polygons?.length &&
			!divisionsResponse.isLoading &&
			!divisionsResponse.isPreviousData,
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
