import React, { useState, useContext } from 'react';
import { Modal, Form, Input, Button, message } from "antd";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { AuthContext } from '../../context/AuthProvider';

const AddRoomModal = ({ open, handleCancel }) => {
    const [form] = Form.useForm();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleAddRoom = async () => {
        try {
            const values = await form.validateFields(); // Kiểm tra form hợp lệ trước khi gửi

            setLoading(true); // Bật trạng thái loading

            await addDoc(collection(db, "rooms"), {
                name: values.name,
                description: values.description || "",
                createdAt: new Date(),
                members: [user.uid] // Thêm người tạo phòng vào danh sách thành viên
            });

            message.success("Thêm phòng thành công!");
            form.resetFields();
            handleCancel();
        } catch (error) {
            console.error("Lỗi khi thêm phòng:", error);
            message.error("Không thể thêm phòng. Vui lòng thử lại!");
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    return (
        <Modal
            title="Thêm phòng mới"
            open={open}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel} disabled={loading}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleAddRoom} loading={loading}>
                    Thêm phòng
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Tên phòng"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên phòng!" }]}
                >
                    <Input placeholder="Nhập tên phòng" />
                </Form.Item>

                <Form.Item label="Mô tả phòng" name="description">
                    <Input.TextArea rows={3} placeholder="Nhập mô tả phòng" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRoomModal;
