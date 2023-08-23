import { handleHttpErrors, makeOptions } from "../../utils.js";

export function initDeleteAlbums(){
    makeHTML();
}

async function deleteAlbums(id) {

    const options = makeOptions("DELETE", "", false);

    try {
        const response = await fetch("http://localhost:8080/api/album/" + id, options)
            .then(handleHttpErrors);

        if(response.ok) {
            alert('Album deleted successfully!');
        } else {
            alert('Error deleting album.');
        }

    } catch (error) {
        console.log(error);
        alert('Error deleting album. Please try again.');
    }
}


function makeHTML() {
    const content = document.getElementById("content");


    const form = `
        <form id="deleteAlbumForm">
            <div class="form-group">
                <label for="albumId">Album ID:</label>
                <input type="text" class="form-control" id="albumId" required>
            </div>
            <button type="submit" class="btn btn-danger">Delete Album</button>
        </form>
    `;

    content.innerHTML = form;

    document.getElementById("deleteAlbumForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const albumId = document.getElementById("albumId").value;

        if(albumId) {
            await deleteAlbums(albumId);
        } else {
            alert('Please enter a valid album ID.');
        }
    });

}
