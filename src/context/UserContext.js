import { createContext, useState } from 'react';

export const UserContext = createContext();
const UserContextProvider = (props) => {
    const [userData, setUserData] = useState([]);

    const fetchUserData = async () => {
        const responseData = await (await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')).json();
        setUserData(responseData)
    }

    const updateUser = (id, updatedUserDetails) => {
        return (
            setUserData(userData.map((ele) => ele.id === id ? updatedUserDetails : ele)))
    };

    const deleteUser = (id) => {
        setUserData(userData.filter(user => user.id !== id));
    }
    return (
        <UserContext.Provider value={{ fetchUserData, userData, setUserData, updateUser, deleteUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;