

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {



        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr class = "name" >
                                <td class = "data"  >${book.name}</td>
                                <td>${book.author}</td>
                                <td>${book.type}</td>
                            </tr>`;
        tableBody.innerHTML += uiString;
        
      
    }





    refresh() {
        let booknum = JSON.parse(localStorage.getItem("array"));
        console.log(booknum);
        if (booknum) {
            for (let i = 0; i < booknum.length; i++) {
                let bookitem = booknum[i];
                console.log(bookitem);
                let tableBody = document.getElementById('tableBody');
                let uiString = `<tr class = "name" >
                            <td class = "data" >${bookitem.name}</td>
                            <td>${bookitem.author}</td>
                            <td>${bookitem.type}</td>
                        </tr>`;
                tableBody.innerHTML += uiString;


            }

        }
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);

    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);
let display = new Display();
let bookList = JSON.parse(localStorage.getItem("array"));

if(!bookList){
    bookList = [];
}

display.refresh();


function libraryFormSubmit(e) {
    console.log('YOu have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
   
    let book = new Book(name, author, type);
   
    
    bookList.push(book);
    console.log(bookList)
    localStorage.setItem("array", JSON.stringify(bookList));



    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}


let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input",function(){
    let name = document.getElementsByClassName("name");
        
        Array.from(name).forEach(function(element){
            let searchcontent = document.getElementById("searchTxt").value;
            let text = element.getElementsByClassName("data")[0].innerHTML;
            console.log(element);
            if(text.includes(searchcontent) == true){
                element.removeAttribute("style");
            }
            else{
                element.style.display = "none"
            }
        })
        
    
})