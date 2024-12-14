import { getInstanceFromOctokit } from "@/utils/github";
import {
    AllowedEntities,
    AllowedFetchModelsResponsesData,
    ListFollowersParameters,
    ListUserRepositoriesParameters,
} from "@/utils/types";
import { useState } from "react";

export const useGet = (type: AllowedEntities, args: ListUserRepositoriesParameters | ListFollowersParameters) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<AllowedFetchModelsResponsesData | undefined>();

    const getInstance = async (username: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getInstanceFromOctokit(type, { ...args, username });
            setData(response?.data);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, getInstance, loading, error };
};