console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}

function getAllChars() {
  axios.get("http://localhost:4000/characters")
    .then( res =>{
      clearCharacters();
      console.log(res.data)
      for(let char of res.data){
        createCharacterCard(char)
      }
    } )
    .catch(err => console.log(err));
}

getAllBtn.addEventListener("click", getAllChars)

///////////////////////////////////////////////////////////////////////////////

function getSingleChar (e) {
  let name = e.target.id;
  axios.get(`http://localhost:4000/character/${name}`)
    .then(res => {
      clearCharacters()
      console.log(res.data)
      let newChar = res.data
      createCharacterCard(newChar)
    })
    .catch(error => console.log(error));
}

for (let btn of charBtns){
  btn.addEventListener('click', getSingleChar)
}


///////////////////////////////////////////////////////////////////////////////

function getOldChars (e) {
  e.preventDefault();
  let age = ageInput.value
  axios.get(`http://localhost:4000/character/?age=${age}`)
    .then(res => {
      clearCharacters()
      console.log(res.data)
      for(let char of res.data){
        createCharacterCard(char)
      }
    })
    .catch(err => console.log(err));
  }
ageForm.addEventListener("submit", getOldChars)

///////////////////////////////////////////////////////////////////////////////
function createNewChar(e){
  e.preventDefault();

  let newLikes = newLikesText.value.split(",");

  let body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: +newAgeInput.value,
    likes: newLikes
  }

  axios.post("http://localhost:4000/character", body)
    .then(res =>{
      clearCharacters();
      console.log(res.data)
      for(let char of res.data){
        createCharacterCard(char)
      }
    })
    .catch(err => console.log(err));

  newFirstInput.value = ""
  newLastInput.value = ""
  newGenderDropDown.value = "female"
  newAgeInput.value = ""
  newLikesText.value = ""

}

createForm.addEventListener('submit', createNewChar)