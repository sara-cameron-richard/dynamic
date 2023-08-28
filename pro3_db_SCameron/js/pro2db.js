//console.info('js/pro2db.js is loaded');


async function fetchFavourites(url){
  const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    displayData(data);
}

fetchFavourites('./app/select.php');

function displayData(data){
  const display = document.querySelector('#display');
  display.innerHTML = '';

  let ul = document.createElement('ul');

  data.forEach((user)=>{
    //console.log(user);
    let li = document.createElement('li');
    li.innerHTML = `${user.name}'s favourite place to enjoy the water is ${user.favourite_place}.`;
    ul.appendChild(li);
  })
  display.appendChild(ul);
}

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', getFormData);


function getFormData(event){
  event.preventDefault();

  //get the form data & call an async function
  const insertFormData = new FormData(document.querySelector('#insert-form'));
  let url = './app/insert_v2.php';
  inserter(insertFormData, url);
}

async function inserter(data, url){
  const response = await fetch(url, {
    method: "POST",
    body: data
  });
  const confirmation = await response.json();

  console.log(confirmation);
  //call function again to refresh the page
  fetchFavourites('./app/select.php');
} 