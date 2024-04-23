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
    const user = await fetch(`${BACKEND_URL}/users/userId/${id}`).then((r) => r.json());
    return user;
}

export async function getTopRank(){
    const topRanks  = await fetch(`${BACKEND_URL}/users/topRank`).then((r) => r.json());
    return topRanks;
}

export async function getUserRank(id){
    const data = await fetch(`${BACKEND_URL}/users/userRank/${id}`)
        .then((r) => r.json());
    return data;
}

export async function getUserBestScore(user){
    try {
        const response = await fetch(`${BACKEND_URL}/users/bestScore`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error("Failed to update user score");
        }

        const data = await response.json();
        return data.score;
    } catch (error) {
        console.error(error);
        return null;
    }
    // const user = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    // return user;
}

export async function getNewUserId(){
    const counters = await fetch(`${BACKEND_URL}/users`).then((r) => r.json());
    return counters;
}

export async function getAllUser(){
    const users  = await fetch(`${BACKEND_URL}/users/allUser`).then((r) => r.json());
    return users;
}

export async function updateScore(id, newScore){
    await fetch(`${BACKEND_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          score: newScore,
        }),
    });
}


