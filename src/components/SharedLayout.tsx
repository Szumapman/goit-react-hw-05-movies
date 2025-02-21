import { Outlet, NavLink } from "react-router-dom";
import { Suspense } from "react";
import css from './SharedLayout.module.css'
import BASE_PATH from "../constants/BASE_PATH";

export const SharedLayout = () => {
    return (
        <>
            <header className={css.topbar}>
                <nav>
                    <ul className={css.navigation}>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/movies">Movies</NavLink></li>
                    </ul>
                </nav>
            </header>
            <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Outlet />
                </Suspense>
            </main>
        </>    
    );
}