import { Form, Button } from "react-bootstrap"
import { UserContext } from "../context/UserContext";
import {useContext,useState} from 'react';

const EditUserDetails = ({user}) =>{

    const id = user.id;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const {updateUser} = useContext(UserContext);
    
    const updatedUserDetails = {id,name, email,role}

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(id, updatedUserDetails)
    }
     return (

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Name *"
                    name="name"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Role"
                    name="Role"
                    value={role}
                    onChange={(e)=> setRole(e.target.value)}
                />
            </Form.Group>
            <Button variant="success" type="submit" block>
                Edit Employee
            </Button>
        </Form>

     )
}

export default EditUserDetails;