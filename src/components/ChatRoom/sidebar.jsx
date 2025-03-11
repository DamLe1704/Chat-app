import React from "react";
import { Layout } from "antd";
import UserInfo from "./userInfo";
import ChatList from "./chatList";

const { Sider} = Layout;

const Sidebar = () => {
    return(
        <Sider width={400} style={{ background: "#f0f2f5", padding: "16px" }}>
            <UserInfo/>
            <ChatList/>
        </Sider>    
    )
}
export default Sidebar;