import { useQuery } from "@tanstack/react-query";
import { LocationApi } from "../../services/api";
import { QUERY_IDS } from "../utils/query-ids";

export const useAreas = () =>
	useQuery([QUERY_IDS.areas], () => LocationApi.getAreas());
