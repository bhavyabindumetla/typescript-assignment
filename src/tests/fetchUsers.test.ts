import {
    fetchUsers
} from "../Api"
import { server } from './testServer'


beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(()=>server.resetHandlers())

it("fetch", async () => {
    const users = await fetchUsers()
    expect(users[0].first_name).toEqual("Bhavya")
})