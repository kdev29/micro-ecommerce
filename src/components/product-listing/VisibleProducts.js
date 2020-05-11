import React from 'react'
import { Grid, Card, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
      width: 150,
      margin: '10px 10px',
      padding: '10px 0',
      display: 'inline-block',
      cursor: 'pointer'
    },
    container: {
      textAlign: 'center',
      
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    finalPrice: {
      color: 'green'
    }
  });

export default function VisibleProducts({products, onAddToCart}) {

    

    const classes = useStyles();
    return (
        <>
        <Grid container justify="center">

        {products.map(i => (
              
              <Card className={classes.root}>
                <img style={{maxWidth: '90%'}} src={i.src} />
                <Typography>{i.name}</Typography>
                <Typography>{i.brand}</Typography>
                <Typography>{i.genre}</Typography>
                <Typography className={classes.finalPrice}>Final price: ${i.finalPrice.toFixed(2)}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  
                  startIcon={<SaveIcon />}
                  type='button'
                  onClick={() => onAddToCart(i)}
                >
                  Save
              </Button>
              </Card>
            ))}
        </Grid>
        </>
    )
}

VisibleProducts.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired
}
