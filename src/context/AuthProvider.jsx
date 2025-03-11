import React from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from 'antd';

// Tạo Context cho Auth
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect(() => {
        // Lắng nghe trạng thái xác thực của Firebase
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                setUser({ displayName, email, uid, photoURL });
                navigate("/"); // Chuyển hướng đến trang chính nếu đăng nhập thành công
            } else {
                navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            }
            setIsLoading(false);
        });

        // Hủy đăng ký listener khi component unmount
        return () => unsubscribe();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
