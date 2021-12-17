import http from "k6/http";
import {sleep} from "k6";

export default function getCall() {
    const response = http.get('https://reqres.in/api/users?page=2');
    console.log(response.body);
}