import render from "../../utils/renderDOM";
import ChatPage from "./chat";

document.addEventListener("DOMContentLoaded", () => {
  const page = new ChatPage();
  const root = document.querySelector(".width-100-percent") as HTMLElement;
  render(root, page);
});
