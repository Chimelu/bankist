'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2023-09-25T21:31:17.178Z',
    '2023-09-25T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatcur =function(value, locale, currency){
  return new Intl.NumberFormat(locale , {
    style: 'currency',
    currency: currency,
  }).format(value)
}

const formatMovementsDate = function(date,locale){
  const calcDaysPassed  = (date1, date2)=> Math.round( Math.abs(date2-date1)/(1000 * 60 * 60 *24))
  const daysPassed = calcDaysPassed(new Date(),date)
  if (daysPassed === 0) return 'Today'
  if (daysPassed === 1) return 'Yesterday'
  if (daysPassed <=7) return `${daysPassed} days ago`
  // else{
    
  //   const day = date.getDate()
  //   const month = date.getMonth()
  //   const year =date.getFullYear()
  //   return`${day}/${month}/${year}`
  // }
  return new Intl.DateTimeFormat(locale).format(date)

}

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i])
    
   

   const displayDate= formatMovementsDate(date, acc.locale)
   const formattedMov = formatcur(mov, acc.locale, acc.currency)


    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
       <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  
  labelBalance.textContent = formatcur(acc.balance, acc.locale, acc.currency)
  ;
  
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatcur(incomes, acc.locale, acc.currency)

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatcur(Math.abs(out), acc.locale, acc.currency)


  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatcur(interest, acc.locale, acc.currency)
  ;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};
const startLogOut = function(){
  const tick = function(){
  

    const min = String( Math.trunc( time / 60)).padStart(2,0)
    const sec =String( time % 60).padStart(2,0)
    labelTimer.textContent = `${min}:${sec}`

    

    if(time===0){
      clearInterval(timer)
      labelWelcome.textContent= 'log in to get started'
      containerApp.style.opacity = 0
    }

    time--

  
 
  } 
  let time =30
   
 tick()
 const timer = setInterval(tick, 1000)  
 return timer
}




///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// const now = newDate()
// const day = now.getDate()
// const month = now.getMonth()
// const year =now.getFullYear()
// const hour = now.getHours()
// const min= now.getMinutes()
// labelDate.textContent= `${day}/${month}/${year}, ${hour}:${min}`


btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date()
    // const day = now.getDate()
    // const month = now.getMonth()
   
    //  const year =now.getFullYear()
    //  const hour = now.getHours()
    //  const min= now.getMinutes()
    //  labelDate.textContent= `${day}/${month}/${year}, ${hour}:${min}`
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day :'numeric',
      month: 'numeric',
      year:'numeric',
      weekday:'long',
    }
    
    
    const locale = navigator.language
    console.log(locale);
    labelDate.textContent= new Intl.DateTimeFormat(currentAccount.locale, options).format(now)
    

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    if (timer) clearInterval(timer)
    timer = startLogOut()

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add the transfer date

    currentAccount.movementsDates.push(new Date())
    receiverAcc.movementsDates.push(new Date())

    // Update UI
    updateUI(currentAccount);

    clearInterval(timer)
    timer = startLogOut()
  }
});
//  loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date ()).toISOString


    // Update UI
    updateUI(currentAccount);

    clearInterval(timer)
    timer = startLogOut()
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

console.log(23 === 23.0);
// console.log(+'23');

// console.log(Number.parseInt('30px', 10));
console.log(Number.parseFloat('2.5rem'))

console.log(Math.sqrt(25));

const randInt = (min, max) => Math.trunc(Math.random() * (max - min) + 1) + min

console.log(randInt(10,20));

console.log(Math.ceil(23.4));
console.log(Math.floor(23.4));
console.log(Math.round(23.4));
console.log(8 % 3);

labelBalance.addEventListener('click',function(){

    [...document.querySelectorAll('.movements__row')].forEach(function(row,i){

        if(i % 2 ===0) row.style.backgroundColor = 'blue'
    })
})

const pi = 3_443
console.log(pi);

const huge =28785783847575887539388n
const small =67
console.log(huge *BigInt(small)  ) 


// const day1 =calcDaysPassed(new Date(2037,3,14), new Date(2037, 3,24) )
// console.log(day1);

// const now =new Date()
// console.log(now);
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2023, 8,21));

// const  future = new Date(2037, 10, 19, 15, 23)
// console.log(future);
// console.log(future.getFullYear());


// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day :'numeric',
//   month: 'long',
//   year:'numeric',
//   weekday:'long'
// }
// labelDate.textContent= new Intl.DateTimeFormat(locale, options).format(now)

// const locale = navigator.language
// console.log(locale);

// const num =3884764.23

// const options ={
//   style:'unit',
//   unit :'mile-per-hour'
// }

// console.log(new Intl.NumberFormat('en-US',options).format(num));


// const ingredients =['olives', 'spinach']
// const pizza= setTimeout((ing1,ing2)=> console.log(`Here is your pizza with ${ing1} and ${ing2}`),3000,...ingredients)


// if(ingredients.includes('spinach')) clearTimeout(pizza)

// setInterval(function(){
//   const now = new Date()
//   console.log(now);
// })

