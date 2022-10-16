import throttle from 'lodash.throttle';
import storage from './storage';

const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

const formState = storage.load(STORAGE_KEY);

if (formState) {
  form.email.value = formState.email;
  form.message.value = formState.message;
}

const submitHandler = e => {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.currentTarget;
  console.log('Feedback form state: ', {
    email: email.value,
    message: message.value,
  });
  storage.clear(STORAGE_KEY);
  e.currentTarget.reset();
};

form.addEventListener(
  'input',
  throttle(e => {
    if(!e.currentTarget) return
    const {
      elements: { email, message },
    } = e.currentTarget;
    storage.save(STORAGE_KEY, { email: email.value, message: message.value });
  }, 500)
);

form.addEventListener('submit', submitHandler);
