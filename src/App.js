import { Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import BookPage from './pages/BookPage';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: "white",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.App}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/books/:id' element={<BookPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
