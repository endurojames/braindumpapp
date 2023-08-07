let mediaRecorder; // Define mediaRecorder in the global scope

document.addEventListener('DOMContentLoaded', function() {
  let recordedChunks = [];

  document.getElementById('start').addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        mediaRecorder = new MediaRecorder(stream); // Access the global mediaRecorder variable
        mediaRecorder.start();

        mediaRecorder.addEventListener('dataavailable', function(e) {
          recordedChunks.push(e.data);
        });

        document.getElementById('stop').disabled = false;
        document.getElementById('start').disabled = true;
      })
      .catch(function(err) {
        console.error('Could not start audio recording: ' + err);
      });
  });

  document.getElementById('stop').addEventListener('click', function() {
    if (mediaRecorder) {
      mediaRecorder.addEventListener('stop', function() {
        const audioBlob = new Blob(recordedChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = document.getElementById('player');
        audio.src = audioUrl;
      });
      mediaRecorder.stop();

      document.getElementById('stop').disabled = true;
      document.getElementById('start').disabled = false;
    }
  });
});