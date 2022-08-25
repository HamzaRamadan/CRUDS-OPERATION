let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let key ;


console.log(title,price,taxes,ads);

//get total

function getTolat() {

    if(price.value != ''){
        let result= (+price.value+ +taxes.value+ +ads.value)- +discount.value;

        total.innerHTML = result;
        total.style.background = '#09c';
    }else{
        total.innerHTML= '';
        total.style.background = '#a00d02';

    }
    
}

// create product
let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse( localStorage.product )
}else {
    dataPro = [];

}

submit.onclick = function () {
    let newpro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }

// count  انشاء العديد  من ال  بضغه واحدهproduct 
    
    if(title.value != ''&&price.value != ''
    && category.value != '' && newpro.count < 100 ){

            if(mood==='create'){
            if (newpro.count > 1) {
            for (let i = 0; i < newpro.count; i++) {
                dataPro.push(newpro);
            }
            } else {
            dataPro.push(newpro);
                
            }
        }else{
            dataPro[key]= newpro;
            mood= 'create';
            submit.innerHTML='create';
            count.style.display = 'block'
        }

         clearData();

    }
 

    // localStorage

    localStorage.setItem('product' ,   JSON.stringify(dataPro)        );
    console.log(dataPro);
    showData();

}
  
// clear form
function clearData(){

    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = ''
    
}

// display data 
function showData() {

    getTolat();

    let table ='';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i}) "  id="update">update</button></td>
            <td><button onclick="deletePro(${i}) " id="delete">delete</button></td>
        </tr>
        
        `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0){
        btnDelete.innerHTML = `
        <button onclick="deleteAll() " >DeleteAll (${dataPro.length})</button>
        `
    }else{
        btnDelete.innerHTML = '';
    }

}
showData();

// delete data

function deletePro(i) {
    dataPro.splice(i,1);

    localStorage.product = JSON.stringify(dataPro);

    showData();

}
// delete All data


function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
    
}
// Update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTolat();
    count.style.display = 'none'
    category.value = dataPro[i].category;
    submit.innerHTML = 'Update';
    mood= 'update';
    key = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// serch
let searchMode = 'title';

function getSearchMode(id){
    let search = document.getElementById('search');
    if(id=='searchTitle'){
         searchMode = 'title';

    }else{
        searchMode = 'category';
    }
    search.placeholder = 'Search By '+searchMode;
    search.focus()
    search.value = '';
    showData()
    
    // console.log(searchMode);
}

function searchData(value){
    let table = '';
    if(searchMode =='title'){

        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i}) "  id="update">update</button></td>
                    <td><button onclick="deletePro(${i}) " id="delete">delete</button></td>
                </tr>
                
                `;
            }
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i}) "  id="update">update</button></td>
                    <td><button onclick="deletePro(${i}) " id="delete">delete</button></td>
                </tr>
                
                `;


            }
        }
    }

    document.getElementById('tbody').innerHTML = table;

}