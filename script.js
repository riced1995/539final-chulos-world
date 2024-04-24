function myFunction() {
    var x = document.getElementById("mylinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

// document.addEventListener("DOMContentLoaded", function () {
//     const swapContainers = document.querySelectorAll('.swap1');

//     swapContainers.forEach(function (container) {
//         const frontImg = container.querySelector('.img-front1');
//         const backImg = container.querySelector('.img-back1');

//         container.addEventListener('mouseenter', function () {
//             frontImg.style.opacity = 1;
//             backImg.style.opacity = 0;
//         });

//         container.addEventListener('mouseleave', function () {
//             frontImg.style.opacity = 0;
//             backImg.style.opacity = 1;
//         });
//     });
// });

/* Photobooth */
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture-btn');
    const downloadButton = document.getElementById('download-btn');
    const frame = document.querySelector('.frame');

    // Get user media (webcam)
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            console.log("Webcam is on")
        })
        .catch(function (err) {
            console.error('Error accessing webcam:', err);
        });

    // Capture button click event
    captureButton.addEventListener('click', function () {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log("Taking a picture")

        // Draw frame on top of the captured image
        context.drawImage(frame.querySelector('img'), 0, 0, canvas.width, canvas.height);

        // Show download button
        downloadButton.style.display = 'inline-block';
    });

    // Download button click event
    downloadButton.addEventListener('click', function () {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'photobooth_capture.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Downloading the picture")
    });
});