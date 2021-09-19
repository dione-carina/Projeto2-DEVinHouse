import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, FormLabel, Input, Grid } from '@material-ui/core';
import Swal from 'sweetalert2'
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import NovaMensagem from './NovaMensagem';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MensagensStyle from './MensagensStyles.js';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Mensagens() {
  const classes = MensagensStyle();
  let [messages, setMensagens] = useState([])
  let [filtroGatilho, setFiltroGatilho] = useState([])
  let [filtroCanal, setFiltroCanal] = useState([])
  let [filtroTempo, setFiltroTempo] = useState([])
  const [canais, setCanais] = useState([])

  useEffect(() => {
    CarregarMensagens();
    CarregarGatilhos();
    CarregarCanais();
  }, [])

  async function CarregarMensagens() {
    await fetch('/api/mensagens')
      .then(res => res.json())
      .then(json => setMensagens(json.messages))
      .catch(err => console.log(err))
  }

  function CarregarCanais() {
    fetch('/api/canais')
      .then(res => res.json())
      .then(json => setCanais(json.channels))
      .catch(err => console.log(err))
  }

  function ExibirMensagem(id) {
    const mensagem = messages.find(m => m.id === id)
    if (!mensagem) return
    Swal.fire(
      'Mensagem',
      mensagem.mensagem
    )
  }

  async function PesquisarMensagens() {
    await CarregarMensagens();
    if (filtroGatilho !== '' && filtroGatilho.length > 0)
      setMensagens(messages.filter(m => m.gatilho === filtroGatilho))

    if (filtroCanal !== '' && filtroCanal.length > 0)
      setMensagens(messages.filter(m => m.canal === filtroCanal))

    if (filtroTempo !== '' && filtroTempo.length > 0)
      setMensagens(messages.filter(m => m.tempo === filtroTempo))
  }

  function ExcluirMensagem(id) {
    Swal.fire({
      title: 'Confirmação de Exclusão',
      text: "Você tem certeza que quer excluir esta mensagem?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/mensagens/${id}`, { method: 'DELETE' })
          .then(function () {
            Swal.fire(
              'Excluída!',
              'Mensagem excluída com sucesso.',
              'success'
            )
            setMensagens(messages.filter(m => m.id !== id))
          })
          .catch(err => console.log(err))
      }
    })
  }

  const [gatilhos, setGatilhos] = useState([])

  function CarregarGatilhos() {
    fetch('/api/gatilhos')
      .then(res => res.json())
      .then(json => setGatilhos(json.triggers))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Typography className={classes.titulo} variant="h4" component="h2">
        Mensagens
      </Typography>
      <Grid className={classes.grid} container justifyContent="flex-end">
        <Button onClick={() => PesquisarMensagens()} startIcon={<SearchIcon />} size="small" className={classes.botoesSuperior} color="secondary" variant="contained">
          <span className={classes.textoBotao} >Pesquisar</span>
        </Button>
        <NovaMensagem CarregarMensagens={CarregarMensagens} gatilhos={gatilhos} canais={canais} />
      </Grid>
      <Grid container justifyContent="flex-start">

        <FormLabel className={classes.filtro}>
          Gatilho:<br />
          <Select
            labelId="gatilho-label"
            id="gatilho"
            name="gatilho"
            onChange={e => setFiltroGatilho(e.target.value)}
            value={filtroGatilho}>
            <MenuItem value="">
              <em>&nbsp;</em>
            </MenuItem>
            {gatilhos.map(({ name }) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>

        </FormLabel>
        <FormLabel className={classes.filtro}>
          Canal:<br />
          <Select
            labelId="gatilho-label"
            id="canal"
            name="canal"
            onChange={e => setFiltroCanal(e.target.value)}
            value={filtroCanal}>
            <MenuItem value="">
              <em>&nbsp;</em>
            </MenuItem>
            {canais.map(({ name }) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormLabel>
        <FormLabel className={classes.filtro}>
          Timer:<br />
          <Input onChange={e => setFiltroTempo(e.target.value)} type="time" name="tempo" />
        </FormLabel>
      </Grid>
      <TableContainer className={classes.table} component={Paper}>
        <Table aria-label="mensagens">
          <TableHead>
            <TableRow>
              <StyledTableCell>Gatilho</StyledTableCell>
              <StyledTableCell align="left">Canal</StyledTableCell>
              <StyledTableCell align="center">Timer</StyledTableCell>
              <StyledTableCell align="center">Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map(({ id, gatilho, canal, tempo }) => (
              <StyledTableRow key={id}>
                <StyledTableCell>{gatilho}</StyledTableCell>
                <StyledTableCell align="left">{canal}</StyledTableCell>
                <StyledTableCell align="center">{tempo}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button title="Ver mensagem" size="small" startIcon={<MessageIcon />} className={classes.botoesGrid} onClick={() => ExibirMensagem(id)} color="primary" variant="outlined">
                    <span className={classes.textoBotao}>Ver Mensagem</span>
                  </Button>
                  <Button title="Excluir" size="small" startIcon={<DeleteIcon />} className={classes.botoesGrid} onClick={() => ExcluirMensagem(id)} color="secondary" variant="outlined">
                    <span className={classes.textoBotao}>Excluir</span>
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}

export default Mensagens;
