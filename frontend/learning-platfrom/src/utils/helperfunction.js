export const navigationButtonStyleHandler = (swiper) => {
  const nextButton = document.querySelectorAll(".swiper-button-next");
  const prevButton = document.querySelectorAll(".swiper-button-prev");
 
  if (nextButton && nextButton.length > 0) {
  for(let ele of nextButton){
    ele.innerHTML = `
      <svg class="arrow-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
  }
  }

  if (prevButton) {
  for(let ele of prevButton){
     ele.innerHTML = `
        <svg class="arrow-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
  }
  }
};


export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
