import { CircularProgress, Typography } from "@mui/material";
import React from "react";

interface HandleGridLoadingAndErrorProps {
    loading: boolean;
    error?: string | null;
}

const HandleGridLoadingAndErrorComponent = ({ loading, error }: HandleGridLoadingAndErrorProps): JSX.Element => {
    if (error) {
        return <Typography variant="h6">{error}</Typography>;
    }
    if (loading) {
        return <CircularProgress />;
    }
    return <></>;
}

export default HandleGridLoadingAndErrorComponent;