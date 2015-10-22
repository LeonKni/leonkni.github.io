/**
 * @author Leon K.
 */
var images = [];
window.onload = function () {
    //OnLoad calls
    requestApiImages();
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
function requestApiImages() {
    var request = new XMLHttpRequest();
    var url = 'https://api.imgur.com/3/gallery';

    //Authenticated GET
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var response = JSON.parse(request.responseText);
            images = response.data;
            document.getElementById('imageSlide').src = images[0].link + '.png';
            console.log(response);
        } else if (request.status === 403) {
            alert('Your Imgur Authentication Token has expired.  Please renew.')
        }
    };
    request.open('GET', url, true);
    request.setRequestHeader('Authorization', 'Bearer af220e24bce25f66becbecd113a20a0c14869b1e');
    request.setRequestHeader('Accept', 'application/json');
    request.send(null);
}