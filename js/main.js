/**
 * @author Leon K.
 */
window.onload = function () {
    //OnLoad calls
    createRequest();
};

/////// Helper Methods ////////
/**
 * Next image.
 */
function nextImage() {
    document.getElementById('imageSlide').src = "img/3.jpg";
    console.log('changed')
}

/**
 * Previous image.
 */
function prevImage() {
    document.getElementById('imageSlide').src = "img/2.jpg";
}

/**
 * HTTP request.
 */
function createRequest() {
    var request = new XMLHttpRequest();
    //Instagram API
    var url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?client_id=80e06c095ca7407aa27b695a5cea4f8a';
    //var url = 'https://api.flickr.com/services/feeds/photos_public.gne';
    //var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCxSXrrHLok8s4ulJo3ebeNPx3ZCkaZrIw&cx=017576662512468239146:omuauf_lfve&q=motorcycle';

    request.onreadystatechange = function () {
        var response = request.responseText;
        console.log(response);
    };
    if (request) {
        request.open('GET', url, true);
        //request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
        request.send(null);
    }
}