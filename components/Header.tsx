import React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Link, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Header() {
  const theme = useTheme();
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    router.push(`/`);
  };

  return (
    <Box sx={{ padding: "1rem 0" }}>
      <Link
        href="/"
        sx={{ color: "inherit", textDecoration: "none" }}
        onClick={(e) => handleNavigation(e)}
      >
        <Typography
          variant="h3"
          component="h3"
          sx={{
            textAlign: "center",
            mt: 4,
            color: theme.palette.text.primary,
            fontWeight: "bold",
          }}
        >
          Yet Another Github User Search
        </Typography>
      </Link>
    </Box>
  );
}
