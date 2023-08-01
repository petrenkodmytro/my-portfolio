import Notiflix from "https://cdn.jsdelivr.net/npm/notiflix@3/+esm";
const formRef = document.querySelector(".online-form");
const STORAGE_KEY = "feedback-form-state";

formRef.addEventListener("submit", onFormSubmit);
formRef.addEventListener("input", _.throttle(onFormInput, 500));
// console.log(formRef.elements);
const FormData = {};
// деструктуризація змінних email та password з об'єкта form.elements
const { name, phone, message } = formRef.elements;
// під час завантаження сторінки перевіряй стан сховища
lastSaveForm();
console.log(name.value);
function onFormSubmit(event) {
  event.preventDefault();
  // проверка на пустые поля
  if (name.value.trim() === "" || phone.value.trim() === "" || message.value.trim() === "") {
    return Notiflix.Notify.warning("All fields must be filled in");
  }
  // виводимо у консоль об'єкт з полями email та message
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  // очищаем поля формы
  event.currentTarget.reset();
  // очищаем localStorage
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(event) {
  FormData[name.name] = name.value;
  FormData[phone.name] = phone.value;
  FormData[message.name] = message.value;
  // або
  // FormData[event.target.name] = event.target.value;

  // записуємо у локальне сховище об'єкт з полями email і message
  localStorage.setItem(STORAGE_KEY, JSON.stringify(FormData));
}

function lastSaveForm() {
  // отримаємо рядок з localStorage
  const saveFormDataString = localStorage.getItem(STORAGE_KEY);
  // парсимо рядок, щоб отримати з JSON валідне JavaScript значення
  const saveFormData = JSON.parse(saveFormDataString);
  // якщо у localStorage є збережені дані, заповнюй ними поля форми
  if (saveFormData) {
    name.value = saveFormData.name;
    phone.value = saveFormData.phone;
    message.value = saveFormData.message;
  }
}
