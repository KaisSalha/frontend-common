import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_IDS } from "../utils/query-ids";
import { ProfileApi } from "../../services/api";

type Params = {
	fetchEnabled?: boolean;
};

export const useProfile = (params?: Params) => {
	const queryClient = useQueryClient();

	const fetchEnabled = params?.fetchEnabled ?? true;

	const { data, error } = useQuery(
		[QUERY_IDS.profile],
		() => ProfileApi.getProfile(),
		{
			enabled: fetchEnabled,
			staleTime: 1000 * 60 * 10, // 10 minutes
		}
	);

	const { mutateAsync: createProfile, isLoading: isLoadingCreateProfile } =
		useMutation({
			mutationFn: async (
				createProfileObj: ProfileApi.createProfileParams
			) => {
				const response = await ProfileApi.createProfile(
					createProfileObj
				);

				return response;
			},
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: [QUERY_IDS.profile],
				});
			},
		});

	return {
		profile: data,
		isLoading: !error && !data,
		error,
		createProfile,
		isLoadingCreateProfile,
	};
};
