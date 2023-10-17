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

/** Takes in array of numbers
 * Maps numbers to array of promises, then wait for first promise to finish
 * display the fact associated with the first finisehd
*/
async function showNumberRace(numbers) {

    let promises = numbers.map(number => fetch(`${API_BASE_URL}/${number}?json`));


    const raceWinner = await Promise.race(promises);

    const winnerResponse = await raceWinner.json();

    console.log("showNumberrace:",winnerResponse.text);

    return raceWinner;

}

async function showNumberAll(numbers){

  let promises = numbers.map(number => fetch(`${API_BASE_URL}/${number}?json`));

  const results = await Promise.allSettled(promises);

  const successPromises = results
    .filter(r => r.status === "fulfilled" && r.value.ok === true)
    .map(response => response.value.json())

  const successes = await Promise.all(successPromises)

  const facts = successes.map(fact => fact.text)

  const failures = results
    .filter(r => r.status === "fulfilled" && r.value.ok === false)
    .map(promise => promise.value)


  console.log("showNumberAll fulfulled:", facts)
  console.log("showNumberAll rejected:", failures)

  return {Success: successes, Failures: failures}
}

async function conductor(){
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
