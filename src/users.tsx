import React, { useCallback, useState } from 'react'

import { fetchUsers, USER_STATE } from './Api';
import UserCard from './components/user-card'
import { deleteUser, insertUser } from './redux/users-slice';
import { useAppDispatch, useAppSelector } from './redux/hooks';


const Users = () => {

  const users: Array<USER_STATE> = useAppSelector(state => state.usersRes.users)
  const dispatch = useAppDispatch()

  const [newUser, setNewUser] = useState<USER_STATE>({
    first_name: "",
    last_name: "",
  })

  const fetchUsersList = async (): Promise<void> => {
    const usersList: Array<USER_STATE> = await fetchUsers()
    dispatch(insertUser(usersList))
  }

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>): void => {

    const user: USER_STATE = {
      ...newUser,
      [e.currentTarget.name]: e.currentTarget.value
    }

    setNewUser(user)
  }, [newUser])

  const handleAddUser = (): void => {

    dispatch(insertUser([newUser]))
    setNewUser({
      first_name: "",
      last_name: "",
    })
  }

  const handleRemove = useCallback((index: number): void => {
    dispatch(deleteUser(index))
  }, [dispatch])


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
        name="first_name"
        placeholder="First Name"
        title="first_name"
        value={newUser.first_name}
        onChange={handleInput}
        className="mr-2 p-1"
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        title="last_name"
        value={newUser.last_name}
        onChange={handleInput}
        className="mr-2 p-1"
      />
      <button
        onClick={handleAddUser}
        className="border-0 btn-success p-2 alert"
      >
        Add User
      </button>
      <div className="w-25">
        {users.map((user: USER_STATE, index: number) => (
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

export default React.memo(Users);