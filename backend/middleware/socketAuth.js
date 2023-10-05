const socketAuth=(socket,next)=>{
    const headers=socket.handshake.headers;
    if (!headers.token) {
      next(new Error("Invalid"))
    }else{
        socket.join(`room-${headers.user_id}`)
      socket.user={token:headers.token,user_id:headers.user_id};
      next()
    }
  }
  module.exports=socketAuth