import render from "../../utils/renderDOM";
import SignUpForm from "./form/form";

document.addEventListener("DOMContentLoaded", () => {
  const form = new SignUpForm();
  const root = document.querySelector("#frmContainer") as HTMLElement;
  render(root, form);
});
