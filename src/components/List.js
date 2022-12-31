import { makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, Container, Divider, Typography } from "@material-ui/core";
import ImageIcon from '@material-ui/icons/Image';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minWidth: 310,
    },
    list: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        width: '100%',
    },
    title: {
        fontWeight: "bold",
    },
    link: {
        textDecoration: "none",
        color: "black",
    }
}));

const ListView = ({ books }) => {
    const classes = useStyles();
    return (
        <Container className={classes.list}>
            <List className={classes.root}>
                {books.map(book => (
                    <>
                        <Link to={`books/${book.olid}`} className={classes.link}>
                            < ListItem button >
                                <ListItemAvatar>
                                    <Avatar src={book.cover} variant="square" style={{ height: '8rem', width: '7rem', marginTop: ".2rem", marginBottom: ".2rem", marginRight: "3rem" }}>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <>
                                        <Typography variant="h6" className={classes.title}>{book.title}</Typography>
                                    </>
                                } secondary={
                                    <>
                                        <Typography variant="subtitle1" style={{ color: "black" }}>by {book.author}</Typography>
                                        <Typography variant="subtitle2">First edition on {book.firstPublishYear}</Typography>
                                        <Typography variant="body2" style={{ color: "gray" }}>{book.editions} Editions in {book.langCount} Language</Typography>
                                    </>
                                } />
                            </ListItem>
                            <Divider component="li" />
                        </Link>
                    </>
                )
                )}

            </List>
        </Container >
    );
}

export default ListView;