import React, { useEffect, useState, useContext, useRef } from 'react';
import { Input, Button, Typography, Avatar, Form } from 'antd';
import { RoomContext } from '../../context/AppProvider';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase/config';
import { AuthContext } from '../../context/AuthProvider';
import useFireStore from '../../hooks/useFireStore';

const { Text } = Typography;

const MessageList = () => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]); 
    const { user } = useContext(AuthContext);
    const { selectedRoom } = useContext(RoomContext);
    const messagesEndRef = useRef(null);

    const condition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoom.id
    }), [selectedRoom.id])

    const fetchedMessages = useFireStore('messages', condition);
    useEffect(() => {
        setMessages(fetchedMessages);
    }, [selectedRoom, fetchedMessages]); 

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await addDoc(collection(db, "messages"), {
                text: newMessage,
                roomId: selectedRoom.id,
                displayName: user?.displayName || "Ẩn danh",
                photoURL: user?.photoURL || "",
                createdAt: serverTimestamp(),
            });
            setNewMessage("");
        } catch (error) {
            console.error("Lỗi khi gửi tin nhắn:", error);
        }
    };

    return (
        <>
            <div style={{ height: "400px", overflowY: "auto", padding: "10px", border: "1px solid #ddd", display: 'flex', flexDirection: 'column' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={msg.photoURL || undefined}>{msg.displayName?.charAt(0)}</Avatar>
                            <Text strong style={{ marginLeft: "6px" }}>{msg.displayName}</Text>
                            <Text style={{ marginLeft: "10px", fontSize: "12px", color: "gray" }}>
                                {msg.createdAt?.seconds ? new Date(msg.createdAt.seconds * 1000).toLocaleTimeString("vi-VN") : ""}
                            </Text>
                        </div>
                        <div style={{ marginLeft: "40px", padding: "5px 10px", background: "#f1f1f1", borderRadius: "8px", display: "inline-block" }}>
                            <Text>{msg.text}</Text>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <Form style={{ marginTop: "10px", display: 'flex', justifyContent: 'space-between' }}>
                <Form.Item style={{ flex: 1, marginBottom: 0 }}>
                    <Input 
                        placeholder="Nhập tin nhắn..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onPressEnter={sendMessage} 
                    />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0, marginLeft: '10px' }}>
                    <Button type="primary" onClick={sendMessage}>Gửi</Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default MessageList;
