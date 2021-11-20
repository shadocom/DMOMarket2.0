import React, {useState , useLayoutEffect} from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Footer from "../components/Footer"
import Menu from '../components/Menu';

export default function Recados() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("")
    const [msg, setMsg] = useState("")



    return (
        <Grid container spacing={1}>
            <Menu/>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <TextField 
          type="text"  
          id="outlined-basic" 
          label="Nome" 
          variant="outlined" 
          fullWidth
          value={nome}
          onChange={(e)=> setNome(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField 
          type="email" 
          id="outlined-basic" 
          label="E-mail" 
          variant="outlined" 
          fullWidth
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField 
          type="text" 
          id="outlined-basic" 
          label="Assunto" 
          variant="outlined" 
          fullWidth
          value={assunto}
          onChange={(e)=> setAssunto(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <TextField 
          type="text" 
          id="outlined-basic" 
          label="Mensagem" 
          variant="outlined" 
          fullWidth
          multiline
          rows={4}
          value={msg}
          onChange={(e)=> setMsg(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
            <Button variant="contained" size="small">
                Enviar aos Devs
            </Button>
        </Grid>
        <Grid><Footer/></Grid>
        </Grid>
    )
}
