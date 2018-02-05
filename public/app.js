var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

var handleButtonClick = function () {
  var name = getInputValue('name');
  var house = getInputValue('house');
  var actor = getInputValue('actor')

  var character = {
    name: name,
    house: house,
    actor: actor
  };

  setDefinitionText('name-display', character.name);
  setDefinitionText('house-display', character.house);
  setDefinitionText('actor-display', character.actor);

  localStorage.setItem('character', character);
}


var formDropdown = function(characters){
  var select = document.querySelector('#character-dropdown')

  var optionAtTop = document.createElement('option');
  optionAtTop.innerText = "Select a character";
  optionAtTop.disabled = true;
  optionAtTop.selected = true;
  select.appendChild(optionAtTop);
  characters.forEach(function(character, index){
    var option = document.createElement('option');
    option.innerText = character.name;
    option.value = index;
    select.appendChild(option);
  })
}



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



var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var characters = JSON.parse(jsonString);
  populateList(characters);
  populateDropdown(characters);
  formDropdown(characters);
}

// var jsonString = JSON.stringify(character) // NEW
// localStorage.setItem('character', jsonString);


var app = function(){
  var url = 'http://hp-api.herokuapp.com/api/characters';
  makeRequest(url, requestComplete);

  // populateDropdown();

  var select = document.querySelector('#character-dropdown');
  select.addEventListener('change', handleOptionSelected);

  var button = document.querySelector('button');
  button.addEventListener('click', handleButtonClick);

  // var jsonString = localStorage.getItem('character');
  // var savedCharacter = JSON.parse(jsonString);
  //
  // setDefinitionText('#name-display', savedCharacter.name);
  // setDefinitionText('#house-display', savedCharacter.house);
  // setDefinitionText('#actor-display', savedCharacter.actor);
}

window.addEventListener('load', app)
