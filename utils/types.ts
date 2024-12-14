import { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  followers_url: string;
  repos_url: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  url: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  pushed_at: string | null;
  forks: number;
  watchers: number;
}

export enum AllowedEntities {
  REPO = "repositories",
  FOLLOWERS = "followers",
}

export type AllowedFetchModelsParameters = ListUserRepositoriesParameters | ListFollowersParameters
export type AllowedFetchModelsResponses = ListUserRepositoriesResponse | ListFollowersResponse
export type AllowedFetchModelsResponsesData = ListUserRepositoriesResponse["data"] | ListFollowersResponse["data"]

// List User Repositories
export type ListUserRepositoriesParameters = RestEndpointMethodTypes["repos"]["listForUser"]["parameters"];
export type ListUserRepositoriesResponse = RestEndpointMethodTypes["repos"]["listForUser"]["response"];

// List Followers
export type ListFollowersParameters = RestEndpointMethodTypes["users"]["listFollowersForUser"]["parameters"];
export type ListFollowersResponse = RestEndpointMethodTypes["users"]["listFollowersForUser"]["response"];

// Update Issues Labels
export type ListLabelsParameters = RestEndpointMethodTypes["issues"]["updateLabel"]["parameters"];
export type UpdateLabelResponse = RestEndpointMethodTypes["issues"]["updateLabel"]["response"];