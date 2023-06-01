import { useMutation, useQuery } from "@tanstack/react-query";
import {
	Profile,
	createProfileParams,
	getProfile,
	createProfile as createProfileApi,
} from "services/api/profile-api";

type Params = {
	fetchEnabled?: boolean;
};

export const useProfile = (params?: Params) => {
	const fetchEnabled = params?.fetchEnabled ?? true;

	const { data, error } = useQuery<Profile, Error>(
		["profile"],
		() => getProfile(),
		{
			enabled: fetchEnabled,
			staleTime: 1000 * 60 * 10, // 10 minutes
		}
	);

	const { mutateAsync: createProfile, isLoading: isLoadingCreateProfile } =
		useMutation(async (createProfileObj: createProfileParams) => {
			const response = await createProfileApi(createProfileObj);

			return response;
		}, {});

	return {
		profile: data,
		isLoading: !error && !data,
		error,
		createProfile,
		isLoadingCreateProfile,
	};
};
