import React from 'react'
import Grid from '@mui/material/Grid';
import {useHistory} from "react-router-dom";
import {logoff} from "../services/Firebase";
import Button from '@mui/material/Button';

export default function Menu() {

    let history = useHistory();
    const efetuarLogoff = () => {
        logoff()
            .then(()=>history.push("/"))
    }


    return (
        <div>
            <Grid container spacing={1}>
            <Grid item xs={3}>
                    <Button onClick={()=> history.push("/home")} variant="outlined" fullWidth>
                        Home
                    </Button>
                </Grid>
            <Grid item xs={3}>
                    <Button onClick={()=> history.push("/criaranuncio")}  variant="outlined" fullWidth>
                        Anunciar Itens
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" fullWidth>
                        Ver anuncios
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant="outlined" onClick={efetuarLogoff} fullWidth>
                        Logoff
                    </Button>
                </Grid>

            </Grid>
        </div>
    )
}
