import api from './api.js';

export function getAjax(url) {
    console.log(url)
    return fetch(url, { 
        method: 'GET',
        headers: api.HEADERS
    })
    .then( res => res.ok? res.json(): Promise.reject(res))
    .catch( err => {
        let message = err.statusText || 'An error occurs accessing to the API';
        document.getElementById('root').innerHTML = `
            <div class="error">
                <p>Error ${err.status}: ${message}</p>
            </div>
        `;
        console.error(err);
    });
}
