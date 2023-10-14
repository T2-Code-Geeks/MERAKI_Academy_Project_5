const socketAuth=(socket,next)=>{
    const headers=socket.handshake.headers;
    if (!headers.token) {
      next(new Error("Invalid"))
    }else{
        socket.join(`room-${headers.id}`)
      socket.user={token:headers.token,id:headers.id};
      next()
    }
  }
  module.exports=socketAuth