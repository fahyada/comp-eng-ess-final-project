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
    const topRanks  = await fetch(`${BACKEND_URL}/users/topRank`).then((r) => r.json());
    return topRanks;
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
    const counters = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return counters;
}

