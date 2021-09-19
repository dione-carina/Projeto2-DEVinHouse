import { makeStyles } from '@material-ui/core/styles';

const MensagensStyle = makeStyles((theme) => ({
  titulo:
  {
    marginLeft: 10,
    marginTop: 10,
  },
  grid:
  {
    width: '98%',
  },
  botoesSuperior: {
    marginRight: 10,
    [theme.breakpoints.down("sm")]: {
      minWidth: 60,
      paddingLeft: 4,
      paddingRight: 4,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  botoesGrid: {
    position: 'relative',
    marginLeft: 0,
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 60,
      paddingLeft: 4,
      paddingRight: 4,
      "& .MuiButton-startIcon": {
        margin: 0
      }
    }
  },
  chart: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '95%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    }
  },
  table: {
    marginTop: 75,
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },

  },
  textoBotao: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  filtro:
  {
    display: 'inline',
    float: 'left',
    marginLeft: '20px',
  },
}));





export default MensagensStyle;