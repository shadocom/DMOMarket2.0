import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, {useState , useLayoutEffect} from 'react';
import {storageSave,storageGet,storageRemove} from "../services/Storage"
import {login, sigin} from "../services/Firebase"
import {useHistory} from "react-router-dom"
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import RoomIcon from '@mui/icons-material/Room';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getAnuncio } from '../services/Firebase';

const AnyReactComponent = ({ text }) =>
  <div>
    <RoomIcon fontSize="large" color="error" />
    <span style={{ backgroundColor: "white", fontSize: 18, fontWeight: "bold" }}>{text}</span>
  </div>;

function Login() {
  let history = useHistory();
  const [lembreme, setLembreme] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [anuncios, setAnuncios] = useState([])
  const [msg, setMsg] = useState("")
  const [open, setOpen] = React.useState(false);
  const [errorStatus, setErrorStatus] = useState(true)

  useLayoutEffect(() => {
    let emailStorage = storageGet("email")
    let passwordStorage = storageGet("password")
    pegarAnuncios()
    if(emailStorage){
      setEmail(emailStorage)
      setPassword(passwordStorage)
      setLembreme(true)
    }
  }, [])

  
  const handleLembreme = (e)=>{
    setLembreme(e.target.checked)

    if(e.target.checked === true){
      storageSave("email",email)
      storageSave("password",password)
    }else{
      storageRemove("email")
      storageRemove("password")
    }
  }

  const efetuarLogin= async()=>{

    login(email,password)
    .then(retorno=>history.push("/home"))
    .catch(error => {
      setMsg(error)
      setOpen(true)
      setErrorStatus(true)
    })


  }

  const novoRegistro = async () => {

    sigin(email, password)
      .then((retorno) => {
        setMsg(retorno)
        setErrorStatus(false)
        setOpen(true)
      })
      .catch(error => {
        setMsg(error)
        setOpen(true)
        setErrorStatus(true)

      })
  }

  const pegarAnuncios = async () => {
    let dados = await getAnuncio()
    setAnuncios(dados)
}



  return (
    <Grid container spacing={2}>
      <Grid item xs={3}></Grid>
      <Grid item xs={4}>
      <Collapse in={open}>
          <Alert
            severity={errorStatus ? "error" : "success"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {msg}
          </Alert>
        </Collapse>
      </Grid>
      <Grid item xs={4}></Grid>
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
          type="password" 
          id="outlined-basic" 
          label="Password" 
          variant="outlined" 
          fullWidth
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <FormGroup>
            <FormControlLabel control={
              <Checkbox 
                checked={lembreme} 
                onChange={handleLembreme}/>} 
                label="Lembre-me" 
            />
          </FormGroup> 
          <Button variant="contained" size="small" onClick={efetuarLogin}>
            Login
          </Button>
          <span> </span>
        <Button variant="contained" size="small" onClick={novoRegistro}>
          Novo Registro
        </Button>
        </Grid>
        <Grid item xs={3}></Grid>
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
                                        <TableCell align="left">{row.preco}</TableCell>
                                        <TableCell align="left">{row.quantia}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
        
        
        

      </Grid>
  );
}

export default Login;
