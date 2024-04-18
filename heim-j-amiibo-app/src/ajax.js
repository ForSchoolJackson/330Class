const loadXHR = (url, callback) => {
    // set up the connection
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    // when the data loads, invoke the callback function and pass it the `xhr` object
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            callback(xhr);
        } else {
            console.error('Request failed with status:', xhr.status);
        }
    };
    xhr.onerror = () => {
        console.error('Request failed');
    };
    xhr.send();
};

//export
export { loadXHR };
