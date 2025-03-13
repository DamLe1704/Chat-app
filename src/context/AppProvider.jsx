import React, { createContext, useState, useContext, useEffect } from 'react';
import useFireStore from '../hooks/useFireStore';
import { AuthContext } from './AuthProvider';

export const RoomContext = createContext();

const AppProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [rooms, setRooms] = useState([]);

    const roomsCondition = React.useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: user?.uid || ""  
    }), [user?.uid]);

    const fetchedRooms = useFireStore('rooms', roomsCondition);

    useEffect(() => {
        setRooms(fetchedRooms);
    }, [fetchedRooms]); 

    useEffect(() => {
        if (!user) {
            setSelectedRoom(null);
        }
    }, [user]);


    return (
        <RoomContext.Provider value={{ rooms, selectedRoom, setSelectedRoom }}>
            {children}
        </RoomContext.Provider>
    );
};

export default AppProvider;
