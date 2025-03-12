import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Cấu hình Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBFdsraxB87moVdgre36Ke_p1bPK_rjqC0",
  authDomain: "chat-app-e1c00.firebaseapp.com",
  projectId: "chat-app-e1c00",
  storageBucket: "chat-app-e1c00.appspot.com",
  messagingSenderId: "71518573722",
  appId: "1:71518573722:web:a0a7fb3785f9ca48d43b23",
  measurementId: "G-WK0K52RCKQ",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Kết nối Firestore & Auth với Emulator khi chạy local
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);  // Firestore chạy trên cổng 8080
  connectAuthEmulator(auth, "http://localhost:9099"); // Auth Emulator chạy trên cổng 9099
}

export { auth, db, analytics, facebookProvider, googleProvider };
