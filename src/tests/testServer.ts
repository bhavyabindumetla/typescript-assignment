import {
    rest
} from "msw"
import {
    setupServer
} from "msw/node"
import store from "../redux/store"
import { insertUser } from "../redux/users-slice"

const server = setupServer(
    rest.get("https://reqres.in/api/users", (req, res, ctx) => {
        store.dispatch(insertUser([{
            first_name: "Bhavya",
            last_name: "M"
        }]))
        return res(
            ctx.status(200),
            ctx.json({data:[{
                first_name: "Bhavya",
                id: 1,
                last_name: "M"
            }]})
        )
    }),
    rest.get("*", (req, res, ctx)=>{
        console.error("please add req handler for "+ req.url.toString())
        return res(
            ctx.status(500) 
        )
    })
)

export {server, rest}