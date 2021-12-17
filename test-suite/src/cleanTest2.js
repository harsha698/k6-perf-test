import {createUsers, delUser, listUsers, singleUserNotFound} from './httpClient.js';
import {fail} from "k6";
import {vu, scenario} from 'k6/execution'

export const options = {
    scenarios: {
        list_users: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '1s', target: 10},
                {duration: '3s', target: 10},
                {duration: '10s', target: 0}
            ],
            gracefulRampDown: '10s',
            exec: 'listingUsers',
            env: {USER_TYPE: 'reqres'}
        },
        user_not_found: {
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                {duration: '1s', target: 10},
                {duration: '3s', target: 10},
                {duration: '10s', target: 0}
            ],
            gracefulRampDown: '10s',
            exec: 'userNotFound'
        },
        create_user: {
            executor: 'shared-iterations',
            vus: 3,
            iterations: 6,
            maxDuration: '100s',
            exec: 'creatingUsers'
        },
        delete_user: {
            executor: 'shared-iterations',
            vus: 2,
            iterations: 4,
            maxDuration: '100s',
            exec: 'deleteUser'
        }
    },
    discardResponseBodies: true,
    thresholds: {
        // all checks should succeed
        checks: ['rate>=1'],
        // All trends
        list_user_trend: ['p(95) < 200'], //by default unit is ms
        user_not_found_trend: ['p(95) < 300'],
        create_user_trend: ['p(95) < 200'],
        delete_user_trend: ['p(95) < 1000'],
        //All Counters
        create_users: [`count===6`],
        delete_user: [`count===20`]
    }
}

export function listingUsers() {
    if (__ENV.USER_TYPE != 'reqres') {
        fail('user not authorised')
    } else {
        listUsers();
    }
}

export function userNotFound() {
    singleUserNotFound();
}

export function creatingUsers() {
    console.log(`vu is ${vu.idInTest}`);
    console.log(`iteration is ${scenario.iterationInTest}`);
    createUsers(scenario.iterationInTest+1);
}

export function deleteUser() {
    delUser();
}

