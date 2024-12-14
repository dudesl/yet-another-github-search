import React, { ChangeEvent, useCallback, useState } from "react";
import Head from "next/head";
import { Box, Container, Grid2 as Grid } from "@mui/material";
import Header from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { UserCard } from "@/components/UserCard";
import { PaginationSearch } from "@/components/PaginationSearch";
import { searchUsers } from "@/utils/github";
import { GitHubUser } from "@/utils/types";
import HandleGridLoadingAndErrorComponent from "@/components/Loading";

export default function Home() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //@NOTE: This page size is only for testing purpose, extract this information from API.
  const pageSize = 20;

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
    page: 1,
  });

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const { users, count } = await searchUsers(
          query,
          pagination.from,
          pagination.to,
          pagination.page
        );
        setUsers(users);
        setPagination((prev) => ({ ...prev, count }));
      } catch (error) {
        setError("Error al realizar la busqueda");
        console.error("Error buscando usuarios:", error);
      } finally {
        setLoading(false);
      }
    },
    [query, pagination]
  );

  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuery(e.target.value);
      setPagination((prev) => ({ ...prev, page: 1 }));
    },
    []
  );

  const handlePageChange = useCallback(
    async (event: ChangeEvent<unknown>, page: number) => {
      const from = (page - 1) * pageSize;
      const to = (page - 1) * pageSize + pageSize;
      setPagination((prev) => ({ ...prev, from, to, page }));
      setLoading(true);
      setError(null);
      try {
        const { users, count } = await searchUsers(query, from, to, page);
        setUsers(users);
        setPagination((prev) => ({ ...prev, count }));
      } catch (error) {
        setError("Error al intentar cambiar de pagina");
        console.error("Error cambiando de página:", error);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  return (
    <>
      <Head>
        <title>Yet Another Github User Search</title>
        <meta name="description" content="yet another github user search" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="lg">
        <Header />

        {/* Contenedor */}
        <Grid container spacing={4} size={12} sx={{ padding: "1rem" }}>
          {/* Buscador */}
          <Grid size={12} sx={{ textAlign: "center", padding: "1rem" }}>
            <SearchBar
              onSubmit={(e) => onSubmit(e)}
              onChangeInput={(e) => onChangeInput(e)}
            />
          </Grid>

          {/* Cards de usuarios */}
          <Grid
            container
            rowSpacing={1}
            size={12}
            flexDirection={"column"}
            sx={{ minHeight: "20rem", justifyContent: "space-around" }}
          >
            <HandleGridLoadingAndErrorComponent loading={loading} error={error} />
            {users.length > 0 && !loading && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "left",
                    gap: "1rem",
                  }}
                >
                  {users.map((user, index) => (
                    <Grid key={`grid-${index}`} size={{ md: 4, sm: 6, xs: 12 }}>
                      <UserCard
                        key={`card-${index}`}
                        avatarSrc={`${user.avatar_url}`}
                        login={user.login}
                      />
                    </Grid>
                  ))}
                </Box>
              </>
            )}
            {users.length > 0 && !loading && 
              <PaginationSearch
                onPageChange={handlePageChange}
                pagination={{ ...pagination }}
              />
            }
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
        </Grid>
      </Container>
    </>
  );
}
