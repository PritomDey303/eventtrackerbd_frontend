import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Grid } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
export default function Footer() {
  const navItems = [
    [1, "Home", "/"],
    [2, "Create Event", "/create-event"],
    [3, "Your Events", "/your-events"],
    [4, "Sign Up", "/signup"],
    [5, "Login", "/signin"],
  ];
  const icons = [
    [1, FacebookIcon, "https://www.facebook.com/pritom.dey.520"],
    [2, LinkedInIcon, "#"],
    [3, GitHubIcon, "#"],
  ];

  function Icons(props) {
    const { Icon } = props;
    return (
      <div className="icons-container">
        <Icon className="icon" />
      </div>
    );
  }

  return (
    <div className="footer">
      <Grid container>
        <Grid item xs={12}>
          <h2 className="footer-heading anton">EventTrackerBD.com</h2>
          <div className="footer-nav">
            {navItems.map((item) => (
              <div className="navlink-container" key={item[0]}>
                <NavLink to={item[2]} className="navlink">
                  <p className="footer-nav-item ">{item[1]}</p>
                </NavLink>
              </div>
            ))}
          </div>
          <div className="social-media-icons">
            {icons.map((item) => (
              <a key={item[0]} href={item[2]} target="_blank" rel="noreferrer">
                <Icons Icon={item[1]} key={item[0]} />
              </a>
            ))}
          </div>
          <div className="copyright">
            <p className="copyright-text">
              Copyright ©2022 All rights reserved | This website is owned by{" "}
              <span>EventTrackerBD</span>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
