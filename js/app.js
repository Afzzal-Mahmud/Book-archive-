    /*
    Project Overview
    1. get the all dom element at first and store it 
    2. add event listener on button 
    3. fetch the data with fetchData arrow function
    4. pass the response data from API on to the showData arrow function
    5. hendle error for all UI data with arrow function and some validation
    6. add inner HTML to set the all book card
    7. append the data and clear input Value and textContent
    */

    /*
    Problem I face
    1. because of using arrow function I need to addEventListener vary
       bottom of the script for initialization issue;
    2. all UI information don't have valid data so need to fix this with function
    3. three function have same functionality but can't avoid code repetation
    4. checking number with if condition with isNaN() and typeOf  
     */

/* taking input field and search btn */
const inputField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-cta');
const bookContainer = document.getElementById('books-container')
const resultOption = document.getElementById('result')
let bookResultLength;

//for undefined data hendle function
const undefinedLength = (length)=>{
    if(length=== 0){
        alert('No Result Found.Give A Valid Book Name');
        return;
    }
}

//for undefined image
const hasImage = (bookObj)=>{
   /*
    1. checking the property with hasOwnProperty Mathod;
    2. take array data from book object;
    3. return the first value of array as img Id; 
    */ 

    if(bookObj.hasOwnProperty('id_librarything')){    
        const imgArray = bookObj.id_librarything;
        const img = imgArray[0]
        return img;
    }else{
        console.log('img not found')
        return 'No Img Found';
    }
}

//for undefined author name
const hasAuthorName = (bookObj)=>{
    if(bookObj.hasOwnProperty('author_name')){    
        const authorArray = bookObj.author_name;
        const author = authorArray[0]
        return author;
    }else{
        return 'Unkonwn Author Name'
    }
}
//for undefined publisher name
const hasPublisherName = (bookObj)=>{
    if(bookObj.hasOwnProperty('publisher')){    
        const publisherArray = bookObj.publisher;
        const publisher = publisherArray[0]
        return publisher;
    }else{
        return 'Publisher Name Not Fount'
    }
}

// for undefined publishe year
const hasPublisheDate = (data)=>{
    const publishData = data

    if(typeof publishData ==='number' ){
        return publishData;
    }else{
        return 'Publish Date Not Found';
    }
}
const showData =(data)=>{
    /* receive data parameter as object and convert it into an array */
    const bookArray = data.docs;
    bookResultLength= bookArray.length;
    //hendeling undefiend search name of book
    undefinedLength(bookResultLength);
 
    //set the total search result
    resultOption.innerText = bookResultLength;
    //clear all text content of preveous search
    bookContainer.textContent = ''; 

    bookArray.forEach(bookObj => {

        const {title,first_publish_year} =bookObj;
        const author = hasAuthorName(bookObj);
        const publishData =  hasPublisheDate(first_publish_year);
        const imgSrcCode = hasImage(bookObj)
        const publisherName = hasPublisherName(bookObj);

        const col = document.createElement('div');
              col.classList.add('col');
              col.innerHTML=`
              <div class="card h-100">
              <img src="https://covers.openlibrary.org/b/id/${imgSrcCode}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${title}</h5>
                    <h6 class="card-title fw-bold pb-3">Author Name : ${author}</h6>
                    <h6 class="card-title "><span class="fw-bold">Publisher : </span>${publisherName}</h6>
                    <h6 class="card-title "><span class="fw-bold">First Publish year :</span> ${publishData}</h6>
                </div>
              <div class="card-footer">
                  <div class="btn w-100 btn-info">Buy Now</div>
              </div>
            </div>
          `
        bookContainer.appendChild(col);        
    });
    // console.log('all book',bookArray);
}
const fetchData = ()=>{
    const inputValue = inputField.value;
    //validate for empty input field
    if(inputValue===''){
            alert('input field cannot be empty.type a book name');
            return;
    }
    //featching data from api
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
    .then(res => res.json())
    .then(data => showData(data))

    //clear the input field value;
    inputField.value = ''; 
}
//add event listener to btn
searchBtn.addEventListener('click',fetchData);

