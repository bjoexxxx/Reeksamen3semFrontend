import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initAddAlbums() {
    makeHTML();
}

function makeHTML() {
    const content = document.getElementById("content");


    const form = `
        <form id="addAlbumForm">
            <div class="form-group">
                <label for="artist">Artist:</label>
                <input type="text" class="form-control" id="artist" required>
            </div>
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" id="title" required>
            </div>
            <div class="form-group">
                <label for="genre">Genre:</label>
                <input type="text" class="form-control" id="genre" required>
            </div>
            <div class="form-group">
                <label for="availability">Availability:</label>
                <input type="text" class="form-control" id="availability" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Album</button>
        </form>
    `;

    content.innerHTML = form;

    document.getElementById("addAlbumForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const artist = document.getElementById("artist").value;
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const availability = document.getElementById("availability").value;

        const newAlbum = {
            artist: artist,
            title: title,
            genre: genre,
            availability: availability
        };

        const options = makeOptions("POST", newAlbum, false);
        try {
            const response = await fetch("http://localhost:8080/api/album", options).then(handleHttpErrors);
            alert('Album added successfully!');
        } catch (error) {
            console.error("Error adding album:", error);
            alert("Error adding album. Please try again.");
        }

    });
}
