"use strict";

const API_BASE_URL = 'http://numbersapi.com'

/** Calls the numbers API for a piece of trivia about a number and logs it */
async function showNumberTrivia(number) {

    const response = await fetch(`${API_BASE_URL}/${number}?json`);

    const data = await response.json();

    return data['text'];

}

async function showNumberRace(numbers) {

    const trivia_requests = [];

    for (const number of numbers) {
      trivia_requests.push(showNumberTrivia(number));
    }

    const raceWinner = await Promise.race(trivia_requests);
    console.log("Winner! :",raceWinner);
    return raceWinner


}