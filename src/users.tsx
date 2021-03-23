import React, { useState } from 'react'

import { fetchUsers } from './Api';
import UserCard from './components/user-card'
import { RouteComponentProps } from 'react-router';
import { deleteUser, insertUser } from './redux/users-slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';

const Users = ({ match }: RouteComponentProps) => {

  const users = useAppSelector(state => state.usersRes.users)
  const dispatch = useAppDispatch()

  const [newUser, setNewUser] = useState({
    first_name: "",
    last_name: "",
  })

  const fetchUsersList = async () => {
    const usersList = await fetchUsers()
    dispatch(insertUser(usersList))
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>, name: string) => {

    const user = {
      ...newUser,
      [name]: e.currentTarget.value
    }

    setNewUser(user)
  }

  const handleAddUser = () => {

    dispatch(insertUser([newUser]))
    setNewUser({
      first_name: "",
      last_name: "",
    })
  }

  const handleRemove = (index: number) => {
    dispatch(deleteUser(index))
  }


  return (
    <div className="container m-5">
      <header className="align-items-center">
        <h1 className=" mr-5">Users</h1>
        <button className="btn-primary p-2 border-0 text-center alert" onClick={fetchUsersList}>
          Click to see Users
        </button>
      </header>

      <h3>Add User</h3>
      <input
        type="text"
        name="First Name"
        placeholder="First Name"
        value={newUser.first_name}
        onChange={(e) => handleInput(e, "first_name")}
        className="mr-2 p-1"
      />
      <input
        type="text"
        name="Last Name"
        placeholder="Last Name"
        value={newUser.last_name}
        onChange={(e) => handleInput(e, "last_name")}
        className="mr-2 p-1"
      />
      <button
        onClick={handleAddUser}
        className="border-0 btn-success p-2 alert"
      >
        Add User
      </button>
      <div className="w-25">
        {users.map((user, index) => (
          <UserCard
            key={index}
            userName={user.first_name + " " + user.last_name}
            sno={index + 1}
            handleRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  )
}

export default Users