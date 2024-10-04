import { useEffect } from "react";
import { Box, Pagination } from "@mui/material";

interface PaginationSearchProps {
  onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  pagination: { from: number; to: number; count: number };
}

export const PaginationSearch = ({
  onPageChange,
  pagination,
}: PaginationSearchProps) => {
  useEffect(() => {
    console.log(
      "Paginando desde",
      pagination.from,
      "hasta",
      pagination.to,
      pagination.count
    );
  }, [pagination.to, pagination.from]);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      sx={{
        margin: "20px 0px",
      }}
    >
      <Pagination
        onChange={onPageChange}
        count={Math.ceil(pagination.count / pagination.to)}
      />
    </Box>
  );
};
