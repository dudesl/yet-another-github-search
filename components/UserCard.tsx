import { Star, StarBorder } from "@mui/icons-material";
import {
  Card,
  Box,
  CardContent,
  Typography,
  Avatar,
  Link,
  IconButton,
} from "@mui/material";
import theme from "@/styles/theme";
import { MouseEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

export interface UserCardProps {
  avatarSrc: string;
  login: string;
}

export const UserCard = ({ avatarSrc, login }: UserCardProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    setIsFavorite(favorites[login] || false);
  }, [login]);

  const handleFavoriteClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");
    favorites[login] = !isFavorite;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  interface NavigationEvent extends MouseEvent<HTMLAnchorElement> {
    preventDefault: () => void;
  }

  interface HandleNavigation {
    (e: NavigationEvent, profileId: string): void;
  }

  const handleNavigation: HandleNavigation = (e, profileId) => {
    e.preventDefault();
    router.push(`/profile?username=${profileId}`);
  };

  return (
    <Card>
      <Link
        href={`/profile?username=${login}`}
        sx={{
          color: theme.palette.primary.dark,
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
          width: "100%",
          fontSize: "1.2rem",
        }}
        onClick={(e) => handleNavigation(e, login)}
      >
        <Box>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Avatar
              alt="User Avatar"
              src={avatarSrc}
              variant="rounded"
              sx={{
                width: theme.spacing(10),
                height: theme.spacing(10),
              }}
            />
            <Typography
              component="div"
              variant="h5"
              sx={{ fontSize: "1.2rem", width: "100%", pl: 2 }}
            >
              {login}
            </Typography>
            <IconButton
              onClick={handleFavoriteClick}
              sx={{
                alignSelf: "flex-start",
                right: 0,
                top: 0,
                padding: theme.spacing(1),
              }}
            >
              {isFavorite ? <Star color="primary" /> : <StarBorder />}
            </IconButton>
          </CardContent>
        </Box>
      </Link>
    </Card>
  );
};
