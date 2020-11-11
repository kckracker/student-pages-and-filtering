/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
Creating function which accepts array of data and dynamically adds HTML elements based on objects found in the array
Data will be broken up into pages, reflected in the second argument accepted by the function.
Setting page to display only 9 total student blocks per page
*/
function showPage(list, page) {
   // Storing the index of page numbers in variables for startIndex and endIndex
   const startIndex = (page * 9) - 9;
   const endIndex = (page * 9);
   // Storing the location of ul with class student-list in variable named studentData
   const studentList = document.querySelector('.student-list');
   // Emptying innerHTML of ul with class student-list to ensure no students currently displayed
   studentList.innerHTML = '';
   // Looping through list argument to obtain data and adding HTML elements for each student listing for every iteration  of i
   for (let i = 0; i < list.length; i++) {
      if ( i >= startIndex && i < endIndex) {
         // basic structure of additional HTML elements referenced from instructions given at https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
         studentList.innerHTML += `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
           <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${list[i].registered.date}</span>
         </div>
       </li>  
         `;
      }
   }
}


/*
Creating new function to insert page buttons at the bottom of page for navigation through student data set
*/
function addPagination(list) {
   // Creating variable to store total number of pages by dividing list argument total by number of students and giving the Math ceiling
   const buttonTotal = Math.ceil(list.length / 9);
   // Creating vatiable to reference ul element with class link-list which will hold page buttons
   let pageNumber = document.querySelector('.link-list');
   // Clearing innerHTML of ul element to ensure no buttons are currently showing
   pageNumber.innerHTML = '';
   // Looping through the buttonTotal variable and updating innerHTML of pageNumber variable to insert page buttons upon each iteration
   for (let i = 0; i < buttonTotal.valueOf() ; i++){
      // basic structure of additional HTML elements referenced from instructions given at https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
      pageNumber.innerHTML += `
         <li>
            <button type:"button">${i + 1}</button>
         </li>
      `;
   }
   // Selecting first button and applying active class for default page listing
   let firstButton = document.querySelector('ul.link-list li:first-child button');
   firstButton.className = 'active';
   // Setting variable to store all buttons inside pageNumber ul element
   const buttons = pageNumber.querySelectorAll('button');
   // Adding click event listener to buttons in the pageNumber ul element
   pageNumber.addEventListener('click', (e) => {
      // Looping through the buttons under pageNumber and removing all 'active' classes upon clicking to ensure only one button is active at a time
      for (let i = 0; i < buttons.length; i++){
         buttons[i].classList.remove('active');
      }
      // Creating variable to store active button as the target of the user click
      let activeButton = e.target;
      // Setting active classList to user clicked button
      activeButton.classList.add('active');
      // Storing page number value in variable based on the activeButton clicked by user
      let pageDisplayed = activeButton.textContent;
      // Calling showPage function and passing arguments data for list of values and activeButton for page number
      showPage(list, pageDisplayed);
   });
}

// Creating new element named searchBar
const searchBar = document.createElement('span');
// Placing innerHTML to define searchbar contents in HTML. Basing text bar on recommended text found at 
searchBar.innerHTML = `
   <label for="search" class="student-search">
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;
// Creating variable to store header element inside HTML
const heading = document.querySelector('.header');
// Appending newly created searchBar element as a child of the header 
heading.appendChild(searchBar);
// Storing search button in variable to reference in click eventListener
const searchButton = heading.querySelector('.student-search button');
let searchInput = document.querySelector('input#search');
// Looping through data set stored in data variable to obtain set of names to compare with search input
   // Adding event listener to the input field to away keystrokes
searchInput.addEventListener('keyup', () => {
   // Storing search input in a variable
   let searchText = '';
   // Creating empty array
   let matchingNames = [];
   // Adding value of input to the searchText variable
   searchText = searchInput.value;
   // Looping through data set stored in data variable to obtain set of names to compare with search input
   for ( let i = 0; i < data.length; i++){
      let studentNames = data[i];
      // Adding variables to store all object name properties
      let firstNames = studentNames.name.first;
      let lastNames = studentNames.name.last;
      let titleNames = studentNames.name.title;
      // Placing if statement to check if the stored name variables include the search input text
      if (firstNames.toLowerCase().includes(searchText.toLowerCase()) || lastNames.toLowerCase().includes(searchText.toLowerCase()) || titleNames.toLowerCase().includes(searchText.toLowerCase())){
         // Pushing data object info to empty array where the search discovered a match with name variables
         matchingNames.push(data[i]);
         } 
   }
      // Calling previous functions with newly formed list matchingNames
      showPage(matchingNames, 1);
      addPagination(matchingNames);
});

// Creating additional eventListener to check searched input around the click event on the search button
searchButton.addEventListener('click', () => {
   // Storing search input in a variable
   let searchText = '';
   // Creating empty array
   let matchingNames = [];
   // Adding value of input to the searchText variable
   searchText = searchInput.value;
   // Looping through data set stored in data variable to obtain set of names to compare with search input
   for ( let i = 0; i < data.length; i++){
      let studentNames = data[i];
      // Adding variables to store all object name properties
      let firstNames = studentNames.name.first;
      let lastNames = studentNames.name.last;
      let titleNames = studentNames.name.title;
      // Placing if statement to check if the stored name variables include the search input text
      if (firstNames.toLowerCase().includes(searchText.toLowerCase()) || lastNames.toLowerCase().includes(searchText.toLowerCase()) || titleNames.toLowerCase().includes(searchText.toLowerCase())){
         matchingNames.push(data[i]);
      } 
   }
   // Calling previous functions with newly formed list matchingNames
   showPage(matchingNames, 1);
   addPagination(matchingNames);
});



// Calling functions and showing page 1 as the default. The addPagination function incorporates the first function to feed it new page arguments based on user clicks
showPage(data, 1);
addPagination(data);