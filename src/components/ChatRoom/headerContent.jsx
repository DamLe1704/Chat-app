import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import React from 'react';
 const { Title } = Typography;
const HeaderContent = ({ room }) => {
    console.log(room)
    return(
        <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div> 
                <Title level={4}>{room?.name}</Title>
                <span>{room?.description}</span>
            </div>
            <div>
                <Button type='text' icon={<UserAddOutlined/>}>Mời</Button>
                <Avatar.Group maxCount={2}>
                    {room?.members?.map((member, index) => (
                        <Tooltip title={member.name} key={index}>
                            <Avatar>{member[0].toUpperCase()}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
            </div>
        </div>
    )
}
export default HeaderContent;