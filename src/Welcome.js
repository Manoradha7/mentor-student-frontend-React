import * as React from "react";
import Typography from "@mui/material/Typography";

export function Welcome() {
  return (
    <div className="home">
      <Typography
        className="Home-content"
        variant="h3"
        gutterBottom
        component="div"
      >
        Welcome to ZHSS 🏫
      </Typography>
    </div>
  );
}
