import {Server} from "socket.io";
import http from "http";
import express from "express";


const app =express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin: ["http://localhost:5173"]
    }
});


// a helper function to find socketid for a given userid 
export function getReceiverSocketId(userId){
    return userSocketMap[userId];
};


// users to store online users 

const userSocketMap={};


io.on("connection",(socket)=>{
    console.log("A user connected", socket.id);
    const userId=socket.handshake.query.userId;

    if(userId) userSocketMap[userId]=socket.id;

    //send events to all the connected clients 
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});



export {io, app, server };





// io.on(event, callback function) :            listens for events on the server 
// "connection" is a predefined event in socket.io triggered whenever a new socket joins in 
// socket.handshake.query is kinda communication between server and client, and the queries are sent from client when it connects with the server 
