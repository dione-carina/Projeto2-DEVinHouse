import React, { useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import * as yup from "yup";
import { Button, LinearProgress, makeStyles } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import Swal from 'sweetalert2'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
/// Tentativa de fazer com formik
const MensagemFormDialog = (props) => {
    const { CarregarMensagens } = props
    const [open, setOpen] = React.useState(false);
    const [gatilho, setGatilho] = React.useState('');
    const [canal, setCanal] = React.useState('');
    const [gatilhos, setGatilhos] = useState([])
    const [canais, setCanais] = useState([])

    const handleChange = (event) => {
        setGatilho(event.target.value);
        setCanal(event.target.value);
    };
    // usando yup pra validar o formulário
    const schema = yup.object({
        gatilho: yup.string().required('Campo Gatilho obrigatório'),
        canal: yup.string().required('Campo Canal obrigatório'),
        tempo: yup.string().required('Campo Tempo obrigatório'),
        mensagem: yup.string().required('Campo Mensagem obrigatório')
    });

    const initialValues = {
        gatilho: "",
        canal: "",
        tempo: "",
        mensagem: ""
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        CarregarDados();
    }, [])

    async function CarregarDados() {
        await fetch('/api/gatilhos')
            .then(res => res.json())
            .then(json => setGatilhos(json.triggers))
            .catch(err => console.log(err))
        await fetch('/api/canais')
            .then(res => res.json())
            .then(json => setCanais(json.triggers))
            .catch(err => console.log(err))
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
    }));
    const classes = useStyles();

    return (
        <div>
            <Button onClick={handleClickOpen} startIcon={<AddIcon />} size="small" color="secondary" variant="contained">Nova mensagem</Button>
            <Formik
                initialValues={initialValues}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        setSubmitting(false);
                        fetch('/api/mensagens', { method: 'POST', body: JSON.stringify(values, null, 2) })
                            .then(function () {
                                resetForm();
                                CarregarMensagens()
                                Swal.fire(
                                    'Sucesso!',
                                    'Mensagem cadastrada com sucesso.',
                                    'success'
                                )
                                handleClose()
                            })
                            .catch(err => console.log(err))
                    }, 500);
                }}
                validationSchema={schema}
            >
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Nova Mensagem</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Para cadastrar uma nova mensagem informe os campos abaixo
                                </DialogContentText>


                                <div
                                    className="container"
                                    style={{
                                        width: "100%",
                                    }}
                                >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="gatilho-label">Gatilho</InputLabel>
                                        <Select
                                            labelId="gatilho-label"
                                            id="gatilho"
                                            value={gatilho}
                                            onChange={handleChange}
                                        >
                                            {gatilhos.map(({ name }) => (
                                                <MenuItem value={name}>{name}</MenuItem>
                                            ))}
                                        </Select>
                                        <InputLabel id="canal-label">Canal</InputLabel>
                                        <Select
                                            labelId="canal-label"
                                            id="canal"
                                            value={canal}
                                            onChange={handleChange}
                                        >
                                            {canais.map(({ name }) => (
                                                <MenuItem value={name}>{name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Field
                                        component={TextField}
                                        label="Tempo"
                                        name="tempo"
                                        type="time"
                                        variant="outlined"
                                        className={classes.field}
                                    />
                                    <div>
                                        <Field
                                            component={TextField}
                                            label="Mensagem"
                                            name="mensagem"
                                            multiline
                                            rows={8}
                                            style={{ width: '98%' }}
                                            variant="outlined"
                                            className={classes.field}
                                        />
                                    </div>

                                </div>


                            </DialogContent>
                            <DialogActions>
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={submitForm}
                                    variant="contained"
                                    className={classes.submitButton}
                                >
                                    Salvar
                                </Button>
                                <Button
                                    color="primary"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    variant="contained"
                                    className={classes.submitButton}
                                >
                                    Cancelar
                                </Button>
                                {isSubmitting && <LinearProgress color="secondary" />}
                            </DialogActions>
                        </Dialog>
                    </Form>
                )}
            </Formik>
        </div >
    )
}
export default MensagemFormDialog;