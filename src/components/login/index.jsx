import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Typography, Button } from "antd";
import { auth, db, googleProvider, facebookProvider } from "../../firebase/config";
import { setDoc, doc } from "firebase/firestore";
import { signInWithPopup, getAdditionalUserInfo } from "firebase/auth";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log({result})
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error.message);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const additionalUserInfo = getAdditionalUserInfo(result);
      const { user } = result;
      if(additionalUserInfo?.isNewUser){
        await setDoc(doc(db, "users", user.uid), {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            createdAt: new Date(),
        });
      }
    } catch (error) {
      console.error("Lỗi đăng nhập Facebook:", error.message);
    }
  };

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      } 
    });

    return () => unsubscribe();
  }, []);

  return (
    <Row className="h-screen justify-center bg-gray-100">
      <Col span={8}>
        <Title style={{ textAlign: "center" }}>Đăng nhập</Title>
        <Button type="primary" style={{ marginBottom: "10px", width: "100%" }} onClick={handleGoogleLogin}>
          Đăng nhập bằng Google
        </Button>
        <Button type="default" style={{ width: "100%" }} onClick={handleFacebookLogin}>
          Đăng nhập bằng Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Login;
