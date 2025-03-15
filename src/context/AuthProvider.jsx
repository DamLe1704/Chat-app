import React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from 'antd';
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                navigate("/"); 
            } else {
                navigate("/login"); 
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
