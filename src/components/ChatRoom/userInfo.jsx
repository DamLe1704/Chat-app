import React, { useContext } from 'react';
import { Avatar, Button, Typography } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthProvider';
import { auth } from '../../firebase/config';

const { Title } = Typography;

const UserInfo = () => {
    const { user } = useContext(AuthContext);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <div style={{
            textAlign: "center",
            marginBottom: "20px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar size={64} src={user?.photoURL || ""} />
                <Title level={4} style={{ marginLeft: "10px" }}>{user?.displayName || "Người dùng"}</Title>
            </div>
            <Button ghost type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
                Đăng xuất
            </Button>
        </div>
    );
};

export default UserInfo;
