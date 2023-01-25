import React, {useEffect} from "react";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {Calculate} from "@mui/icons-material";
import {useRouter} from "next/router";
import { useTranslation } from "react-i18next";
import { useIntl } from "react-intl";


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
                      <Typography variant="h1" textAlign="center">Abinoten Rechner</Typography>
                  </CardContent>
              </Card>
          </Grid>
          <Grid item xs={12} />
          <Grid item xs={12}>
              <Card style={{backgroundColor: '#ffffff7d'}}>
                  <CardContent>
                      {formatMessage({id: 'test'})}
                      <Typography paragraph textAlign="center">
                          Der Abinoten-Rechner ist eine einfache Webapplikation, die dazu gebaut wurde,
                          um den Abischnitt eines Nutzers auszurechnen. Es gibt bisher nur Unterstützung für
                          Schleswig-Holstein. Aber zukünftig wird auch noch mehr dazu kommen. Hierbei können
                          die Noten mehrerer Zeugnisse hinterlegt werden. Wenn ein Halbjahr fehlt, kann man dieses einfach
                          anhand der anderen Zeugnisse errechnen lassen. Final wird dann der optimale Abischnitt berechnet
                          und alle Schritte der Berechnung offengelegt.
                          Aber Achtung, der Rechner beachtet nicht, die Wahl der Prüfungsfächer. Man kann also in der Theorie
                          zwei mal Mathe als Kernfach wählen, obwohl dies eigentlich nicht möglich ist. Hier wird also auf die
                          richtige Fächerwahl des Nutzers gesetzt.
                          Desweiteren wird momentan noch keine 5. Vorabi Prüfung unterstützt. Es wird also drauf gesetzt, dass
                          der Nutzer nur 4 anstelle von 5 Abi-Prüfungen absolviert
                      </Typography>
                  </CardContent>
              </Card>
          </Grid>
      </Grid>
  );
}
