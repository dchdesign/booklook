//results
let resultsContainer = document.querySelector('#results')

//title search with API KEY I got from Google
async function getBookInfoByTitle(text) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${text}&maxResults=40&key=XXXaSyAfBBp5mHgcJfee18mFgemPf1DfY5McMa8`;
    const response = await axios.get(url)
    let info = response.data.items
    bookInfo(info)
    return info
  } catch (error) {
    console.log(error)
    alert('Sorry - something is wrong. Try again.')
  }
}

//author search with API KEY I got from Google
async function getBookInfoByAuthor(text) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${text}&maxResults=40&key=XXXaSyAfBBp5mHgcJfee18mFgemPf1DfY5McMa8`;
    const response = await axios.get(url)
    let info = response.data.items
    bookInfo(info)
    return info
  } catch (error) {
    console.log(error)
    alert("Sorry - something is wrong. Try again."); 
  }
}

//ISBN search with API KEY I got from Google
async function getBookInfoByISBN(text) {
  try {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${text}&maxResults=40&key=XXXaSyAfBBp5mHgcJfee18mFgemPf1DfY5McMa8`;
    const response = await axios.get(url)
    let info = response.data.items
    bookInfo(info)
    return info
  } catch (error) {
    console.log(error)
    alert("Sorry - something is wrong. Try again.");
  }
}


//get book info
function bookInfo(bookInfo) {
  bookInfo.forEach(book => {

    //image for book 
    let image = ''
    if (book.volumeInfo.imageLinks === undefined ) { 
      //if no image use this 
      image = 'images/nobookcover.jpg'
    } else image = book.volumeInfo.imageLinks.thumbnail

    //title and author
    let title = book.volumeInfo.title
    let author = ""
    if (book.volumeInfo.authors != undefined) {
      author = book.volumeInfo.authors
    } else  author = "N/A"

    //publication date and publisher
    let date = book.volumeInfo.publishedDate
    let publisher = ''
      if (book.volumeInfo.publisher != undefined) {
        publisher = book.volumeInfo.publisher
      } else publisher = 'N/A'

    //isbn
    let isbn = ''
    if (book.volumeInfo.industryIdentifiers != undefined) {
           if (book.volumeInfo.industryIdentifiers[1] == undefined) {
        isbn = book.volumeInfo.industryIdentifiers[0].identifier
      }
      else if (book.volumeInfo.industryIdentifiers[0].identifier != undefined 
            && book.volumeInfo.industryIdentifiers[1].identifier != undefined) {
        isbn = book.volumeInfo.industryIdentifiers[0].identifier
      }
    } else {
        isbn = "N/A";
    }

    //Google Books preview 
    let preview = book.volumeInfo.previewLink

    //price and link for ebook via Google Play store
    let price = '' 
    let currency = ''
    let buyLink = ''
    if (book.saleInfo.saleability == "FOR_SALE") {
      price = book.saleInfo.retailPrice.amount
      currency = book.saleInfo.retailPrice.currencyCode
      buyLink = book.saleInfo.buyLink
    } else {
      price = 'N/A'
      currencyCode = 'N/A'
    }

//format info
formatBookInfo(image, title, author, publisher, date, isbn, preview, price, currency, buyLink)
  addBookDisplayListeners()
  });
}


//send info
function formatBookInfo(image, title, author, publisher, date, isbn, preview, price, currency, buylink) {
  let resultsDiv = document.querySelector("#results")
 
  //new div for each book
  let bookDiv = document.createElement('div')

  //style later in CSS
  bookDiv.classList.add('book') 
  
  //info display  
  let bookInfo =
  `<div class="info">
      <img src= "${image}"id="bkcover"></img>
      <h2>${title}</h2>
      <h3>${author}</h3>
      <p><b>Publisher:</b> ${publisher}</p>
      <p><b>Publication Date:</b> ${date}</p>
      <p><b>ISBN:</b> ${isbn}</p>
      <p><b>Sample:</b> <a href="${preview}" target="_blank">Google Books Preview</a></p>
      <p><b>Buy eBook:</b><a href ="${buylink}" target="_blank">${price} ${currency}</a></p>
    </div>
    </div>`
  
  //send info display to DOM
  bookDiv.insertAdjacentHTML('beforeend', bookInfo)

  //check for undefined
  resultsDiv.insertAdjacentElement('beforeend', bookDiv)
}


//book display listeners 
function addBookDisplayListeners() {
  let bookDisplayView = document.querySelectorAll('.bookdisplay')
  let bookDisplayButton = document.querySelectorAll('.bookdisplaybutton')

  //multiple book display 
  let bookDisplayArray = Array.from(bookDisplayButton).entries()
  for (let [button] of bookDisplayArray) {
    function show() {
      bookDisplayView.forEach(modal => modal.style.display = "none") 
    }
    button.addEventListener("click", show)
  }
}


  //event listener for button
  let form = document.querySelector('form')
  form.addEventListener('submit', (button) => {

  //prevent click refresh
  button.preventDefault()

  //search text box entry
  let searchText = document.querySelector('#search-text').value

  //drop down menu options
  let searchOptions = document.getElementById('options') 

  //remove results from previous search
  removeResults(resultsContainer)

  //if statement for search options
  if (searchOptions.options[searchOptions.selectedIndex].text == "author") {
       getBookInfoByAuthor(searchText)
  }
  else if (searchOptions.options[searchOptions.selectedIndex].text == "isbn") {
       getBookInfoByISBN(searchText)
  }
  else getBookInfoByTitle(searchText)
})


//reset 
function removeResults(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild)
  }
}


