"use strict";
// import _, { random } from "lodash";

const API_BASE_URL = 'http://numbersapi.com'

/** Calls the numbers API for a piece of trivia about a number and logs it */
async function showNumberTrivia(number) {

    const response = await fetch(`${API_BASE_URL}/${number}?json`);

    const data = await response.json();

    console.log("showNumberTrivia:", data['text'])

    return data['text'];

}

/** Maps numbers to array of promises, then  */
async function showNumberRace(numbers) {

    numbers.map(number => fetch(`${API_BASE_URL}/${number}?json`));

    const raceWinner = await Promise.race(numbers);
    const winnerResponse = await raceWinner.json();

    console.log("showNumberrace:",winnerResponse);

    return raceWinner;

}

async function showNumberAll(numbers){
  const trivia_requests = [];

  for (const number of numbers) {
    const response = await fetch(`${API_BASE_URL}/${number}?json`);

    trivia_requests.push(response);
  }

  const results = await Promise.allSettled(trivia_requests);

  let successes = [];
  let failures = [];

  for (let result of results){


    if (result.value['status'] !== 200){
      failures.push(`Request failed with status code ${result.value.status}`)
    }
    else{
      const data = await result.value.json()
      successes.push(data['text'])
    }
  }
  console.log("showNumberAll fulfulled:",successes)
  console.log("showNumberAll rejected:", failures)

  return {Success: successes, Failures: failures}
}

async function main(){
  // const random_number = _.random(1, 100)
//   let randomNumbers = Array(10) ;
//   randomNumbers.fill(random_number)
//   console.log(randomNumbers)
    let randomNumbers = [1,2,3,4,5];
    const r1 = await showNumberTrivia(randomNumbers[0]);
    const r2 = await showNumberRace(randomNumbers);
    randomNumbers.push('ads');
    const r3 = await showNumberAll(randomNumbers)


 }
