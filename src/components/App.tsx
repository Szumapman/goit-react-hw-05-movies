import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './App.css'
import { SharedLayout } from './SharedLayout'
const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('./Cast'));
const Review = lazy(() => import('./Reviews'));

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path='movies' element={<Movies />} />
          <Route path="movies/:movieId" element={<MovieDetails />} >
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Review />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

