import React, {useState, useLayoutEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { saveAnuncio, getAnuncio } from '../services/Firebase';

export default function Criaranuncio() {

    const [nomeitem, setNomeitem] = useState("")
    const [nometamer, setNometamer] = useState("")
    const [nomeserv, setNomeserv] = useState("")
    const [preco, setPreco] = useState("")
    const [quantia, setQuantia] = useState("")
    const [anuncios, setAnuncios] = useState([])

    useLayoutEffect(() => {
        pegarAnuncios()
        
    }, [])

    const pegarAnuncios = async () => {
        let dados = await getAnuncio()
        setAnuncios(dados)
    }

    const servidores = [
        {label: 'Omegamon'},
        {label: 'Lucemon'},
        {label: 'Barbamon'},
        {label: 'Lilithmon'},
        {label: 'Belzemon'},
        {label: 'Leviamon'},
    ]

    const save=()=>{
        let objeto={
            nomeitem: nomeitem,
            nometamer: nometamer,
            preco: preco,
            quantia: quantia,
            nomeserv: nomeserv
        }
        try {
            saveAnuncio(objeto)
            console.log("dados salvos")
        } catch (error) {
            console.log(error)
        }
        
    }


    return (
        <div>
            <h1>Cadastrar um Item à venda</h1>
            <Grid container spacing={1}>
            <Grid item xs={2}>
                <TextField 
                type="nomeitem"  
                id="outlined-basic" 
                label="Nome do Item" 
                variant="outlined" 
                fullWidth
                value={nomeitem}
                onChange={(e)=> setNomeitem(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                type="nometamer"  
                id="outlined-basic" 
                label="Nome do Tamer" 
                variant="outlined" 
                fullWidth
                value={nometamer}
                onChange={(e)=> setNometamer(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                type="preco"  
                id="outlined-basic" 
                label="Preço" 
                variant="outlined" 
                fullWidth
                value={preco}
                onChange={(e)=> setPreco(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
            <TextField 
                type="quantia"  
                id="outlined-basic" 
                label="Quantidade Disponivel" 
                variant="outlined" 
                fullWidth
                value={quantia}
                onChange={(e)=> setQuantia(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={servidores}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Servidor" />}
                    value={nomeserv}
                    onChange={(e)=> setNomeserv(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
            <Button variant="contained" size="small" onClick={save}>
            Anunciar
            </Button>
            </Grid>
            </Grid>
        </div>
    )
}
