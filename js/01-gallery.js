import { galleryItems } from "./gallery-items.js";
// Change code below this line
console.log(galleryItems);

const markup = createGalleryMarkup(galleryItems);

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>
            `;
    })
    .join("");
}

const galleryEl = document.querySelector(".gallery");
galleryEl.insertAdjacentHTML("beforeend", markup);

galleryEl.addEventListener("click", cancelDefaultFollowing);
galleryEl.addEventListener("click", onGalleryElemClick);

function cancelDefaultFollowing(event) {
  event.preventDefault();
}

function onGalleryElemClick(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const urlLargePhoto = event.target.dataset.source;

  const openModal = basicLightbox.create(`<img src="${urlLargePhoto}">`);
  openModal.show();

  const modal = document.querySelector(".basicLightbox");

  window.addEventListener("keydown", closeWithEscButton);
  console.log("keydown listener was added");
  modal.addEventListener("click", closeWithClick);
  console.log("click listener was added");

  function closeWithEscButton(event) {
    if (event.code === "Escape") {
      openModal.close();
      window.removeEventListener("keydown", closeWithEscButton);
      console.log("keydown event listener was removed from window");
      modal.removeEventListener("click", closeWithClick);
      console.log("click event listener was removed from modal");
    }
  }

  function closeWithClick(event) {
    if (openModal.close()) {
      removeListenerOnClick();
    }
  }

  function removeListenerOnClick() {
    modal.removeEventListener("click", closeWithClick);
    console.log("click event listener was removed from modal");
    window.removeEventListener("keydown", closeWithEscButton);
    console.log("keydown event listener was removed from window");
  }
}
