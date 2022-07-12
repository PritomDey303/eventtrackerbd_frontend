import { Grid } from "@mui/material";
import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="footer">
      <Grid container>
        <Grid item xs={12}>
          <h2 className="footer-heading anton">EventTrackerBD.com</h2>
        </Grid>
      </Grid>
    </div>
  );
}
