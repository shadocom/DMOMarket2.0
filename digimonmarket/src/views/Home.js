import React, {useState, useLayoutEffect} from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { deleteAnuncio, getAnuncio } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Home() {

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
    

    return (
        <div>
            <h1>Itens à Venda:</h1>
            <Grid container spacing={1}>
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
                                        <TableCell align="left">{row.nomeitem}</TableCell>
                                        <TableCell align="left">{row.nomeserv}</TableCell>
                                        <TableCell align="left">{row.nometamer}</TableCell>
                                        <TableCell align="left">{row.nomepreco}</TableCell>
                                        <TableCell align="left">{row.nomequantia}</TableCell>
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
