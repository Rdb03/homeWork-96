import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.tsx';
import { Container } from '@mui/material';
import NoFound from './components/NoFound/NoFound.tsx';
import Login from './features/users/Login.tsx';
import Register from './features/users/Register.tsx';

const App = () => {
  return (
    <>
      <header>
        <Header/>
      </header>
      <main className="app-main">
        <Container maxWidth="xl" sx={{marginTop: '50px'}}>
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<NoFound/>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
};

export default App
