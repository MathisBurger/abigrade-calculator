import React, {useEffect} from "react";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {Calculate} from "@mui/icons-material";
import {useRouter} from "next/router";


export default function Home() {

    const router = useRouter();

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
                      <Typography variant="h1" textAlign="center">Abinoten Rechner</Typography>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
              <Card style={{backgroundColor: '#ffffff7d'}}>
                  <CardContent>
                      <Typography paragraph textAlign="center">
                          Der Abinoten-Rechner ist eine einfache Webapplikation, die dazu gebaut wurde,
                          um den Abischnitt eines Nutzers auszurechnen. Es gibt bisher nur Unterstützung für
                          Schleswig-Holstein. Aber zukünftig wird auch noch mehr dazu kommen. Hierbei können
                          die Noten mehrerer Zeugnisse hinterlegt werden. Wenn ein Halbjahr fehlt, kann man dieses einfach
                          anhand der anderen Zeugnisse errechnen lassen. Final wird dann der optimale Abischnitt berechnet
                          und alle Schritte der Berechnung offengelegt.
                      </Typography>
                  </CardContent>
              </Card>
          </Grid>
          <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
          >
              <Grid item xs={6}>
                  <Button variant="contained" color="primary" size="large">
                      <Calculate /> &nbsp;
                      Zum Rechner
                  </Button>
              </Grid>
          </Grid>
      </Grid>
  );
}
