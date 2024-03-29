'use strict';

const DOOMSDAY = new Date(Date.UTC(2022, 7, 7, 8, 53));
const LAST_WORDS = 'Goodbye';

document.addEventListener('DOMContentLoaded', () => {
  let clock = document.getElementById('doomsdayClock');

  updateClock(clock, DOOMSDAY, () => {
    let clockTick = setInterval(() => {
      let updated = updateClock(clock, DOOMSDAY);

      if (!updated) {
        clearInterval(clockTick);
      }
    }, 500);
  });
});

function updateClock(clock, endtime, callback) {
  let now = new Date();

  if (now > DOOMSDAY) {
    displayLastWords();
    return false;
  }

  let totalSeconds = (endtime - new Date()) / 1000;

  let clockParts = [
    clock.getElementsByClassName('days').item(0),
    clock.getElementsByClassName('hours').item(0),
    clock.getElementsByClassName('minutes').item(0),
    clock.getElementsByClassName('seconds').item(0),
  ].map(part => {
    return {
      number: part.getElementsByClassName('number').item(0),
      descriptor: part.getElementsByClassName('descriptor').item(0),
    };
  });

  let days = totalSeconds / (3600 * 24);
  let hours = (totalSeconds % (3600 * 24)) / 3600;
  let minutes = hours * 60 % 60;
  let seconds = minutes * 60 % 60;

  clockParts[0].number.textContent = Math.floor(days);
  clockParts[1].number.textContent = Math.floor(hours);
  clockParts[2].number.textContent = Math.floor(minutes);
  clockParts[3].number.textContent = Math.floor(seconds);

  updatePlurals(clockParts);

  if (typeof callback !== 'undefined')
    callback();
  else
    return true;
}

function updatePlurals(clockParts) {

  clockParts.forEach(part => {
    let number = parseInt(part.number.textContent, 10);

    let plural = (number !== 1);

    if (plural) {
      if (part.descriptor.textContent.slice(-1) !== 's')
        part.descriptor.textContent += 's';
    } else {
      if (part.descriptor.textContent.slice(-1) === 's')
        part.descriptor.textContent = part.descriptor.textContent.slice(0, -1);
    }
  });

}

function displayLastWords() {
  let elem = document.getElementById('lastWords');
  let clock = document.getElementById('doomsdayClock');

  clock.style.display = 'none';
  elem.textContent = LAST_WORDS;
}
