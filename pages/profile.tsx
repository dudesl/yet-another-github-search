import React, { useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import Header from "@/components/Header";
import { ProfileResume } from "@/components/ProfileResume";
import { useGetUser } from "@/hooks/useGetUser";
import { RepositoriesList } from "@/components/RepositoriesList";
import { FollowerList } from "@/components/FollowerList";
import { useGetFollowers } from "@/hooks/useGetFollowers";
import { useGet } from "@/hooks/useGetInstance";
import { AllowedEntities, Repository } from "@/utils/types";
import HandleGridLoadingAndErrorComponent from "@/components/Loading";
import { useRouter } from "next/router";

export default function UserProfile() {
  const { query: { username = '' } } = useRouter();
  const { user: userInstance, loading: loadingUser, error: errorUser, getUser } = useGetUser(username as string);
  const { data: repositoriesInstances,
    loading: loadingRepositories,
    error: errorRepositories,
    getInstance
  } = useGet(AllowedEntities.REPO, {
    sort: "pushed",
    direction: "desc",
    per_page: 10,
    username: username as string,
  });
  const repositories: Repository[] | undefined = repositoriesInstances as unknown as Repository[] | [];
  const {
    followers: followerInstances,
    loading: loadingFollowers,
    error: errorFollowers,
    getFollowers
  } = useGetFollowers(null);

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  useEffect(() => {
    if (userInstance) {
      getInstance(userInstance.login);
      getFollowers(userInstance.login);
    }
  }, [userInstance]);

  return (
    <>
      <Head>
        <title>{`YAGUS - ${userInstance?.login}`}</title>
        <meta
          name="description"
          content={`Perfil de usuario de ${userInstance?.login}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="lg">
        <Header />

        <Grid container size={12} spacing={4} sx={{ padding: "1rem" }}>
          <HandleGridLoadingAndErrorComponent loading={loadingUser} error={errorUser} />
          {userInstance && (
            <>
              <ProfileResume user={userInstance} />
            </>
          )}
        </Grid>
        <Grid container size={12} spacing={8} sx={{ display: "flex" }}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <HandleGridLoadingAndErrorComponent loading={loadingRepositories} error={errorRepositories} />
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Repositorios
            </Typography>
            <Grid container size={12} spacing={2}>
              <RepositoriesList repositories={repositories} />
            </Grid>
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <HandleGridLoadingAndErrorComponent loading={loadingFollowers} error={errorFollowers} />
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              Seguidores
            </Typography>
            <Grid container size={12} spacing={2}>
              <FollowerList followers={followerInstances} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={12}
          sx={{
            textAlign: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <footer>Santiago Barchetta - MIT License - 2024</footer>
        </Grid>
      </Container>
    </>
  );
}
