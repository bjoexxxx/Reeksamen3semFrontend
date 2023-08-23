import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initViewAlbums(){
    getAlbums()
}

async function getAlbums() {
    const options = makeOptions("GET", "", false);

    try {
        const response = await fetch("http://localhost:8080/api/album", options).
        then(handleHttpErrors)
        makeHTML(response);
    } catch (error) {
        console.log(error);
    }
}


function makeHTML(albums) {
    const content = document.getElementById("albumList");

    const header = `
        <thead>
            <tr>
                <th>Artist</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Availability</th>
            </tr>
        </thead>
    `;


    const body = albums.map(album => {
        return `
            <tr>
                <td>${album.artist}</td>
                <td>${album.title}</td>
                <td>${album.genre}</td>
                <td>${album.availability}</td>
            </tr>
        `;
    }).join('');


    const table = `
        <table>
            ${header}
            <tbody>
                ${body}
            </tbody>
        </table>
    `;
    
    content.innerHTML = table;
}