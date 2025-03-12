import React from 'react';
import { List, Typography, Button } from 'antd';
import { MessageOutlined, PlusOutlined } from '@ant-design/icons';
import useFireStore from '../../hooks/useFireStore';
import { AuthContext } from '../../context/AuthProvider';
const { Title } = Typography;

const ChatList = () => {

    const { user } = React.useContext(AuthContext);
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
            <Button type="dashed" block icon={<PlusOutlined />} style={{ marginTop: "10px" }}>
                Thêm phòng mới
            </Button>
        </div>
    )
}
export default ChatList;