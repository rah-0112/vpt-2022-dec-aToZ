import React, { useEffect, useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Card, CircularProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListView from '../components/List';
import { useParams } from 'react-router-dom';
import { getBookDetails } from "../utils";

const useStyles = makeStyles(() => ({
    load: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "5rem 0",
    },
    card: {
        margin: "5rem 3rem",
        border: "4px solid #dedede",
    },
    edit: {
        padding: "2rem 8rem"
    },
    list: {
        padding: "1rem 8rem",
    },
    item: {
        backgroundColor: "#f00",

    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        padding: "2rem",
        marginTop: "2rem",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        margin: " 0 2rem",
        flex: 0.5,
        alignItems: "center",
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 1,
    },
    box: {
        // backgroundColor: "#f00",
        flex: 0.3,
    },
    butcol: {
        background: 'green',
    },
    butdis: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: "center",
        // backgroundColor: "black",
        margin: "2rem 0",
    },
    head: {
        fontStyle: 'Montserrat',
    },
    caption: {
        fontStyle: 'italic',
    },
}));


export default function BookPage() {
    const { id } = useParams();
    const classes = useStyles();

    const [ book, setBook ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const fetchBooks = async () => {
        setLoading(true);
        // const { data } = await axios.get("http://openlibrary.org/search.json?q=the+lord+of+the+rings");
        // setBooks(data)
        setBook(await getBookDetails(id));
        setLoading(false);
    }
    useEffect(() => {
        fetchBooks();
    }, []);

    return (

        <Card elevation="10" className={classes.card} >
            {loading ? (
                <Container className={classes.load}>
                    <CircularProgress
                        style={{ color: "black" }}
                        size={150}
                        thickness={1}
                    />
                </Container>
            ) : (<>
                <Container className={classes.root}>
                    <div className={classes.box}>
                        <CardMedia
                            component="img"
                            alt="book"
                            height="250"
                            image={book.cover}
                        // title="Contemplative Reptile"
                        />
                    </div>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <div className={classes.title}>
                                <Typography variant="subtitle2" color="textSecondary" className={classes.caption}>
                                    An edition of {book.title}
                                </Typography>
                                <Typography component="h3" variant="h3" className={classes.head}>
                                    {book.title}
                                </Typography>
                                <Typography variant="subtitle2" className={classes.caption} color="textSecondary">
                                    {book.description?.value}
                                </Typography>
                                <Typography variant="h6">
                                    by {book.title}
                                </Typography>
                                <Typography>
                                    First published on {book.firstPublishDate}
                                </Typography>
                                <Rating name="size-large" defaultValue={2} size="small" read-only />
                            </div>
                        </CardContent>
                    </div>
                </Container>
                <Container>
                    <Typography variant=
                        "h4" className={classes.edit}>
                        Editions
                    </Typography>
                </Container>
                <Container>
                    <ListView books={book.editions} editBook={book.olid} />
                </Container></>)}
        </Card >)

}
