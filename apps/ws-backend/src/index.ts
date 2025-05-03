import { WebSocket,WebSocketServer } from "ws";
import { userManager } from "./userManager";

const wss=new WebSocketServer({port:8080});

wss.on("connection",(socket: WebSocket,request)=>{
    const url=request.url;
    if(!url){
        return ;
    }
    const queryParams=new URLSearchParams(url.split("?")[1])
    const name=queryParams.get("name") || "";
    userManager.getInstance().addUser(socket,name)
    console.log("Client connected");

    socket.on("message",(data)=>{
        
    })


    socket.on("close",()=>{
        console.log("Client disconnected")
    })
})

console.log(`WS-Backend is running on 8080 port`);