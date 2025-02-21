// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PageNotFound = () => {
    const [counter, setCounter] = useState(5);
    // const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter === 1) {
                    clearInterval(interval);
                    // navigate("/");
                }
                return prevCounter - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <>
            <p>404 Page not found</p>
            <p>Redirecting to main page in {counter} {counter === 1 ? "second" : "seconds..."}</p>
        </>
    )
};

export default PageNotFound