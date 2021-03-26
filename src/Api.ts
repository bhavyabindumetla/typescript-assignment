
export interface UserConfig {
    first_name: string,
    last_name: string,
    id: number
}

export const fetchUsers = async (): Promise<Array<UserConfig>> => {
    const endpoint: string = `https://reqres.in/api/users?page=1`;
    const data = await(await fetch(endpoint)).json();
    return data.data.map((user: UserConfig) =>  user)
}