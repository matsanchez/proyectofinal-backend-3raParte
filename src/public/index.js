import { /* loadProducts */ addMessage, loadMessages } from "./socket.js";
import { /* renderProducts */ appendMessage, renderMessages } from "./ui.js";

/* loadProducts(renderProducts); */
addMessage(appendMessage);
loadMessages(renderMessages);
