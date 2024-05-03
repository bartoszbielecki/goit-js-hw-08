import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');

const formDataStr = localStorage.getItem('feedback-form-state');
if (formDataStr) {
  const formData = JSON.parse(formDataStr);
  form.elements.email.value = formData.email;
  form.elements.message.value = formData.message;
}

const updateLocalStorage = throttle(() => {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
}, 1000); // Odstęp czasowy wynoszący 1 sekundę

form.addEventListener('input', () => {
  updateLocalStorage();
});

form.addEventListener('submit', ev => {
  ev.preventDefault();
  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  localStorage.clear();
  form.reset();
});
