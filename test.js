let num = 23523.325;
let str = 'asdasvbcdgbouefknv';
let bool = false;
let nothing; //undefined
let empty = null;
//let s = Symbol();

let person = {
    name: 'Misha',
    age: 20,
    education: {
        school: 22,
        university: 'BSU',
    },
};

console.log(person); // outputs whole object to console

function count(a, b, c) {
    return a + b + c;
}

//const count = (a, b, c) => a + b + c;

console.log(count(1, 2, '3'))

let arr = [1, 2, 3];

const students = arr.map((n) => {
    return {
        name: n,
        age: n + 3,
    };
})

new_str = str.toLowerCase(); // str does not change

console.log('${str} ${num}');

console.log(!!'asds');

2 == '2'; //true
2 === '2'; // false

/*Task:
    {} + [] === [] + {} // false
*/

function createLikeCounter() {
    const names = [
        'Misha',
        'Vlad',
    ];
    //names.push('Smb'); //works fine, we are changing the values
    //names = []; //does not work, we are changing the reference
    return {
        like: function(person) {
            names.push(person.name);
        },
        getAmount: function() {
            return names.length;
        },
        getNames: () => names,
    };
}

const post1 = createLikeCounter();
console.log(post1.getAmount());

function temp() {
    var a = 1;  //всплытие переменных?
    let b = 2;  //variable hoisting
    const c = 3;
}

console.log(typeof arr) //object