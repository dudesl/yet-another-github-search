import { useCallback, useEffect, useState } from "react";
import {
  Repository,
  getRepositories as getGithubRepositories,
} from "./utils/github";

export const useGetRepositories = (username: string | null) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRepositories = useCallback(
    async (username: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getGithubRepositories(username);
        setRepositories(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [username]
  );

  return { repositories, getRepositories, loading, error };
};
