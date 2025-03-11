import React from "react";
import { Layout } from "antd";
import HeaderContent from "./headerContent";
import Message from "./message";
const { Content } = Layout;
const ChatWindow = () => {
    return(
        <Layout>
            <Content style={{ padding: "20px", background: "#fff" }}>
                <HeaderContent/>
                <Message text={'A'} displayName={'Đảm'} createdAt={22211} photoURL={null} />
            </Content>
        </Layout>
    )
}
export default ChatWindow;