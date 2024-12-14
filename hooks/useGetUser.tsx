import { useState } from "react";
import { getGithubUser } from "../utils/github";
import { GitHubUser } from "../utils/types";

export const useGetUser = (username: string) => {
  const [user, setUser] = useState<GitHubUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUser =
    async () => {
      setLoading(true);
      const data: GitHubUser | Error = await getGithubUser(username);
      if (data instanceof Error) {
        setError(data.message);
        setLoading(false);
      } else {
        setError(null);
        setUser(data);
        setLoading(false);
      }
    };

  return { user, getUser, loading, error };
};
