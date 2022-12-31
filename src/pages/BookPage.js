import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Card, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import ListView from '../components/List';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(() => ({
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
    console.log(id);
    return (
        <Card elevation="10" className={classes.card}>
            <Container className={classes.root}>
                <div className={classes.box}>
                    <CardMedia
                        component="img"
                        alt="book"
                        height="250"
                        image="data:image/jpeg;base64,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"
                    // title="Contemplative Reptile"
                    />
                </div>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <div className={classes.title}>
                            <Typography variant="subtitle2" color="textSecondary" className={classes.caption}>
                                An edition of Lord Jim
                            </Typography>
                            <Typography component="h3" variant="h3" className={classes.head}>
                                Lord Jim
                            </Typography>
                            <Typography variant="subtitle2" className={classes.caption} color="textSecondary">
                                a tale.
                            </Typography>
                            <Typography variant="h6">
                                by Joseph Conrad
                            </Typography>
                            <Typography>
                                1990
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
                {/* <ListView /> */}
            </Container>
        </Card>

    );
}
