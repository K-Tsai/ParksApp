'use strict';

const apiKey = 'yF2XmG1LeNRy0gknRTzi3BWyut7DS0ofl3oYjLFC';
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    console.log(queryItems);
    console.log(queryItems.join('&'));
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h1>${responseJson.data[i].fullName}</h1>
            <p>${responseJson.data[i].description}</p>
            <p>${responseJson.data[i].url}</p>
            </li>`
        )};
    $('#results').removeClass('hidden');
}

function getParks(searchTerm, maxResults) {
    const params = {
        api_key: apiKey,
        stateCode: searchTerm,
        limit: maxResults - 1,
    };
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });

}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val().split(', ');
        console.log(searchTerm);
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);