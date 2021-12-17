import http from "k6/http";

export default function delCall() {
    const url = 'https://httpbin.test.k6.io/delete';
    const body = null;
    const param = {
        headers: {'X-MyHeader': 'k6test'}
    }
    http.del(url, body, param);
}