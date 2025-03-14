import React, { createContext, useState, useContext, useEffect } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const RoomContext = createContext();

const AppProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedMember, setSelectedMember] = useState([]);
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, "users");
                const snapshot = await getDocs(usersRef);
                const usersList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setAllUsers(usersList);
            } catch (error) {
                console.error("Lỗi khi tải danh sách user:", error);
            }
        };
        fetchUsers();
    }, []);

    const roomsCondition = React.useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: user?.uid || ""  
    }), [user?.uid]);

    const fetchedRooms = useFireStore('rooms', roomsCondition);
   
    useEffect(() => {
        setRooms(fetchedRooms);
    }, [fetchedRooms]); 

    return (
        <RoomContext.Provider value={{ rooms, allUsers, selectedRoom, setSelectedRoom, selectedMember, setSelectedMember }}>
            {children}
        </RoomContext.Provider>
    );
};

export default AppProvider;
