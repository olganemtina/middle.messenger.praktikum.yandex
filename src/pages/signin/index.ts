import render from "../../utils/renderDOM";
import SignInForm from "./form/form";

document.addEventListener("DOMContentLoaded", () => {
  const form = new SignInForm();
  const root = document.querySelector("#frmContainer") as HTMLElement;
  render(root, form);
});
