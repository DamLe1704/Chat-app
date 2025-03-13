    import React from 'react';
    import { List, Typography, Button } from 'antd';
    import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
    import AddRoomModal from '../modals/addRoomModal';
import { RoomContext } from '../../context/AppProvider';

    const { Title } = Typography;

    const ChatList = () => { 
        const [open, setOpen] = React.useState(false);
        const { rooms, setSelectedRoom } = React.useContext(RoomContext);
        const handleOpen = () => setOpen(true);
        const handleCancel = () => setOpen(false);

        return (
            <div>
                <Title level={5}>Danh sách phòng</Title>
                <List 
                    dataSource={rooms} 
                    renderItem={(room) => (
                        <List.Item 
                            style={{ cursor: "pointer", padding: "10px" }} 
                            onClick={() => setSelectedRoom(room)}
                        >
                            <MessageOutlined style={{ marginRight: "10px" }} />
                            {room.name}
                        </List.Item>
                    )}
                />
                <Button type="dashed" block icon={<PlusOutlined />} onClick={handleOpen} style={{ marginTop: "10px" }}>
                    Thêm phòng mới
                </Button>
                <AddRoomModal open={open} handleCancel={handleCancel} />
            </div>
        );
    };
    export default ChatList;
