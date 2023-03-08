import { addProduct, setMessage } from "./socket.js";

const DOMlistProducts = document.getElementById("listProducts");
const DOMroomChat = document.getElementById("roomChat");
const DOMchat = document.getElementById("formChat");
DOMchat.addEventListener("submit", (e) => chatHandleSubmit(e, e.target));

export const chatHandleSubmit = (e, form) => {
  e.preventDefault();
  let formData = new FormData(form);
  let obj = {};
  formData.forEach((value, key) => (obj[key] = value));
  setMessage(obj);
  document.getElementById("textarea").value = "";
};

const productUI = (product) => {
  const div = document.createElement("div");
  div.classList.add("w-25");
  div.innerHTML = `
                  <div class="card m-1">
                    <img src=${product.thumbnail} alt=${product.name}>
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">$${product.price}</p>
                    </div>
                    <button class="addCart m-1 mb-2 btn btn-sm btn-success" data-id=${product._id}>Agregar al carrito</button>
                  </div>
                `;
  const btnAddCart = div.querySelector(".addCart");
  btnAddCart.addEventListener("click", (e) => addProduct(e.target.dataset.id));
  return div;
};

export const renderProducts = (products) => {
  DOMlistProducts.innerHTML = "";
  if (products.length === 0) {
    const empty = document.createElement("tr");
    empty.classList.add("empty");
    empty.innerHTML = `
                        <th colspan="12">
                            <h5 class="p-3 text-center">No hay productos en la lista</h5>
                        </th>
                      `;
    DOMlistProducts.appendChild(empty);
  }
  products.forEach((product) => {
    DOMlistProducts.append(productUI(product));
  });
};

export const appendProduct = (product) => {
  if (!!document.querySelector(".empty")) {
    document.querySelector(".empty").remove();
  }
  DOMlistProducts.append(productUI(product));
};

const messageUI = (message) => {
  const li = document.createElement("li");
  li.classList.add("bg-light", "p-1", "list-unstyled");
  li.innerHTML = `
                  <strong class="text-primary">${message.email}</strong>:
                  <strong class="text-danger">[${message.createdAt}]</strong>
                  <em class="text-success">:${message.text}</em>
                  `;
  return li;
};

export const renderMessages = (messages) => {
  messages.forEach((message) => {
    DOMroomChat.append(messageUI(message));
  });
};

export const appendMessage = (message) => {
  DOMroomChat.append(messageUI(message));
};
