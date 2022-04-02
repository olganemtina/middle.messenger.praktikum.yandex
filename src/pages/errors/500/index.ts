import render from "../../../utils/renderDOM";
import ErrorPage from "../error";

document.addEventListener("DOMContentLoaded", () => {
  const form = new ErrorPage({
    errorCode: 500,
    errorText: "Ошибка на сервере. Уже фиксим.",
  });
  const root = document.querySelector(".content-center-wrapper") as HTMLElement;
  render(root, form);
});
