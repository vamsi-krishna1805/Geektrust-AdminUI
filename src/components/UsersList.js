import React, { useEffect, useState, useContext } from 'react';
import Users from './Users';
import Pagination from './Pagination';
import { UserContext } from '../context/UserContext';

const UsersList = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = userData.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPagesNum = Math.ceil(userData.length / employeesPerPage);
  
//Fetching the userdata from API using fetch API
  const fetchUserData = async () => {
    const responseData = await (await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')).json();
    setUserData(responseData.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(`${searchTerm}`.toLowerCase()))))
  }

  //handle checkbox function
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      const checkedvalue = userData.map((user) => { return { ...user, isChecked: checked } });

      setUserData(checkedvalue);
    } else {
      const checkedvalue = userData.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user);

      setUserData(checkedvalue);
    }
  }

  //handle delete function
  const handleDelete = (e) => {
    setUserData(userData.filter(employee => employee.isChecked !== true));
  }

  //UseEffect implementation
  useEffect(() => {
    fetchUserData();
    setUserData(userData.filter(o =>
      Object.keys(o).some(k => o[k].toLowerCase().includes(`${searchTerm}`.toLowerCase()))))
  }, [searchTerm])

  return (
    <>
      <input type='text' className='searchBar' placeholder='Search by name , email or role' onChange={(e) => setSearchTerm(e.target.value)} />
      <div className='table-responsive'>
        <div className='table-wrapper'>
          <form>
            <table className='table  table-hover'>
              <thead>
                <tr className='tableRow'>
                  <th><input type='checkbox' className='checkbox' name="allselect" checked={!currentEmployees.some((data) => data?.isChecked !== true)} onChange={handleCheckbox} /></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentEmployees.map((user) => (
                    <tr key={user.id} className='tableRow' >
                      <Users user={user} handleCheckbox={handleCheckbox} handleDelete={handleDelete} />
                    </tr>
                  ))

                }
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <div className='pageButn'>
        <button onClick={handleDelete} className='deleteSelected'>Delete Selected</button>
        <Pagination pages={totalPagesNum}
          setCurrentPage={setCurrentPage}
          currentEmployees={currentEmployees}
          Employees={userData} />
      </div>
    </>

  )
}

export default UsersList;