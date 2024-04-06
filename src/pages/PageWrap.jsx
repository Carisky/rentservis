import React from "react";
import Nav from "../components/Nav";
import Box from "@mui/material/Box";

export default function PageWrap({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Nav />
      <Box
        sx={{
          flex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
