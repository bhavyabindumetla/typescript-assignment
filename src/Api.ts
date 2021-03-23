
export type USER_STATE = {
    first_name: string,
    last_name: string,
}

export const fetchUsers = async () => {
    const endpoint = `https://reqres.in/api/users?page=1`;
    const data = await(await fetch(endpoint)).json();
    return data.data.map((user: USER_STATE) =>  user)
}