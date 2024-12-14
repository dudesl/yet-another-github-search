//un componente React que muestra la información de los seguidores de un usuario
// El componente recibe un listado de GitHubUser y los muestra en una lista stackeada

import { Stack } from "@mui/material";
import { GitHubUser } from "../utils/types";
import { UserCard } from "./UserCard";

interface FollowerListProps {
  followers: GitHubUser[];
}

export const FollowerList = ({ followers }: FollowerListProps) => (
  <Stack
    gap={2}
    sx={{
      width: { sx: "100%", sm: "50%" },
    }}
  >
    {followers?.length && followers.map((follower) => (
      <UserCard
        key={follower.id}
        avatarSrc={follower.avatar_url}
        login={follower.login}
      />
    ))}
  </Stack>
);
