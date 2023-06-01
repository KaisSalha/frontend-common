import { useMutation, useQuery } from "@tanstack/react-query";
import { ProfileApi } from "../../services/api";

type Params = {
	fetchEnabled?: boolean;
};

export const useProfile = (params?: Params) => {
	const fetchEnabled = params?.fetchEnabled ?? true;

	const { data, error } = useQuery<ProfileApi.Profile, Error>(
		["profile"],
		() => ProfileApi.getProfile(),
		{
			enabled: fetchEnabled,
			staleTime: 1000 * 60 * 10, // 10 minutes
		}
	);

	const { mutateAsync: createProfile, isLoading: isLoadingCreateProfile } =
		useMutation(
			async (createProfileObj: ProfileApi.createProfileParams) => {
				const response = await ProfileApi.createProfile(
					createProfileObj
				);

				return response;
			},
			{}
		);

	return {
		profile: data,
		isLoading: !error && !data,
		error,
		createProfile,
		isLoadingCreateProfile,
	};
};
