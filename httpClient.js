/*
* GET
* List Users
* Single User not found
* Delayed response
* POST
* Create user
* Register a user
* Unregister a user
* PUT
* Update user
* DELETE
* Remove a user
* */
import {makeGetCall, checkStatusCode, makePostCall, makeDelCall} from './httpHelper.js'
import {getUserInfo} from './test-data/createUser.js'
import {check} from "k6";
import {Counter, Trend} from "k6/metrics";

const userIdsToDelete = JSON.parse(open('./test-data/deleteUser.json'));

const list_user = new Counter('listing_users');
const user_not_found = new Counter('single_user_not_found');
const create_users = new Counter('create_users');
const delete_user = new Counter('delete_user');

const listUserTrend = new Trend('list_user_trend');
const userNotFoundTrend = new Trend('user_not_found_trend');
const createUserTrend = new Trend('create_user_trend');
const deleteUserTrend = new Trend('delete_user_trend');

export function listUsers() {
    const response = makeGetCall('https://reqres.in/api/users/2');
    checkStatusCode(response);
    list_user.add(1);
    listUserTrend.add(response.timings.duration);
}

export function singleUserNotFound() {
    const url = 'https://reqres.in/api/users/23';
    const response = makeGetCall(url);
    user_not_found.add(1);
    userNotFoundTrend.add(response.timings.duration);
    check(response, {
        'status-code': res => res.status === 404
    })
}

export function createUsers(i) {
    const url = 'https://reqres.in/api/users';
    const body = JSON.stringify(getUserInfo(i))
    const response = makePostCall(url, body, null);
    create_users.add(1);
    createUserTrend.add(response.timings.duration);
}

export function delUser() {
    let url;
    userIdsToDelete.ids.forEach(id=>{
        url = `https://reqres.in/api/users/${id}`;
        const response = makeDelCall(url, null);
        delete_user.add(1);
        deleteUserTrend.add(response.timings.duration);
    })
}



