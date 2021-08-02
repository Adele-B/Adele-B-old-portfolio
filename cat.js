const getRandomNumber = (max) => Math.floor(Math.random() * max)

const name1 = ["Lil'",  "Mr", "Miss", "Mrs", "Colonel", "Professor", "Mayor", "Madame"]
const name2 = ["Cuddle", "Candy", "Sugar", "Stink", "Scaredy", "Noisy", "Mammoth", "Beefcake"]
const name3 = ["Butt", "Monster", "Bear", "Muffin", "Kittlesworth", "Devil", "Con queso", "Toes"]


const getRandomName = () => `${name1[getRandomNumber(name1.length)]} ${name2[getRandomNumber(name2.length)]} ${name3[getRandomNumber(name3.length)]}`;

const setRandomName = () => {
    document.getElementById('random-name').innerText = getRandomName();
} 

document.getElementById('name')
.addEventListener('click', setRandomName);

setRandomName();