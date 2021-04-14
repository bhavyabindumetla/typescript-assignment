import '@testing-library/jest-dom'
import { render, cleanup, screen, fireEvent, RenderResult, waitFor } from '@testing-library/react'
import App from './App'
import { insertUser } from './redux/users-slice'
import { Provider } from 'react-redux'
import { fetchUsers, USER_STATE } from './Api'
import store from './redux/store'
import Users from './users'
import { MemoryRouter } from 'react-router'
import { server, rest } from './tests/testServer'
const renderWithRedux = (component = <App />) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}

const renderWithRoute = (component = <App />) => {
  return (
    <MemoryRouter>{component}</MemoryRouter>
  )
}

describe("users testing", () => {
  it('checks async call data length is 6', async () => {
    renderWithRedux(renderWithRoute(<Users />))
    expect.assertions(1);
    await fetchUsers().then((data) => {
      expect(data.length).toBe(6)
      store.dispatch(insertUser(data))
    })
  })

  it('checks is fetch button', async () => {
    renderWithRedux(renderWithRoute(<Users />))
  
    const fetchUsersButton = screen.getByText("Click to see Users")
    fireEvent.click(fetchUsersButton)
    await waitFor(() => {
      expect(screen.queryByTitle('remove6')).toBeInTheDocument()
      let users = store.getState().usersRes.users
      expect(users.length).toBe(6)
    })
  })

})


it('check add user', () => {
  renderWithRedux(renderWithRoute(<Users />))

  let firstNameInput: any = screen.queryByTitle("first_name")
  fireEvent.change(firstNameInput, { target: { value: 'Test' } });
  expect(firstNameInput.value).toBe("Test")

  let lastNameInput: any = screen.getByPlaceholderText("Last Name")
  fireEvent.change(lastNameInput, { target: { value: 'Name' } });
  expect(lastNameInput.value).toBe("Name")

  const addUserButton = screen.getAllByText("Add User")
  fireEvent.click(addUserButton[1])
  let users = store.getState().usersRes.users
  expect(users.length).toBe(1)
})

it('check remove user', () => {
  renderWithRedux(renderWithRoute(<Users />))

  let firstNameInput = screen.getByPlaceholderText("First Name")
  fireEvent.change(firstNameInput, { target: { value: 'Test Name' } }); //And changing its data
  const addUserButton = screen.getAllByText("Add User")
  fireEvent.click(addUserButton[1],
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }))
  const removeUserButton = screen.getAllByText("Remove")
  fireEvent.click(removeUserButton[0])

  let users = store.getState().usersRes.users
  expect(users.length).toBe(0)
  expect(users.length).toBe(0)
})

test("with msw", async () => {
  server.use(
    rest.get("https://reqres.in/api/users", (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({data:[{
                first_name: "Bhavya",
                id: 1,
                last_name: "M"
            }]})
        )
    })
  )
  renderWithRedux(<Users />)
  const element = await screen.findByText(/Bhavya/i)
})