import { Octokit } from "octokit";
import {
  AllowedEntities,
  AllowedFetchModelsParameters,
  AllowedFetchModelsResponses,
  GitHubUser,
  ListFollowersParameters,
  ListUserRepositoriesParameters
} from "./types";

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN, 
});

export async function searchUsers(query: string, from: number, to: number, page: number) {
  try {
    const response = await octokit.rest.search.users({
      q: query,
      per_page: to - from,
      page: page,
    });
    const users = response.data.items as unknown as GitHubUser[];
    const count = response.data.total_count as number;
    return { users, count };
  } catch (error) {
    console.error("Error buscando usuarios:", error);
    throw error;
  }
}

export const getGithubUser = async (username: string): Promise<GitHubUser | Error> => {
  try {
    const userRequest = await octokit.rest.users.getByUsername({ username })
    return userRequest.data as GitHubUser;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export const getFollowers = async (username: string): Promise<GitHubUser[]> => {
  try {
    const response = await octokit.rest.users.listFollowersForUser({
      username,
      per_page: 10,
    });
    return response.data as unknown as GitHubUser[];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export const fetchModel = (type: AllowedEntities, args: ListUserRepositoriesParameters | ListFollowersParameters) => {
  const models: {
    [key: string]: (args: AllowedFetchModelsParameters) =>
      Promise<AllowedFetchModelsResponses>
  } = {
    "repositories": (args: ListUserRepositoriesParameters) => octokit.rest.repos.listForUser(args),
    "followers": (args: ListFollowersParameters) => octokit.rest.users.listFollowersForUser(args),
  }

  try {
    return models[type](args);
  } catch (e) {
    console.error(e);
  }
};

export const getInstanceFromOctokit = async (
  type: AllowedEntities,
  args: ListUserRepositoriesParameters | ListFollowersParameters
) => {
  try {
    return await fetchModel(type, args);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}
