import "https://unpkg.com/navigo"
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"
import {  setActiveLink, adjustForMissingHash, renderTemplate, loadTemplate } from "./utils.js";

import {initAddAlbums} from "./pages/albums/addAlbums.js"
import {initViewAlbums} from "./pages/albums/viewAlbums.js"
import {initSpecificAlbums} from "./pages/albums/specificAlbums.js"
import {initEditAlbums} from "./pages/albums/editAlbums.js"
import {initDeleteAlbums} from "./pages/albums/deleteAlbums.js"


window.addEventListener("load", async () => {
    const templateAddAlbums = await loadTemplate("./pages/albums/addAlbums.html");
    const templateViewAlbums = await loadTemplate("./pages/albums/viewAlbums.html");
    const templateSpecificAlbums = await loadTemplate("./pages/albums/specificAlbums.html");
    const templateEditAlbums = await loadTemplate("./pages/albums/editAlbums.html");
    const templateDeleteAlbums = await loadTemplate("./pages/albums/deleteAlbums.html");



    adjustForMissingHash()
    const router = new Navigo("/", { hash: true });

    window.router = router

    router
        .hooks({
            before(done, match) {
                setActiveLink("menu", match.url)
                done()
            },
        })
        .on({
            "/": () => {

            },
            "/addAlbums": () =>{
                renderTemplate(templateAddAlbums, "content");
                initAddAlbums();
            },
            "/viewAlbums": () =>{
                renderTemplate(templateViewAlbums, "content");
                initViewAlbums();
            },
            "/specificAlbums": () =>{
                renderTemplate(templateSpecificAlbums, "content");
                initSpecificAlbums();
            },
            "/editAlbums": () =>{
                renderTemplate(templateEditAlbums, "content");
                initEditAlbums();
            },
            "/deleteAlbums": () =>{
                renderTemplate(templateDeleteAlbums, "content");
                initDeleteAlbums();
            },
        })
        .resolve()
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
        + ' Column: ' + column + ' StackTrace: ' + errorObj);
}