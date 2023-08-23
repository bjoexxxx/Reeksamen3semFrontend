import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initSpecificAlbums(){
    makeHTML();
}

async function specificAlbums(id) {
    const options = makeOptions("GET", "", false);

    try {
        const response = await fetch("http://localhost:8080/api/album/id/" + id, options)
            .then(handleHttpErrors);
        displayAlbumDetails(response);
    } catch (error) {
        console.log(error);
    }
}

function makeHTML(){
    const content = document.getElementById("specificAlbumList");

    // Create a form to input the album ID
    const form = `
        <form id="albumIdForm">
            <div class="form-group">
                <label for="albumId">Album ID:</label>
                <input type="text" class="form-control" id="albumId" required>
            </div>
            <button type="submit" class="btn btn-primary">Search Album</button>
        </form>
        <br>
        <table id="albumDetails" class="table">
            <thead>
                <tr>
                    <th>Artist</th>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                <!-- Album details will be inserted here -->
            </tbody>
        </table>
    `;

    content.innerHTML = form;

    // Attach an event listener to handle form submission
    document.getElementById("albumIdForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = document.getElementById("albumId").value;
        specificAlbums(id);
    });
}

function displayAlbumDetails(album) {
    const tableBody = document.querySelector("#albumDetails tbody");

    // Assuming album is an object with the required properties
    const row = `
        <tr>
            <td>${album.artist}</td>
            <td>${album.title}</td>
            <td>${album.genre}</td>
            <td>${album.availability}</td>
        </tr>
    `;

    tableBody.innerHTML = row;
}

