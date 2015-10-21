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
    request.onreadystatechange = function () {
        var response = request.responseText;
        console.log(response);
    };
    //Instagram API
    request.open('GET', 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e35/12142017_967266440010278_1916169648_n.jpg', true);
    //request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCxSXrrHLok8s4ulJo3ebeNPx3ZCkaZrIw&cx=017576662512468239146:omuauf_lfve&q=motorcycle', true);
    request.send(null);
}