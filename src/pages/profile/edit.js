import { showModal, closeModal } from "../../components/modal/modal";

let fileUploadElement = document.getElementsByClassName("avatar")[0];
fileUploadElement.addEventListener("click", () =>
  showModal("file-upload-modal")
);

let closeModalButton = document.querySelector(".modal-container .close")[0];
closeModalButton.addEventListener("click", () =>
  closeModal("file-upload-modal")
);
