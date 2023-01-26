import React, {useEffect} from "react";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {Calculate} from "@mui/icons-material";
import {useRouter} from "next/router";
import { useTranslation } from "react-i18next";
import { useIntl } from "react-intl";

/**
 * Default home page
 *
 * @constructor
 */
export default function Home() {

    const router = useRouter();
    const {formatMessage} = useIntl();

    useEffect(() => {
        if (router.pathname === '/') {
            document.body.classList.add("bg");
            document.body.style.backgroundImage = 'url("landing-page.jpg")';
        }
        return () => {
            document.body.classList.remove("bg");
            document.body.style.backgroundImage = '';
        }
    }, [router.pathname]);
  return (
      <Grid container direction="row" justifyContent="center" columnSpacing={2} spacing={2}>
          <Grid item xs={12}>
              <Card style={{backgroundColor: '#ffffff7d'}}>
                  <CardContent>
                      <Typography variant="h1" textAlign="center">{formatMessage({id: 'main-header'})}</Typography>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
              <Card style={{backgroundColor: '#ffffff7d'}}>
                  <CardContent>
                      <Typography paragraph textAlign="center">
                        {formatMessage({id: 'landing-text'})}
                      </Typography>
                  </CardContent>
              </Card>
          </Grid>
      </Grid>
  );
}
