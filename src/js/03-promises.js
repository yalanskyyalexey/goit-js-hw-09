import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve({ position, delay });
  } else {
    // Reject
    return Promise.reject({ position, delay });
    // Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

const goPromise = ({ delay, step, amount }) => {
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });

    delay += step;
  }
};

const submitBtn = event => {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  goPromise({
    delay: Number(delay.value),
    step: Number(step.value),
    amount: Number(amount.value),
  });

  event.currentTarget.reset();
};

form.addEventListener('submit', submitBtn);
