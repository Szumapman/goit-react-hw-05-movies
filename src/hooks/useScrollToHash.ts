import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToHash = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const element = document.getElementById(location.hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: "instant" });
                }
            }, 500);
        }
    }, [location.hash]);
};

export default useScrollToHash;
