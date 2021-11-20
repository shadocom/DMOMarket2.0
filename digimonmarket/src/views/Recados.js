import React, {useState , useLayoutEffect} from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Footer from "../components/Footer"
import Menu from '../components/Menu';
import { saveRecado, getRecado } from '../services/Firebase';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function Recados() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [assunto, setAssunto] = useState("")
    const [msg, setMsg] = useState("")
    const [recados, setRecados] = useState([])

    useLayoutEffect(() => {
      pegarRecados()
      
  }, [])

  const pegarRecados = async () => {
      let dados = await getRecado()
      setRecados(dados)
  }

    const save=()=>{
      let objeto={
          nome: nome,
          email: email,
          assunto: assunto,
          mensagem: msg
          
      }
      try {
          saveRecado(objeto)
          console.log("dados salvos")
      } catch (error) {
          console.log(error)
      }
      
  }


    return (
      <div><Menu/><br/>
        <Grid container spacing={1}>
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
            <Button variant="contained" size="small" onClick = {save} >
                Enviar aos Devs
            </Button>
        </Grid>
        <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Nome</TableCell>
                                    <TableCell align="left">E-mail</TableCell>
                                    <TableCell align="left">Assunto</TableCell>
                                    <TableCell align="left">Mensagem</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {recados.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.nome}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.assunto}</TableCell>
                                        <TableCell align="left">{row.mensagem}</TableCell>
                                        <TableCell align="left">{row.quantia}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        <Grid><Footer/></Grid>
        </Grid>
        </div>
    )
}
