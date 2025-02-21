import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import './App.css'
import { SharedLayout } from './SharedLayout'

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const CastDetails = lazy(() => import('./CastDetails'));
const Review = lazy(() => import('./Reviews'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

export const App = () => {
  return (
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path="/movies/:movieId" element={<MovieDetails />} >
            <Route path="cast" element={<CastDetails />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
  );
};

