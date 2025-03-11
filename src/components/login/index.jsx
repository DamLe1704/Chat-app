import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { auth, facebookProvider } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
const { Title } = Typography;

const Login = () => {
  const handleFacebookLogin = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        console.log("Đăng nhập thành công:", result.user);
      } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
      }
  };

  return (
    <Row className="h-screen flex items-center justify-center bg-gray-100">
      <Col span={8}>
        <Title style={{textAlign:'center'}}>
            Đăng nhập
        </Title>
        <Button type="primary" style={{marginBottom:'10px', width:'100%'}}>
            Đăng nhập bằng Google
        </Button>
        <Button
            type="default"
            style={{ width:'100%'}}
            onClick={handleFacebookLogin} 
        >
            Đăng nhập bằng Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
