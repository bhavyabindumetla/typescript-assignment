import React, { useCallback, useEffect, useState } from 'react'

import UserCard from './components/user-card-norm'
import { RouteComponentProps } from 'react-router';
import { useAppDispatch, useAppSelector, userNormSelector } from './redux/hooks';
import { addUser, removeUser, fetchUsers } from './redux/users-normalizer-slice'
import { useSelector } from 'react-redux';
import { UserConfig } from './Api';

interface Props {
  routerProps: RouteComponentProps
}

const UsersNorm: React.FC<Props> = (props: Props) => {

  const users = useSelector(userNormSelector.selectAll)
  const dispatch = useAppDispatch()
  const state = useAppSelector(state=>state)
  console.log("state", state)

  const [newUser, setNewUser] = useState<UserConfig>({
    first_name: "",
    last_name: "",
    id: users.length
  })

  const fetchUsersList = async (): Promise<void> => {
    dispatch(fetchUsers())
  }

  const handleInput = useCallback((e: React.FormEvent<HTMLInputElement>): void => {

    const user = {
      ...newUser,
      [e.currentTarget.name]: e.currentTarget.value
    }

    setNewUser(user)
  }, [newUser])

  const handleAddUser = (): void => {

    dispatch(addUser({...newUser}))
    setNewUser({
      first_name: "",
      last_name: "",
      id: -1,
    })
  }

  const handleRemove = useCallback((index: number): void => {
    dispatch(removeUser(index))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchUsers())
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
        value={newUser.first_name}
        onChange={handleInput}
        className="mr-2 p-1"
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
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
        {users.map((user, index: number) => {
            return (
              <UserCard
                key={index}
                id={user.id}
                userName={user?.first_name + " " + user?.last_name}
                sno={index + 1}
                handleRemove={handleRemove}
              />
            )
        })}
      </div>
    </div>
  )
}

export default React.memo(UsersNorm);