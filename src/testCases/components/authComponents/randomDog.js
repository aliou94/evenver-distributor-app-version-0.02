import * as React from 'react';


export const randomDog = () => {
    const breeds = ["samoyed", "husky", "chow", "shiba", "pembroke"]
    return breeds[Math.floor(Math.random() * breeds.length)]
}