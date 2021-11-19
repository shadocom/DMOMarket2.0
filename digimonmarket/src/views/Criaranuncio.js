import React, {useState, useLayoutEffect} from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { saveAnuncio, getAnuncio, deleteAnuncio } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    const deletar = async (id) => {
        await deleteAnuncio(id)
        await pegarAnuncios()
    }

    
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
                type="text"  
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
                type="text"  
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
                type="text"  
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
                type="text"  
                id="outlined-basic" 
                label="Quantidade Disponivel" 
                variant="outlined" 
                fullWidth
                value={quantia}
                onChange={(e)=> setQuantia(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
            <TextField 
                type="text"  
                id="outlined-basic" 
                label="Servidor" 
                variant="outlined" 
                fullWidth
                value={nomeserv}
                onChange={(e)=> setNomeserv(e.target.value)}
                />
            </Grid>
            <Grid item xs={4}>
            <Button variant="contained" size="small" onClick={save}>
            Anunciar
            </Button>
            </Grid>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome do Item</TableCell>
                                    <TableCell align="left">Servidor</TableCell>
                                    <TableCell align="left">Nome do Tamer</TableCell>
                                    <TableCell align="left">Preço</TableCell>
                                    <TableCell align="left">Quantidade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {anuncios.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.endereco}</TableCell>
                                        <TableCell align="left">{row.descricao}</TableCell>
                                        <TableCell align="left">
                                            <Button onClick={() => deletar(row.id)} >Deletar</Button>

                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    )
}
