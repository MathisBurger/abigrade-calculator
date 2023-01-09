import React, {CSSProperties, useEffect} from "react";
import {Button, Grid, Typography} from "@mui/material";
import styles from "../styles/Home.module.scss";
import {Calculate} from "@mui/icons-material";

const boxStyle: CSSProperties = {
    background: '#ffffff7d',
    borderRadius: '8px',
    marginTop: '30px',
    maxWidth: 'fit-content',
    padding: '5px'
};

export default function Home() {

    useEffect(() => {
        document.body.classList.add("bg");
        document.body.style.backgroundImage = 'url("landing-page.jpg")';
        return () => {
            document.body.classList.remove("bg");
            document.body.style.backgroundImage = '';
        }
    }, []);
  return (
      <Grid container direction="row" style={{width: '100vw'}} justifyContent="center" columnSpacing={2}>
          <Grid item xs={12} style={boxStyle}>
              <Typography variant="h1" textAlign="center">Abinoten Rechner</Typography>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12} style={boxStyle} className={styles.mainText}>
              <Typography paragraph textAlign="center">
                  Der Abinoten-Rechner ist eine einfache Webapplikation, die dazu gebaut wurde,
                  um den Abischnitt eines Nutzers auszurechnen. Es gibt bisher nur Unterstützung für
                  Schleswig-Holstein. Aber zukünftig wird auch noch mehr dazu kommen. Hierbei können
                  die Noten mehrerer Zeugnisse hinterlegt werden. Wenn ein Halbjahr fehlt, kann man dieses einfach
                  anhand der anderen Zeugnisse errechnen lassen. Final wird dann der optimale Abischnitt berechnet
                  und alle Schritte der Berechnung offengelegt.

              </Typography>
          </Grid>
          <Grid
              item
              xs={12}
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
              style={{marginTop: '30px'}}
          >
              <Grid item xs={2}>
                  <Button variant="contained" color="primary" size="large">
                      <Calculate /> &nbsp;
                      Zum Rechner
                  </Button>
              </Grid>
          </Grid>
      </Grid>
  );
}
