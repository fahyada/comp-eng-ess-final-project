import { BACKEND_URL } from "./config.js";


export async function createUser(user){
    await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

export async function getUser(id){
    const user = await fetch(`${BACKEND_URL}/users/${id}`).then((r) => r.json());
    return user;
}

export async function getTopRank(){
    const topRank  = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return topRank;
}

export async function getUserRank(){
    const userRank  = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return userRank;
}

export async function getUserBestScore(){
    const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return user;
}

export async function getNewUserId(){
    const counter = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return counter;
}

