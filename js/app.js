/* taking input field and search btn */
const inputField = document.getElementById('search-input');
const searchBtn = document.getElementById('search-cta');
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
      
    
    console.log('this is from 9 line',bookResultLength)
    
    bookArray.forEach(bookObj => {
        // console.log(bookObj)
        const {title,first_publish_year} =bookObj;
        const author = hasAuthorName(bookObj);
        const publishData =  hasPublisheDate(first_publish_year);
        // console.log(publishData,title);

        const imgSrcCode = hasImage(bookObj)
        console.log(imgSrcCode);
        
    });
    // console.log('all book',bookArray);
}
const fetchData = ()=>{
    const inputValue = inputField.value;
    if(inputValue===''){
            alert('input field cannot be empty');
            return;
    }
    fetch(`https://openlibrary.org/search.json?q=${inputValue}`)
    .then(res => res.json())
    .then(data => showData(data))
    console.log(inputValue)
}
searchBtn.addEventListener('click',fetchData);

