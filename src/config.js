const API_BASE_URL = 'http://xgain.iccs.gr:8000';
const API3_BASE_URL = process.env.REACT_APP_API3_BASE_URL;
const API1_BASE_URL = process.env.REACT_APP_API1_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL); // For debugging
console.log("API3_BASE_URL:", API3_BASE_URL);
console.log("API1_BASE_URL:", API1_BASE_URL);

export { API_BASE_URL, API3_BASE_URL, API1_BASE_URL };