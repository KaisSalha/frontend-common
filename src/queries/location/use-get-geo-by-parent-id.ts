import { useQuery } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export const useGetGeoByParentId = ({
	id,
	geo_level,
	parent_level,
}: LocationApi.getGeoByParentIdParams) =>
	useQuery([QUERY_IDS.geos, id, geo_level, parent_level], () =>
		LocationApi.getGeosByParentId({ id, geo_level, parent_level })
	);
