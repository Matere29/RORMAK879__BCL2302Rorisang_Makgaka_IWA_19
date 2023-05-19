import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

/*
  code for displaying the first 36 books when page is first run
*/

let startIndex = 0             
let endIndex = 36 
const extracted =   books.slice(startIndex, endIndex) //source.slice(range[0], range[1])   // 
const dataListItems = document.querySelector('[data-list-items]') // created a variable and took the empty div from HTML line 93

const fragment = document.createDocumentFragment()  
for ( const {author, image, title, id, description, published} of  extracted) { // fixed for loop

    let element = document.createElement('button')
    element.classList = 'preview'
    element.dataset.id = id
    element.dataset.title = title
    element.dataset.description = description
    element.dataset.image = image
    element.dataset.subtitle = (`${authors[author]} (${(new Date(published)).getFullYear()})`)
    element.innerHTML = /* html */ `
        <div><img
            class ="preview__image"
            src="${image}"
        /></div>
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `
    fragment.appendChild(element)
}
dataListItems.appendChild(fragment)      // appended the fragment into dataListItems


 /*the code below is for book preview, it shows all the details about the book, like author, title and description
    */
   const dataListClose =  document.querySelector('[data-list-close]')
   const previewOverlay =  document.querySelector('[data-list-active]')
   const details = (event) =>{
    const overlay1 = previewOverlay
    const title = document.querySelector('[data-list-title]')
    const subtitle = document.querySelector('[data-list-subtitle]')
    const description = document.querySelector('[data-list-description]')
    const image1 = document.querySelector('[data-list-image]')
    const imageblur = document.querySelector('[data-list-blur]')

    event.target.dataset.id ? overlay1.style.display = 'block' : undefined;
    event.target.dataset.title ? title.innerHTML = event.target.dataset.title : undefined;
    event.target.dataset.subtitle ?  subtitle.innerHTML = event.target.dataset.subtitle : undefined;
    event.target.dataset.description ?  description.innerHTML = event.target.dataset.description : undefined;
    event.target.dataset.image ? image1.setAttribute('src', event.target.dataset.image)  : undefined;
    event.target.dataset.image ?  imageblur.setAttribute('src', event.target.dataset.image)  : undefined;
  }
  dataListItems.addEventListener('click', details)
  dataListClose.addEventListener('click', (event) =>{
  previewOverlay.style.display = 'none'
  })

    /*Showmore button shows more books when clicked 
    */
    const dataListButton = document.querySelector('[data-list-button]');
    let numOfBooks = books.length - 36 // 36 is the number of books already shown
    dataListButton.innerHTML = `Show more (${numOfBooks})`

    const showMoreButton = document.querySelector('[data-list-button]')
    showMoreButton.addEventListener('click',() => {
        startIndex += 36
        endIndex += 36
        numOfBooks -= 36

        dataListButton.innerHTML = `Show more (${numOfBooks})`
        const extracted =   books.slice(startIndex, endIndex) 
        const fragment = document.createDocumentFragment()  

        for ( const {author, image, title, id, description, published} of  extracted) {       // added s on author, turned it into a for loop
            //fixed syntax error of for loop
        
            let element = document.createElement('button')
            element.classList = 'preview'
            element.dataset.id = id
            element.dataset.title = title
            element.dataset.description = description
            element.dataset.image = image
            element.dataset.subtitle = (`${authors[author]} (${(new Date(published)).getFullYear()})`)
            element.setAttribute('data-preview', id)
        
            element.innerHTML = /* html */ `
                <div><img
                    class ="preview__image"
                    src="${image}"
                /></div>
                
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[author]}</div>
                </div>
            `
            fragment.appendChild(element)
        }
        dataListItems.appendChild(fragment)      // appended the fragment into add 
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Search Button

//Code for displaying and undisplaying the search overlay
const dataSearchOverlay = document.querySelector('[data-header-search]');
const dataSearchCancel = document.querySelector('[data-search-cancel]');

dataSearchOverlay.addEventListener('click', function() {
    document.querySelector('[data-search-overlay]').style.display = 'block'
  });
dataSearchCancel.addEventListener('click', function() {
    document.querySelector('[data-search-overlay]').style.display = 'none'
  });

//Storing options of all genres and all authors
const genresFragment = document.createDocumentFragment();
let element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Genres';
genresFragment.appendChild(element);

for (let [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  const value = id;
  const text = name;
  element.value = value;
  element.innerText = text;
  genresFragment.appendChild(element);
}
document.querySelector('[data-search-genres]').appendChild(genresFragment);

const authorsFragment = document.createDocumentFragment();
element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsFragment.appendChild(element);
for (let [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    const value = id;
    const text = name;
    element.value = value;
    element.innerText = text;
    authorsFragment.appendChild(element);
  }
document.querySelector('[data-search-authors]').appendChild(authorsFragment);

// Code for search specific books and displaying on datalistItems after removing the previous searches
const searchFilter = document.querySelector('[data-search-form]') // add event listener to search form
const dataListMessage = document.querySelector('[data-list-message]')
const dataSearchForm = document.querySelector('[data-search-form]')
const datasearchOverlay = document.querySelector('[data-search-overlay]')
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();//prevents default behaviour to be loaded
   dataListItems.innerHTML = ''

   const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author'); 

const filteredBooks = [];
for (let i = 0; i < books.length; i++) {
  const book = books[i];
  // if genre and author are not selected, filter by title only
  if (genre1 === 'any' && author1 === 'any') {
   if (book.title.toLowerCase().includes(title1.toLowerCase())){
    filteredBooks.push(book);
   }
  }
  // if genre is not selected, filter by title and author
  if (genre1 === 'any') {
    if (book.title.toLowerCase().includes(title1.toLowerCase()) && book.author === author1){
     filteredBooks.push(book);
    }
   }
   // if title is not entered, filter by author and genre
   if (title1 === '') {
    if (book.author === author1 && book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // if neither title nor author are selected, filter by genre only
   if (title1 === '' && author1 === 'any' ) {
    if (book.genres.includes(genre1)){
     filteredBooks.push(book);
    }
   }
   // display message if no books match filters
   if (filteredBooks.length > 0){
    dataListItems.style.display = 'block'
    dataListMessage.style.display = 'none'
    dataListButton.disabled = true
   } else{
    dataListMessage.style.display = 'block'
    dataListItems.style.display = 'none'
    dataListButton.disabled = true
   }
}

// create fragment to hold filtered books
const fragment2 = document.createDocumentFragment()
    for (const {author ,image, title, id , description, published} of filteredBooks) {
        const preview = document.createElement('button')
        preview.className = 'preview'
        preview.dataset.id = id
        preview.dataset.title = title
        preview.dataset.image = image
        preview.dataset.subtitle = `${authors[author]} (${(new Date(published)).getFullYear()})`
        preview.dataset.description = description
        preview.dataset.genre = genres
        // create preview button with book information
        preview.innerHTML= /*html*/`
        <div>
        <image class='preview__image' src="${image}" alt="book pic"}/>
        </div>
        <div class='preview__info'>
        <dt class='preview__title'>${title}<dt>
        <dt class='preview__author'> By ${authors[author]}</dt>
        </div>`
 // append preview button to fragment
         fragment2.appendChild(preview)
         }
 // add filtered books to message area
   dataListItems.append(fragment2)
   dataListItems.style.display = 'grid'
   dataSearchForm.reset()
   datasearchOverlay.style.display = 'none'
    })
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Settings Button

const day = {//declared object correctly using const
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {//declared  object correctly using const
    dark: '255, 255, 255',
    light: '10, 10, 20',
}

//code for diplaying and undisplaying the settings overlay
const settingButton = document.querySelector('[data-header-settings]')
const settingsCancel = document.querySelector('[data-settings-cancel]')
const dataSettingsOverlay = document.querySelector('[data-settings-overlay]')

settingButton.addEventListener('click', (event)=>{
    dataSettingsOverlay.style.display = 'block'
})
settingsCancel.addEventListener('click', (event)=>{
    dataSettingsOverlay.style.display = 'none'
})
//code for changing the page to dark mode or light mode
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const SettingsSaveButton = document.querySelector('[form="settings"]')
const bodyOverlay = document.querySelector('body')

SettingsSaveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    bodyOverlay.style.setProperty('--color-dark', day.dark)
    bodyOverlay.style.setProperty('--color-light', day.light)
    dataSettingsOverlay.style.display = 'none'
  }
  if (dataSettingsTheme.value === 'night') {
    bodyOverlay.style.setProperty('--color-dark', night.dark)
    bodyOverlay.style.setProperty('--color-light', night.light)
    dataSettingsOverlay.style.display = 'none'
      }
});


