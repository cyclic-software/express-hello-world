const button = document.getElementById('button');

button.addEventListener('click', () => {
    fetch('https://xeno-canto.org/api/2/recordings?query=q:A+len:12')
      .then(response => response.json())
      .then(data => {
        let recordings = data.recordings;
        if (recordings && recordings.length > 0) {
          let randomIndex = Math.floor(Math.random() * recordings.length);
          let sound = recordings[randomIndex].file;
          const audioElement = document.getElementById('audio');
          audioElement.src = sound;
        } else {
          console.error('The "recordings" array is not defined or has no elements');
        }
      })
      .catch (error => {
        console.error(error);
      });
  });








  // button.addEventListener('click', () => {
//     fetch('https://xeno-canto.org/api/2/recordings?query=q:A+len:12')
//     .then(response => response.json())
//     .then(data => {
//       let sound = data.recordings
//       console.log(sound)
//       const audioElement = document.getElementById('audio');
//       audioElement.src = sound
//     })
//     .catch (error => {
//       console.error(error);
//     })
//   })