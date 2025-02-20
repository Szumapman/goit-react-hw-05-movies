import { Outlet, NavLink } from "react-router-dom";
import css from './SharedLayout.module.css'

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
                <Outlet />
            </main>
        </>    
    );
}