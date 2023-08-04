import Notiflix from "https://cdn.jsdelivr.net/npm/notiflix@3/+esm";

const formRef = document.querySelector(".online-form");

const STORAGE_KEY = "feedback-form-state";
const YOUR_SERVICE_ID = "service_ej4ym0o";
const YOUR_TEMPLATE_ID = "template_95y95q9";

formRef.addEventListener("submit", onFormSubmit);
formRef.addEventListener("input", _.throttle(onFormInput, 500));
// console.log(formRef.elements);
const FormData = {};
// деструктуризація змінних email та password з об'єкта form.elements
const { name, phone, message } = formRef.elements;
// під час завантаження сторінки перевіряй стан сховища
lastSaveForm();

function onFormSubmit(event) {
  event.preventDefault();
  // проверка на пустые поля
  if (name.value.trim() === "" || phone.value.trim() === "" || message.value.trim() === "") {
    return Notiflix.Notify.warning("All fields must be filled in");
  }

  console.log(FormData);

  emailjs
    .send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, FormData)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((error) => {
      console.log("FAILED...", error);
    });

  // emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, FormData).then(
  //   function (response) {
  //     console.log("SUCCESS!", response.status, response.text);
  //   },
  //   function (error) {
  //     console.log("FAILED...", error);
  //   }
  // );

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
