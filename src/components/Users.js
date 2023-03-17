import { useState, useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import EditUserDetails from './EditUserDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Users = ({ user, handleCheckbox }) => {

    const { deleteUser } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    useEffect(() => { handleClose() }, [user])

    return (
        <>
            <td><input name={user.name} className='checkbox' type='checkbox' checked={user?.isChecked || false} onChange={handleCheckbox} /></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className='Actions'><EditIcon onClick={handleShow} className='edit' /><DeleteIcon onClick={() => deleteUser(user.id)} className='delete' /></td>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Employee
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditUserDetails user={user} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Users;
