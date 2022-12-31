import {
    Button,
    CircularProgress,
    Container,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import ListView from "../components/List";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@material-ui/lab";
import "../utils"
import { getBooksFromQuery, getTrendingWorks } from "../utils";

const useStyles = makeStyles(() => ({
    entries: {
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        color: "gray",

    },
    bannerContent: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 8rem",
        justifyContent: "space-around",
        width: "100%",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    textField: {
        fontWeight: "bold",
        fontFamily: "Montserrat",
        height: "100%",
        width: "100%"
    },
    select: {
        width: "15%",
        height: "60%"
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "1.5rem",
    },
    load: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "5rem 0",
    }
}));

const map = {
    "All": 'q',
    "Author": 'author',
    "Title": 'title',
}


const HomePage = () => {
    const classes = useStyles();

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            console.log('Input value', e.target.value);
            // setsearch(e.target.value)
            fetchBooks();
            e.preventDefault();
        }
        setpage(1);
    }
    const [ select, setSelect ] = useState("All");
    const [ page, setpage ] = useState(1);
    const [ search, setsearch ] = useState("");
    const [ books, setBooks ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    console.log(books[ 0 ]);
    const fetchBooks = async () => {
        setLoading(true);
        // const { data } = await axios.get("http://openlibrary.org/search.json?q=the+lord+of+the+rings");
        // setBooks(data);
        console.log("select :: ", map[ select ]);
        setBooks(await getBooksFromQuery([ search ], [ map[ select ] ]));
        setLoading(false);
    }

    const fetchTrendingBooks = async () => {
        setLoading(true);
        // const { data } = await axios.get("http://openlibrary.org/search.json?q=the+lord+of+the+rings");
        // setBooks(data);
        setBooks(await getTrendingWorks());
        setLoading(false);
    }

    const [ searchParam ] = useState([ "title", "author" ]);
    // const handleSearch = () => {
    //     console.log(books);
    //     return books.filter((item) => {

    //         if (select === "All") {
    //             return searchParam.some((newItem) => {
    //                 return (
    //                     item[ newItem ]
    //                         .toString()
    //                         .toLowerCase()
    //                         .indexOf(search.toLowerCase()) > -1
    //                 );
    //             });
    //         } else {
    //             return (
    //                 item[ select ]
    //                     .toString()
    //                     .toLowerCase()
    //                     .indexOf(search.toLowerCase()) > -1
    //             );
    //         }
    //     });
    // }

    // useEffect(() => {
    //     fetchTrendingBooks();
    // }, []);

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Book Hunter
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the Info regarding your favorite international
                        Book
                    </Typography>
                    <Container className={classes.row}>

                        <Select variant='outlined'
                            value={select}
                            onChange={(e) => setSelect(e.target.value)}
                            className={classes.select}
                        >
                            <MenuItem value="All">All</MenuItem>
                            <MenuItem value="Title">Title</MenuItem>
                            <MenuItem value="Author">Author</MenuItem>
                        </Select>
                        <TextField
                            autoFocus={true}
                            id="outlined-basic"
                            label="Search for books"
                            variant="outlined"
                            onKeyPress={onKeyPress}
                            onChange={(e) => setsearch(e.target.value)}
                            className={classes.textField}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton onClick={() => fetchBooks()}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Container>
                </div>
            </Container>
            {
                loading ? (<Container className={classes.load}>
                    <CircularProgress
                        style={{ color: "black" }}
                        size={150}
                        thickness={1}
                    />
                </Container>) : (<>
                    <Container className={classes.entries}>
                        Showing entries {(page - 1) * 10} - {(page - 1) * 10 + 10} of {books.length}
                    </Container>
                    <ListView books={books
                        .slice((page - 1) * 10, (page - 1) * 10 + 10)} />
                </>)
            }
            <Pagination
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
                classes={{ ul: classes.pagination }}
                count={Number((books.length / 10).toFixed(0)) || 0}
                onChange={(_, value) => {
                    setpage(value);
                    window.scroll(0, 220);
                }}
            />
        </div>
    );
};

export default HomePage;
