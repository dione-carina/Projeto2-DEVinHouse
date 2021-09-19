import React, { useState } from 'react';
import * as yup from "yup";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, LinearProgress, makeStyles, Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Swal from 'sweetalert2'

const mensagemSchema = yup.object({
  mensagem: yup.string().required('Campo Mensagem obrigatório'),
  tempo: yup.string().required('Campo Tempo obrigatório'),
  canal: yup.string().required('Campo Canal obrigatório'),
  gatilho: yup.string().required('Campo Gatilho obrigatório'),
});

function NovaMensagem(props) {
  const { CarregarMensagens, gatilhos, canais } = props
  const [open, setOpen] = React.useState(false);
  const [erros, setErros] = useState([])
  const [isSubmitting, setisSubmitting] = useState(false)
  const [state, setState] = React.useState({
    canal: "",
    gatilho: "",
    tempo: "",
    mensagem: "",
    erros: ""
  })
  const initialState = {
    canal: "",
    gatilho: "",
    tempo: "",
    mensagem: "",
    erros: "",
    isSubmitting: false
  }
  const resetForm = () => {
    setState({ ...initialState });
    setisSubmitting(false);
    setErros('');
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }
  const handleClickOpen = () => {
    resetForm();
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  function criarMensagem(event) {
    setisSubmitting(true);
    event.preventDefault();
    let novaMensagem = {
      mensagem: event.target.mensagem.value,
      gatilho: event.target.gatilho.value,
      tempo: event.target.tempo.value,
      canal: event.target.canal.value,
    }
    mensagemSchema.validate(novaMensagem)
      .then(function (value) {
        setTimeout(() => {
          fetch('/api/mensagens', { method: 'POST', body: JSON.stringify(value, null, 2) })
            .then(function () {
              resetForm();
              CarregarMensagens();
              Swal.fire(
                'Sucesso!',
                'Mensagem cadastrada com sucesso.',
                'success'
              )
              handleClose()
            })
            .catch(err => console.log(err))
        }, 500);
      })
      .catch(function (err) {
        setErros(err.errors);
        setisSubmitting(false);
      });
  }

  const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      display: 'flex',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '30rem',
    },
    field: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2)
    },
    submitButton: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(4)
    },
    mensagemErro: {
      color: 'red',
      fontSize: '12px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(2)

    },
  }));
  const classes = useStyles();
  return (
    <>

      <Button className={classes.botoesSuperior} onClick={handleClickOpen} startIcon={<AddIcon />} size="small" color="secondary" variant="contained">
        <span className={classes.textoBotao}>Nova mensagem</span>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nova Mensagem</DialogTitle>
        <form id="novaMensagem-Form" onSubmit={criarMensagem}>
          <DialogContent>

            <DialogContentText>
              Para cadastrar uma nova mensagem informe os campos abaixo
            </DialogContentText>

            <FormControl className={classes.formControl}>
              <InputLabel id="gatilho-label">Gatilho*</InputLabel>
              <Select
                labelId="gatilho-label"
                id="gatilho"
                name="gatilho"
                onChange={handleChange}
                value={state.gatilho}>
                {gatilhos.map(({ name }) => (
                  <MenuItem key={"gatilho_" && name} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="canal-label">Canal*</InputLabel>
              <Select
                labelId="canal-label"
                id="canal"
                value={state.canal}
                name="canal"
                onChange={handleChange}>
                {canais.map(({ name }) => (
                  <MenuItem key={"canal_" && name} id="canal-menu-item" value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="tempo-label">Timer*</InputLabel>
              <Input type="time" name="tempo" />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="mensagem-label">Mensagem*</InputLabel>
              <Input type="text" rows="5" multiline name="mensagem" />
            </FormControl>

          </DialogContent>
          <DialogActions>
            <p><span className={classes.mensagemErro}>{erros}</span></p>
            <Button
              color="primary"
              type="submit"
              variant="contained">
              Salvar
            </Button>
            <Button
              color="primary"
              onClick={handleClose}
              variant="contained">
              Cancelar
            </Button>
          </DialogActions>
          {isSubmitting && <LinearProgress color="secondary" />}
        </form>
      </Dialog>
    </>
  )
}

export default NovaMensagem;
