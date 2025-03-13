import React from "react";
import { Layout, Typography } from "antd";
import HeaderContent from "./headerContent";
import Message from "./message";
import { RoomContext } from "../../context/AppProvider";
const { Content } = Layout;
const { Title } = Typography;
const ChatWindow = () => {
    const { selectedRoom } = React.useContext(RoomContext);
    
    if (!selectedRoom) {
        return (
            <Layout>
                <Content style={{ padding: "20px", background: "#fff", textAlign: "center" }}>
                    <Title level={4}>Chọn một phòng để bắt đầu trò chuyện</Title>
                </Content>
            </Layout>
        );
    }
    return(
        <Layout>
            <Content style={{ padding: "20px", background: "#fff" }}>
                <HeaderContent room={selectedRoom} />
                <Message text={'A'} displayName={'Đảm'} createdAt={22211} photoURL={null} />
            </Content>
        </Layout>
    )
}
export default ChatWindow;