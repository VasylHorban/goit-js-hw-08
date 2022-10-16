import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import storage from './storage';

const STORAGE_KEY = 'videoplayer-current-time';
const player = new Player(document.querySelector('#vimeo-player'));
const videoCurrentTime = storage.load(STORAGE_KEY) || 0;

player.on(
  'timeupdate',
  throttle(data => {
    storage.save(STORAGE_KEY, data.seconds);
  }, 1000)
);

player.setCurrentTime(videoCurrentTime).catch(error => {
  switch (error.name) {
    case 'RangeError':
      console.error(
        'The time was less than 0 or greater than the video’s duration'
      );
      break;
    default:
      console.error(error.message);
      break;
  }
});
