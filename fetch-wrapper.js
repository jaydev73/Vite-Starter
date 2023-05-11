export default class Fetchwrapper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    get(endpoint){
        return fetch(this.baseURL + endpoint)
        .then(response => response.json());
    }
}