const socketAuth=(socket,next)=>{
    const headers=socket.handshake.headers;
    if (!headers.token) {
      next(new Error("Invalid"))
    }else{
        socket.join(`room-${headers.id}`)
      socket.user={token:headers.token,id:headers.id};
      // console.log("socket.user",socket.user);
      next()
    }
  }
  module.exports=socketAuth