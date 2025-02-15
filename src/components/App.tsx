import { Route, Routes } from 'react-router-dom'
import './App.css'
import { SharedLayout } from './SharedLayout'
import { Home } from '../pages/Home'
import { Movies } from '../pages/Movies';
import { MovieDetails } from '../pages/MovieDetails';

export const App = () => {
  return (
    <Routes>
      <Route path='/' element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path='movies' element={<Movies />} />
        <Route path="movies/:movieId" element={<MovieDetails />} />
      </Route>
    </Routes>
  );
};

