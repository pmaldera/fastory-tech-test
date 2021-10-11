import { redirectTo } from "@reach/router";
import { store } from "../../app/store";

function isUserLoggedIn() {
    // This is poor safety, we check with an endpoint and cand be redirected by server.
    return store.getState().user.status === "logged";
}

export function redirectIfNotLoggedIn() {
    if(!isUserLoggedIn()) {
        redirectTo('login');
    }
}