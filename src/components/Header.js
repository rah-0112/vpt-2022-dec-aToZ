import {
    AppBar, Button, Container, createTheme, makeStyles,
    MenuItem, Select, ThemeProvider, Toolbar, Typography
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';



const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    },
    link: {
        color: "black"
    },
    lin: {
        textDecoration: "none",
        color: "black",
        flex: 1,
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }
}))

const Header = () => {

    const classes = useStyles();

    return (
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Link to="/" className={classes.lin}>

                        <Typography className={classes.title}

                            variant='h6'
                        >Book Hunter</Typography>
                    </Link>

                    <Button href="https://openlibrary.org/" className={classes.link} variant="outlined">
                        Open Library
                    </Button>


                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
