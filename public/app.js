var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

// var getImage = function(character){
//   var img = document.createElement('img');
//   img.src = character.image;
//   img.width = "200";
//   return img;
// }

var populateList = function(characters){
  var ul = document.querySelector('#character-list');

  characters.forEach(function(character){
    var img = document.createElement('img');
    var li = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li')
    li.innerText = `Name: ${character.name}`
    li2.innerText = `House: ${character.house}`
    li3.innerText = `Actor: ${character.actor}`
    img.width = 200;
    img.src = character.image;
    ul.appendChild(img);
    ul.appendChild(li);
    ul.appendChild(li2);
    ul.appendChild(li3);
  });
}

// var populatelist = function(characters){
//   var ul = document.querySelector('#character-list');
//
//   characters.forEach(function(character){
//     var li = document.createElement('li');
//     var name = document.createElement('p');
//     title.innerText = character.name;
//     var house = document.createElement('p');
//     year.innerText = character.house;
//     var img = document.createElement('img');
//     img.src = character.image;
//     img.width = 200;
//     // console.log(movie.Title);
//     li.appendChild(name);
//     li.appendChild(house);
//     li.appendChild(img);
//     ul.appendChild(li);
//   })
// }


var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var characters = JSON.parse(jsonString); //NEW
  populateList(characters);
}


var app = function(){
  var url = 'http://hp-api.herokuapp.com/api/characters';
  makeRequest(url, requestComplete);

  var select = document.querySelector('select');
  select.addEventListener('change', handleSelectChange)

}

window.addEventListener('load', app)
