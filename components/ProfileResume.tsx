import React, { useEffect, useState } from "react";
import {
  Grid2 as Grid,
  Avatar,
  Box,
  Typography,
  Link,
  useTheme,
  IconButton,
} from "@mui/material";

import {
  BadgeOutlined as BadgeOutlinedIcon,
  LocationOnOutlined as LocationOnOutlinedIcon,
  Link as LinkIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from "@mui/icons-material";
import { GitHubUser } from "../utils/types";

interface ProfileResumeProps {
  user: GitHubUser;
}

export const ProfileResume = ({ user }: ProfileResumeProps) => {
  const theme = useTheme();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    setIsFavorite(favorites[user.login] || false);
  }, [user.login]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    favorites[user.login] = !isFavorite;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <Grid
      sx={{
        textAlign: "left",
        display: "flex",
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        width: "100%",
      }}
    >
      <Avatar
        alt="User Avatar"
        variant="rounded"
        src={user.avatar_url}
        sx={{
          width: {
            xs: "100%",
            sm: theme.spacing(30),
          },
          height: "auto",
          maxHeight: theme.spacing(40),
          marginRight: "2rem",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            component="span"
            sx={{ marginRight: "1rem" }}
            variant="h5"
            gap={4}
          >
            {user.name}
          </Typography>
          <IconButton
            onClick={handleFavoriteClick}
            sx={{
              alignSelf: "center",
              padding: theme.spacing(1),
              verticalAlign: "middle",
            }}
          >
            {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
          </IconButton>
        </Box>

        <Link component="span">@{user.login}</Link>
        <Typography sx={{ padding: "1em 0" }}>{user.bio}</Typography>
        {user.company && (
          <Typography
            sx={{
              display: "flex",
              justifyItems: "center",
              fontSize: 14,
            }}
          >
            <BadgeOutlinedIcon
              sx={{
                fontSize: 18,
                marginRight: "0.5rem",
                alignSelf: "center",
              }}
            />
            {user.company}
          </Typography>
        )}
        {user.location && (
          <Typography
            sx={{
              display: "flex",
              justifyItems: "center",
              fontSize: 14,
            }}
          >
            <LocationOnOutlinedIcon
              sx={{
                fontSize: 18,
                marginRight: "0.5rem",
                alignSelf: "center",
              }}
            />
            {user.location}
          </Typography>
        )}

        {user.blog && (
          <Typography
            sx={{
              display: "flex",
              justifyItems: "center",
              fontSize: 14,
            }}
          >
            <LinkIcon
              sx={{
                fontSize: 18,
                marginRight: "0.5rem",
                alignSelf: "center",
              }}
            />
            <Link
              href={user.blog}
              sx={{
                color: theme.palette.primary.dark,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {user.blog}
            </Link>
          </Typography>
        )}
        <Grid container gap={2} sx={{ mt: theme.spacing(2) }}>
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              {user.followers}
            </Typography>
            <Typography
              component="span"
              sx={{ display: "flex", justifyItems: "center" }}
            >
              Seguidores
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              {user.following}
            </Typography>
            <Typography
              component="span"
              sx={{ display: "flex", justifyItems: "center" }}
            >
              Siguiendo
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              {user.public_repos}
            </Typography>
            <Typography
              component="span"
              sx={{ display: "flex", justifyItems: "center" }}
            >
              Repositorios
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};
