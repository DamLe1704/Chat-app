import React from 'react';
import {Input, Button, Typography, Avatar} from 'antd'

const { Text } = Typography;

const Message = ({text, displayName, createdAt, photoURL}) => {
    return(
        <>
            <div style={{ height: "400px", overflowY: "auto", padding: "10px", border: "1px solid #ddd", display: 'flex', flexDirection: 'column', justifyContent:'flex-end' }}>
                <div style={{ marginBottom: "10px" }}>
                    <Avatar src={photoURL}>A</Avatar>
                    <Text style={{marginLeft:'6px'}} strong>{displayName}</Text>
                    <Text style={{marginLeft:'10px'}}>{createdAt}</Text>
                </div>
                <div style={{ marginLeft: "30px" }}>
                    <Text>{text}</Text>
                </div>
            </div>

            <div style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                <Input  placeholder="Nhập tin nhắn..." />
                <Button style={{marginLeft:'10px'}} type="primary">
                Gửi
                </Button>
            </div>
        </>
    )
}
export default Message;