import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const field = document.querySelectorAll('.field');
const startDate = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const daysCounter = document.querySelector('span[data-days]');
const hoursCounter = document.querySelector('span[data-hours]');
const minutesCounter = document.querySelector('span[data-minutes]');
const secondsCounter = document.querySelector('span[data-seconds]');
let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let date = new Date();
    console.log(selectedDates[0]);

    if (selectedDates[0] <= date) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return value.toString().padStart(2, 0);
};

const countdown = () => {
  timerId = setInterval(() => {
    let timeMiliSec = selectedDate.getTime() - new Date().getTime();
    startBtn.disabled = true;
    daysCounter.textContent = addLeadingZero(convertMs(timeMiliSec).days);
    hoursCounter.textContent = addLeadingZero(convertMs(timeMiliSec).hours);
    minutesCounter.textContent = addLeadingZero(convertMs(timeMiliSec).minutes);
    secondsCounter.textContent = addLeadingZero(convertMs(timeMiliSec).seconds);

    if (
      convertMs(timeMiliSec).days === 0 &&
      convertMs(timeMiliSec).hours === 0 &&
      convertMs(timeMiliSec).minutes === 0 &&
      convertMs(timeMiliSec).seconds === 0
    ) {
      clearInterval(timerId);
    }
  }, 1000);
};

startBtn.addEventListener('click', countdown);

flatpickr(startDate, options);

timer.style.display = 'flex';

field.forEach(element => {
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.marginRight = '20px';
  element.style.textTransform = 'uppercase';
  element.style.fontWeight = '500';
  element.style.marginTop = '15px';
});
