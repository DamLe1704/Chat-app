import React from 'react';
import Sidebar from './sidebar';
import ChatWindow from './chatWindow';
import { Layout } from 'antd'
const ChatRoom = () => {
    return(
        <Layout style={{ height: "100vh" }}>
            <Sidebar/>
            <ChatWindow/>
        </Layout>
    )
}
export default ChatRoom;