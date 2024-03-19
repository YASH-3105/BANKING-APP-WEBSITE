'use strict';

/////////////////////////////////////////////////
// /////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovement = function (movements, sort = false) {
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    containerMovements.innerHTML = '';
    movs.forEach((movement, idx) => {
        const type = movement > 0 ? 'deposit' : 'withdrawal';
        const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${idx + 1} ${type}</div>
          <div class="movements__value">${movement}💶</div>
    </div>
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovement(account1.movements);

const calcDisplayMovements = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} 💶`;
}
// calcDisplayMovements(account1.movements);



const calcDisplaySummary = function (movements) {
    const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => mov + acc, 0);
    labelSumIn.textContent = `${incomes}💶`;

    const outgoing = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + Math.abs(mov), 0);
    labelSumOut.textContent = `${outgoing}💶`;

    const interest = movements.filter(mov => mov > 0).map(dep => dep * 1.2 / 100).filter(int => int >= 1).reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}💶`;
};
const updateUI = function (acc) {
    calcDisplayMovements(acc);
    calcDisplaySummary(acc.movements);
    displayMovement(acc.movements);
};
// calcDisplaySummary(account1.movements);
const createUserNames = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner.toLowerCase().split(' ').map((name) => name[0]).join('');
    });
};
createUserNames(accounts);
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    // console.log(currentAccount);
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Display UI and welcome message 
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // clear fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        updateUI(currentAccount);
    }
});
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(receiverAcc);
    inputTransferTo.value = inputTransferAmount.value = '';
    if (amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username) {
        // console.log('Transfer valid');
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // update UI
        updateUI(currentAccount);

    }
});
btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    // inputCloseUsername, inputClosePin
    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        accounts.splice(index, 1);

        // hide UI
        containerApp.style.opacity = 0;
        inputCloseUsername.value = inputClosePin.value = '';
    }
})
btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
        currentAccount.movements.push(amount);

        // update UI
        updateUI(currentAccount);
        inputLoanAmount.value = '';
    }
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovement(currentAccount.movements, !sorted);
    sorted = !sorted;
})

const overallBal = accounts.map(acc => acc.movements).flat().reduce((acc, mov) => acc + mov, 0);
console.log(overallBal);

const overallBal2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);
console.log(overallBal2);




// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (el, key, map) {
//   console.log(`${key}:${el}`);
// });

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const arr = [1, 2, 3];
// console.log(arr.at(-1));
// movements.forEach(function (m1, i, arr) {
//   if (m1 > 0) {
//     console.log(`Movement ${i + 1}:You deposited ${m1} amount.`);
//   } else {
//     console.log(`Movement ${i + 1}; You withdraw ${Math.abs(m1)} amount.`);
//   }
// });

// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const julia = [3, 5, 2, 12, 7];
// const kate = [4, 1, 15, 8, 3];
// const checkDogs = function (julia, kate) {
//   let juliaCopy = [...julia];
//   juliaCopy = juliaCopy.slice(1, -2);
//   const concatenated = juliaCopy.concat(kate);
//   concatenated.forEach((ele, idx) => {
//     if (ele > 3) {
//       console.log(`Dog number ${idx + 1} is an adult, and is ${ele} years old.`);
//     } else {
//       console.log(`Dog number ${idx + 1} is still a puppy 🐶`);
//     }
//   });
// }
// checkDogs(julia, kate);
// const euroToUSD = 1.1;
// const movementUSD = movements.map(function (mov) {
//   return mov * euroToUSD;
// });
// console.log(movementUSD);

// for (const mov of movementUSD) console.log(mov);

// const user = 'Steven Thomas Williams';
// 

// const withdrawal = movements.filter(function (mov) {
//     return mov < 0;
// });
// console.log(withdrawal);
// const balance = movements.reduce(function (acc, curr, idx, arr) {
//     console.log(`iteration ${idx}: ${acc}`);
//     return acc + curr;
// }, 0);
// console.log(balance);
// const max = movements.reduce((acc, mov) => { if (acc > mov) return acc; else return mov; }, movements[0]);
// console.log(max);

// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const dogAges = [5, 2, 4, 1, 15, 8, 3];
// const calcAverageHumanAge = function (dogAges) {
//     const humanAges = dogAges.map(function (age) {
//         if (age <= 2) {
//             return 2 * age;
//         } else {
//             return 16 + age * 4;
//         }
//     });
//     const humanAgesFilter = humanAges.filter((hage) => hage >= 18);
//     const humanAgeMean = humanAgesFilter.reduce((acc, age) => acc + age, 0) / humanAgesFilter.length;
//     return humanAgeMean;
// };
// console.log(calcAverageHumanAge(dogAges));

// const euroToUSD = 1.1;
//Pipeline
// const totalDeposit = movements.filter(mov => mov > 0).map(mov => euroToUSD * mov).reduce((acc, mov) => acc + mov, 0);
// console.log(totalDeposit);
// const dogAges1 = [5, 2, 4, 1, 15, 8, 3];
// const dogAges2 = [16, 6, 10, 5, 6, 1, 4];
// const calcAverageHumanAge = function (dogAges) {
//     const avgHumanAge = dogAges.map(age => { if (age <= 2) return 2 * age; else return 16 + age * 4; }).filter(hAge => hAge >= 18).reduce((acc, age, idx, arr) => (acc + age / arr.length), 0);
//     return avgHumanAge;
// };
// console.log(calcAverageHumanAge(dogAges1));
// console.log(calcAverageHumanAge(dogAges2));

// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);

// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);
// console.log(movements);
// Equality
// console.log(movements.includes(1300));

// Condition
// const anyDeposit = movements.some(mov => mov > 3000);
// console.log(anyDeposit);

// Every method
// console.log(movements);
// console.log(account4.movements.every(mov => mov > 0));

// const arr = [[1, 2, 3], [7, 8, 9]];
// console.log(arr);
// console.log(arr.flat());

// const arrDeep = [[[1, 2, 3], 4], [6, [7, 8]]];
// console.log(arrDeep);
// console.log(arrDeep.flat());

// const nameFriends = ['John', 'Tumul', 'Alok', 'Zach'];
// console.log(nameFriends.sort());
// console.log(nameFriends);

// const numEx = [12, -3567, 450, 23, -12, 230];
// console.log(numEx.sort());

// A,B (keep order) return < 0
// B, A (switch order) return > 0
// numEx.sort((a, b) => a - b);
// console.log(numEx);

// numEx.sort((a, b) => b - a);
// console.log(numEx);