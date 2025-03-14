import React from "react";
import { Layout, Typography } from "antd";
import HeaderContent from "./headerContent";
import { RoomContext } from "../../context/AppProvider";
import MessageList from "./message";
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
                <MessageList />
            </Content>
        </Layout>
    )
}
export default ChatWindow;