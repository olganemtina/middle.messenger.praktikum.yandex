import { showModal } from "../../components/modal";
import render from "../../utils/renderDOM";
import EditProfileForm from "./form/editProfile";

document.addEventListener("DOMContentLoaded", () => {
  const form = new EditProfileForm();
  const root = document.querySelector("#frmContainer") as HTMLElement;
  render(root, form);

  const fileUploadElement: HTMLElement = document.getElementById(
    "avatar"
  ) as HTMLElement;
  fileUploadElement.addEventListener("click", () => {
    showModal("file-upload-modal");
  });

  // let closeModalButton: HTMLElement = document.querySelector(".modal-container .close") as HTMLElement; //(document.querySelector(".modal-container .close")[0]);
  // closeModalButton.addEventListener("click", () =>
  // 	closeModal("file-upload-modal")
  // );
});
