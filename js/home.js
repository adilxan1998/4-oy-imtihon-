"use strict";

const elLogoutBtn = document.querySelector(".button")
const elRenderBook = document.querySelector(".col-10")
const elResultSpan = document.querySelector(".span");
const elFormInput = document.querySelector(".form_input")
const elPrevBtn = document.querySelector(".prev-btn")
const elNextBtn = document.querySelector(".next-btn")
const elPagesNum = document.querySelector(".pages-number")
const elBookList = document.querySelector(".book_list");
const elOrderBtn = document.querySelector(".order_btn")

const token = window.localStorage.getItem("token");

if(!token) {
  window.location.replace("index.html");
}

logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
})

let search = "python";
let page = "1"

const renderBooks = function(books, htmlElement) {
  elBookList.innerHTML = null
  for(let book of books.items){
    const html = `
      <div class="card" style="width: 18rem;">
        <img src="${book.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="...">
        <div class="card-box">
          <h5 class="card-title">${book.volumeInfo.title}</h5>
          <p class="card-text">${book.volumeInfo.authors}</p>
          <p class="card-text">${book.volumeInfo.publishedDate}</p>
        </div>
        <div class="card-body">
          <button class="bookmark-btn">Bookmark</button>
          <button class="more-btn">More Info</button>
        <a href="${book.volumeInfo.previewLink}" class="btn link btn-primary">Read</a>
        </div>
      </div>
    ` 
    htmlElement.insertAdjacentHTML("beforeend", html);
  }
}

const getBooks = async function () {
  let startIndex = (page - 1) * 10 + 1;
  const reqres = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=12`)

  const books = await reqres.json() 
  

  elResultSpan.textContent = `${books.totalItems}`
  
  renderBooks(books, elBookList,)
  renderButtons(books)

}

elOrderBtn.addEventListener("click", function() {
  const news = async function(){
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}&maxResults=12&orderBy=newest`)
    const orders = await result.json()
    renderBooks(orders, elBookList)
  }
  news()
})

elFormInput.addEventListener("input", function(e) {
  e.preventDefault()
  search = elFormInput.value
  getBooks()

  console.log(search);
  
})

elPrevBtn.addEventListener("click", function(){
    page--

    getBooks()
});

elNextBtn.addEventListener("click", function(){
    page++

    getBooks()
})

const renderButtons = function (movies){
    elPagesNum.innerHTML = null
    for(let i = 1; i <= Math.ceil(movies.totalItems/10); i++){
        var btn = document.createElement("button")
        btn.setAttribute("class", "btn mx-auto pag-btn  mt-3 ms-2")
        elPagesNum.style.marginLeft = "auto"
        elPagesNum.style.marginRight = "auto"
        btn.textContent = i
        elPagesNum.appendChild(btn)
    }
}

elPagesNum.addEventListener("click", function(evt){
    elPagesNum.innerHTML = null
    page = evt.target.textContent;
    getBooks()
})

getBooks(search, page)

