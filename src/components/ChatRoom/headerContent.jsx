import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import React from 'react';
 const { Title } = Typography;
const HeaderContent = () => {
    return(
        <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div> 
                <Title level={4}>Tên phòng </Title>
                <span>Mô tả</span>
            </div>
            <div>
                <Button type='text' icon={<UserAddOutlined/>}>Mời</Button>
                <Avatar.Group maxCount={2}>
                    <Tooltip title='A'><Avatar>A</Avatar></Tooltip>
                    <Tooltip title='B'><Avatar>B</Avatar></Tooltip>
                    <Tooltip title='C'><Avatar>C</Avatar></Tooltip>
                </Avatar.Group>
            </div>
        </div>
    )
}
export default HeaderContent;