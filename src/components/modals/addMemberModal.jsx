import React, { useState, useContext } from "react";
import { Modal, Input, Button, AutoComplete, Avatar } from "antd";
import { RoomContext } from "../../context/AppProvider";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase/config'
const AddMemberModal = ({ open, handleCancel }) => {
    const { allUsers, selectedRoom, setSelectedRoom } = useContext(RoomContext);
    const [selectedUser, setSelectedUser] = useState("");
    const roomRef = doc(db, "rooms", selectedRoom.id);

    const handleCancelModal = () => {
        handleCancel();
        setSelectedUser("");
    };

    const handleChange = (value) => {
        setSelectedUser(value); 
    };

    const handleSelect = (value, option) => {
        setSelectedUser({
            id: value,
            label: option.label.props.children[1], 
            photoURL: allUsers.find((user) => user.id === value)?.photoURL || "",
        });
    };

    const handleAddMembers = async () => {
        if (selectedUser) {  
            await updateDoc(roomRef, {
                members: arrayUnion(selectedUser.id)
            });
            setSelectedRoom(prev => ({
                ...prev,
                members: [...prev.members, selectedUser.id]
            }));
    
            handleCancel();
            setSelectedUser(""); 
        }
    }

    return (
        <Modal
            title="Mời thành viên"
            open={open}
            onCancel={handleCancelModal}
            footer={[
                <Button key="cancel" onClick={handleCancelModal}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleAddMembers}>
                    Mời
                </Button>,
            ]}
        >
            <AutoComplete
                options={allUsers.map((user) => ({
                    value: user.id,
                    label: (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={user.photoURL} size="small" style={{ marginRight: 8 }} />
                            {user.displayName}
                        </div>
                    ),
                }))}
                style={{ width: "100%" }}
                filterOption={(input, option) =>
                    allUsers.find((user) => user.id === option.value)?.displayName.toLowerCase().includes(input.toLowerCase())
                }
                value={selectedUser.label || ""}
                placeholder='Tìm kiếm thành viên theo tên...' 
                onSelect={handleSelect}
                onChange={handleChange}
            />
        </Modal>
    );
};

export default AddMemberModal;
