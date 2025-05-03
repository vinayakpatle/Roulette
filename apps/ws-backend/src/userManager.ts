import { WebSocket } from "ws"
import { outgoingMessage } from "./types";
import {User} from "./User"

let ID=1;

// interface User{
//     id:number;
//     ws:WebSocket;
//     name:string;
// }

export class userManager{
    private users: User[]=[];
    private static instance: userManager;

    constructor(){
        ///this.users=[];
    }

    public static getInstance(){
        if(!this.instance){
            this.instance=new userManager();
        }
        return this.instance;
    }

    addUser(ws:WebSocket,name:string){
        let id=ID;
        this.users.push(new User(
            id,
            name,
            ws
        ))

        ws.on("close",()=>this.removeUser(id))
        ID++;
    }

    removeUser(id:number){
        this.users=this.users.filter(x=>x.id!==id)
    }


    //broadcats message to everyone who has joined
    // if userId is an input ,don't send them the messsaage
    broadcast(message: outgoingMessage,userId?:number){
        this.users.forEach((user)=>{
            if(user.id!==userId){
                user.ws.send(JSON.stringify({message}));
            }
        })
    }

}