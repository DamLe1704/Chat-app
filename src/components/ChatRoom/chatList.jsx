import React from 'react';
import { List, Typography, Button } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import useFireStore from '../../hooks/useFireStore';
import { AuthContext } from '../../context/AuthProvider';
import AddRoomModal from '../modals/addRoomModal';

const { Title } = Typography;

const ChatList = () => {
    const { user } = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleCancel = () => {
        setOpen(false);
    }
    const roomsConditon = React.useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareValue: user.uid
        }    
    }, [user.uid])

    const rooms = useFireStore('rooms', roomsConditon)
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
            <Button type="dashed" block icon={<PlusOutlined />} onClick={handleOpen} style={{ marginTop: "10px" }}>
                Thêm phòng mới
            </Button>
            <AddRoomModal open={open} handleCancel={handleCancel}/>
        </div>
    )
}
export default ChatList;