export function showModal(className: string) {
  let fileUploadModal = document.getElementsByClassName(className)[0];
  fileUploadModal.classList.toggle("show-modal");
}

export function closeModal(className: string) {
  let fileUploadModal = document.getElementsByClassName(className)[0];
  fileUploadModal.classList.toggle("hide");
}
