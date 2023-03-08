const socket = io();

/* Mensajes Sockets cliente/servidor de Productos */
export const loadProducts = (callback) => {
  socket.on("server:loadProducts", callback);
};

export const addProduct = (id) => {
  socket.emit("client:addProduct", id);
};

/* Mensajes Sockets cliente/servidor de Chat de Mensajes */
export const loadMessages = (callback) => {
  socket.on("server:loadMessages", callback);
};

export const setMessage = (obj) => {
  socket.emit("client:newMessage", obj);
};

export const addMessage = (callback) => {
  socket.on("server:newMessage", callback);
};
