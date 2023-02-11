/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=0ad44b74f39eafde21b6d5d71ab4a9e3&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//Event listener
document.getElementById('generate').addEventListener('click', submitData);

//main function
function submitData() {
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getWeather(baseURL, zipCode, apiKey).then(res => {
        if (res.cod == 200) {
            const newData = {
                temp: res.list[0].main.temp,
                date: newDate,
                feel: feeling
            }
            postData('http://localhost:3000/add', newData);
        } else {
            alert(res.message);
        }
    });
}

//GET Route
const getWeather = async (baseURL, zipCode, apiKey) => {

    const res = await fetch(baseURL + zipCode + apiKey)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        alert(error);
    }
}

const getData = async (url) => {

    const response = await fetch(url);

    try {
        // Transform into JSON
        const allData = await response.json()

        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML = allData.date;

    } catch (error) {
        alert(error);
    }
}

//POST Route
const postData = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        response.json().then(() => getData('http://localhost:3000/get'));
    } catch (error) {
        alert(error);
    }
}