import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";

import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
import AppWidgetSummary from "../../sections/@dashboard/app/AppWidgetSummary";
import { getBackupDatabase, getDashboardData } from "../../features/admin/adminActions";
import AEButton from "../../components/AEButton";

export default function DashboardApp() {
  const dispatch = useDispatch();

  const { dashboardData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardData())
  }, []);

  const handleBackup = () => {  
    dispatch(getBackupDatabase())
  }


  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Container flex sx={{ justifyContent: "space-between" }}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi, Welcome back
          </Typography>

          <AEButton
            fullWidth
            title="Backup Database"
            onClick={handleBackup}
          />
        </Container>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Users"
              total={dashboardData?.userCount || 0}
              icon={"ant-design:android-filled"}
              bgColor={"rgb(209, 233, 252)"}
              color={"rgb(16, 57, 150)"}
              backgroundImage={
                "rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Messages"
              total={dashboardData?.messageCount || 0}
              color={"rgb(12, 83, 183)"}
              bgColor={"rgb(208, 242, 255)"}
              icon={"ant-design:apple-filled"}
              backgroundImage={
                "rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Item Orders"
              total={1723315}
              color={"rgb(183, 129, 3);"}
              bgColor={"rgb(255, 247, 205)"}
              icon={"ant-design:windows-filled"}
              backgroundImage={
                "rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%"
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Bug Reports"
              total={234}
              color={"rgb(122, 12, 46);"}
              bgColor={"rgb(255, 231, 217)"}
              icon={"ant-design:bug-filled"}
              backgroundImage={
                "rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%"
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
