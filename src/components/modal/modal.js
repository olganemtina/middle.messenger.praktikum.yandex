export function showModal(className) {
	let fileUploadModal = document.getElementsByClassName(className)[0];
	fileUploadModal.classList.toggle("show-modal");
}

export function closeModal() {
	let fileUploadModal = document.getElementsByClassName(className)[0];
	fileUploadModal.classList.toggle("hide");
}
