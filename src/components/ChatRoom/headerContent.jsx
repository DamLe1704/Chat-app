import { UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Typography } from 'antd';
import React from 'react';
import AddMemberModal from '../modals/addMemberModal';
import { RoomContext } from '../../context/AppProvider';
const { Title } = Typography;
const HeaderContent = ({ room }) => {
    const [open, setOpen] = React.useState(false);
    const { allUsers } = React.useContext(RoomContext);
    const [members, setMembers] = React.useState([]);
    console.log(room)
    React.useEffect(() => {
        const fetchMembers = async () => {
            if (!room?.members?.length) return;
            
            setMembers(
                allUsers
                    .filter(user => room.members.includes(user.id))
                    .map(member => ({
                        photoURL: member.photoURL,
                        label: member.displayName
                    }))
            );
        };
    
        fetchMembers();
    }, [room, allUsers]);
    
    const handleOpenModal = () => {
        setOpen(true)
    }

    const handleCancelModal = () => {
        setOpen(false)
    }
    return(
        <div style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px", marginBottom: "10px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div> 
                <Title level={4}>{room?.name}</Title>
                <span>{room?.description}</span>
            </div>
            <div>
                <Button type='text' icon={<UserAddOutlined/>} onClick={handleOpenModal}>Mời</Button>
                <AddMemberModal open={open} handleCancel={handleCancelModal}/>
                <Avatar.Group maxCount={2}>
                    {members.map((member, index) => (
                        <Tooltip title={member.label} key={index}>
                            <Avatar src={member.photoURL}>{member.photoURL ? '' : member.label[0].toUpperCase()}</Avatar>
                        </Tooltip>
                    ))}
                </Avatar.Group>
            </div>
        </div>
    )
}
export default HeaderContent;