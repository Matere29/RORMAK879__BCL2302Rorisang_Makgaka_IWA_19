import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js";

let matches = books;
let page = 1;

/*
if (!books) {
   throw new Error('Source required');
 }
  
  if (!range || range.length !== 2) {
   throw new Error('Range must be an array with two numbers');
  }
  
*/

const day = {//declared object correctly using const
    dark: '10, 10, 20',
    light: '255, 255, 255',
}

const night = {//declared  object correctly using const
    dark: '255, 255, 255',
    light: '10, 10, 20',
}
/*
  code for displaying all books
  commented out source and replaced it with books to display the 36 books
*/
  
let startIndex = 0             
let endIndex = 36 
const extracted =   books.slice(startIndex, endIndex) //source.slice(range[0], range[1])   // 
const add = document.querySelector('[data-list-items]') // created a variable and took the empty div from HTML line 93

const fragment = document.createDocumentFragment()  
for ( const {author, image, title, id, description, published} of  extracted) { // fixed for loop

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
add.appendChild(fragment)      // appended the fragment into add
document.querySelector('[data-list-items]').appendChild(fragment);

    /*Showmore button shows more books when clicked 
    */
    const showMoreButton = document.querySelector('[data-list-button]')
    showMoreButton.addEventListener('click',() => {
        startIndex += 36
        endIndex += 36
        const startIndex1 = startIndex
        const endIndex1 = endIndex
        const extracted =   books.slice(startIndex1, endIndex1) 
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
        add.appendChild(fragment)      // appended the fragment into add 
      document.querySelector('[data-list-items]').appendChild(fragment);
    })
    /*the code below is for book preview, it shows all the details about the book, like author, title and description
    */
    const details = (event) =>{
      const  overlay1 = document.querySelector('[data-list-active]')
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
    document.querySelector('[data-list-items]').addEventListener('click', details)
    document.querySelector('[data-list-close]').addEventListener('click', (event) =>{
    document.querySelector('[data-list-active]').style.display = 'none'
    })

//Search for items code
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
document.querySelector('[data-search-authors]').appendChild(authorsFragment);


//code for changing Dark mode and light mode
const settingOverlay = document.querySelector('[data-header-settings]')
settingOverlay.addEventListener('click', (event)=>{
    document.querySelector('[data-settings-overlay]').style.display = 'block'
})
const dataSettingsTheme = document.querySelector('[data-settings-theme]')
const saveButton = document.querySelector("body > dialog:nth-child(5) > div > div > button.overlay__button.overlay__button_primary")
saveButton.addEventListener('click', (event) =>{
    event.preventDefault()
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark)
    document.querySelector('body').style.setProperty('--color-light', day.light)
    document.querySelector('[data-settings-overlay]').style.display = 'none'
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark)
    document.querySelector('body').style.setProperty('--color-light', night.light)
    document.querySelector('[data-settings-overlay]').style.display = 'none'
      }
});
//Code for showing more books
const dataListButton = document.querySelector('[data-list-button]');
dataListButton.innerHTML = /* html */ [
    '<span>Show more</span>',
    `<span class="list__remaining">(${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>`,
].join('');

dataListButton.disabled = !(matches.length - page * BOOKS_PER_PAGE > 0);


//data-search-cancel.click() { data-search-overlay.open === false }
const dataSearchCancel = document.querySelector('[data-search-cancel]');
dataSearchCancel.addEventListener('click', function() {
    const overlay = document.querySelector('[data-search-overlay]');
   overlay.show();
    if (overlay.open === false) {
      // do something here
      overlay.close();
    }
  });

  
 const overlay = document.querySelector('#data-settings-overlay');
if (overlay && overlay.open) {
      overlay.close();
    }
const form = document.querySelector('#data-settings-form');
    //form.addEventListener('submit', submitFormData); 

  //data-list-close.click() { data-list-active.open === false }
const dataListClose = document.getElementById('data-list-close');
const dataListActive = document.getElementById('data-list-active');

/*
dataListClose.addEventListener('click', function() {
  if (dataListActive.open === true) {
    dataListActive.close();
  }
});  
*/
// const dataList = document.querySelector('[data-list-button]')
// dataList.addEventListener('click', function() {
//     const startIndex = page * BOOKS_PER_PAGE;
//     const endIndex = (page + 1) * BOOKS_PER_PAGE;
//     const previewFragment = createPreviewsFragment(matches.slice(startIndex, endIndex));
//     document.querySelector('[data-list-items]').appendChild(previewFragment);
//     actions.list.updateRemaining();
//     page++;
// });
const data = document.querySelector('[data-header-search]');
data.addEventListener('click', () => {
  document.querySelector("[data-search-overlay]").open = true
})
 

/*
data-search-form.click(filters) {
    preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    result = []
//fixed for loop
    for (let i=0; i<booksList.length; i++) {
        titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
        authorMatch = filters.author = 'any' || book.author === filters.author

        {//added
            const genreMatch = filters.genre = 'any'
            //for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
        }

        //if (titleMatch && authorMatch && genreMatch => result.push(book)
        if (titleMatch && authorMatch && genreMatch) {
            result.push(book);
          }
          
    }
    */
//Function to search books
// Search specific books
const searchFilter = document.querySelector('[data-search-form]')
// add event listener to search form
searchFilter.addEventListener('submit', (event)=>{
    event.preventDefault();
// hide book list
   document.querySelector('[data-list-items]').style.display = 'none'
// clear message area
   document.querySelector('[data-list-message]').innerHTML = ''
// get form data
   const formData = new FormData(event.target)
    const title1 = formData.get('title');
    const genre1 = formData.get('genre');
    const author1 = formData.get('author');
// array to store filtered books
const filteredBooks = [];
// loop through all books
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
    document.querySelector('[data-list-message]').innerText = ''
    document.querySelector('[data-list-button]').disabled = true
    document.querySelector('[data-list-message]').style.marginTop = '-125px';
   } else{
    document.querySelector('[data-list-message]').innerText = 'No results found. Your filters might be too narrow.'
    document.querySelector('[data-list-button]').disabled = true
   }
}
// display filtered books
document.querySelector('[class="list__message"]').style.display = 'block'
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
    const booklist2 = document.querySelector('[class="list__message"]')
    booklist2.append(fragment2)
        document.querySelector('[data-search-form]').reset()
        document.querySelector("[data-search-overlay]").close()
    })
/*
function dataSearchFormClick(event) { // add function keyword and function name
    event.preventDefault(); // add event argument and fix preventDefault method call
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const booksList = []; // declare booksList array
    let result = [];

    // fixed for loop
    for (let i=0; i<booksList.length; i++) {
        const book = booksList[i]; // declare book variable
        const titleMatch = filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase()); // use comparison operator, fix includes method call, and fix conditional operator
        const authorMatch = filters.author === 'any' || book.authors === filters.authors;
        let genreMatch = true; // declare genreMatch and set it to true
        if (filters.genre !== 'any') { // if filters.genre is not 'any', check genreMatch
            genreMatch = false; // set genreMatch to false by default
            for (let j=0; j<book.genres.length; j++) { // use correct for loop syntax and fix book.genres property
                if (book.genres[j] === filters.genre) { // if singleGenre is equal to filters.genre, set genreMatch to true
                    genreMatch = true;
                    break; // exit loop early
                }
            }
        }
        if (titleMatch && authorMatch && genreMatch) { // check if all three conditions are true
            result.push(book);
        }
    }
    return result; // return result array
}

//added brackets
/*
if (display.length < 1 ){
data-list-message.class.add('list__message_show')
}else {data-list-message.class.remove('list__message_show')}

const dataListItem = document.querySelector('[data-list-item]');

dataListItem.innerHTML = ''
 fragment = document.createDocumentFragment()//removed const
 extracted = source.slice(range[0], range[1])//removed const
*/


