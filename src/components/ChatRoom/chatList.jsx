import React from 'react';
import { List, Typography, Button } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

const ChatList = () => {
    const rooms = [
        { id: 1, name: "Phòng 1" },
        { id: 2, name: "Phòng 2" },
        { id: 3, name: "Phòng 3" },
    ];
    return(
        <div>
            <Title level={5}>Danh sách phòng</Title>
            <List dataSource={rooms} renderItem={(room) => (
                <List.Item style={{ cursor: "pointer", padding: "10px" }}>
                    <MessageOutlined style={{ marginRight: "10px" }} />
                    {room.name}
                </List.Item>
                )}
                />
            <Button type="dashed" block icon={<PlusOutlined />} style={{ marginTop: "10px" }}>
                Thêm phòng mới
            </Button>
        </div>
    )
}
export default ChatList;