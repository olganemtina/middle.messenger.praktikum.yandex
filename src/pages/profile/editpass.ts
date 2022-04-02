import render from "../../utils/renderDOM";
import EditPasswordForm from "./form/editPassword";

document.addEventListener("DOMContentLoaded", () => {
  const form = new EditPasswordForm();
  const root = document.querySelector("#frmContainer") as HTMLElement;
  render(root, form);
});
