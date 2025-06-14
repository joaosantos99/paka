export default class FooterModel {
  constructor() {
    // Select the <main> element from the DOM
    this.main = document.querySelector('main');

    // Insert the footer HTML string returned by getTemplate()
    // right before the closing </main> tag
    this.main.insertAdjacentHTML('afterend', this.getTemplate());
  }

  getTemplate = () => `
    <!-- Footer Section Start -->
      <footer class="bg-[var(--secondary-color)] pt-8">
         <div
            class="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-10 gap-y-7 text-[var(--screen-bg)] pb-10 md:px-4"
         >
            <div
               class="md:col-span-1 sm:col-span-3 col-span-2 md:block flex justify-center flex-col items-center md:border-b-0 border-b border-b-[var(--screen-bg)] md:pb-0 pb-7"
            >
               <a href="#" class="w-fit">
                  <img src="/img/light-logo.svg" alt="Logo" width="200" />
               </a>

               <div class="flex md:gap-4 gap-12 items-center md:mt-2 mt-8">
                  <a href="#">
                     <img src="/img/icon/ic-insta.svg" alt="Instagram Icon" />
                  </a>

                  <a href="#">
                     <img src="/img/icon/ic-fb.svg" alt="Facebook Icon" />
                  </a>

                  <a href="#">
                     <img src="/img/icon/ic-twitter.svg" alt="Twitter Icon" />
                  </a>
               </div>
            </div>

            <div class="sm:col-span-1 col-span-2 md:ps-0 ps-4">
               <div class="mb-3">
                  <h6 class="font-semibold">Address</h6>
                  <p class="text-xs">
                     Centro Empresarial de Braga <br />
                     Edifício B3 <br />
                     4705-319 Ferreiros, Braga
                  </p>
               </div>

               <div class="mb-3">
                  <h6 class="font-semibold">Email</h6>
                  <div class="-mt-1">
                     <a href="mailto:geral@paka.pt" class="text-xs">
                        geral@paka.pt
                     </a>
                  </div>
               </div>

               <div>
                  <h6 class="font-semibold">Phone</h6>
                  <div class="-mt-1">
                     <a href="tel:(+351) 253 400 456" class="text-xs">
                        (+351) 253 400 456
                     </a>
                  </div>
               </div>
            </div>

            <div class="sm:ps-0 ps-4">
               <div class="mb-3">
                  <h6 class="font-semibold mb-2">Navigation</h6>
                  <ul>
                     <li class="mb-1">
                        <a href="#">Home</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Mountains</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Water</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Deserts</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Forests</a>
                     </li>
                     <li>
                        <a href="#">Contacts</a>
                     </li>
                  </ul>
               </div>
            </div>

            <div class="md:pe-0 pe-4">
               <div class="mb-3">
                  <h6 class="font-semibold mb-2">User Links</h6>
                  <ul>
                     <li class="mb-1">
                        <a href="#">Login</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Sign Up</a>
                     </li>
                     <li class="mb-1">
                        <a href="#">Lost Password</a>
                     </li>
                     <li>
                        <a href="#">User Profile</a>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div class="bg-[var(--primary-color)] py-6">
            <div
               class="max-w-7xl px-4 mx-auto flex items-center gap-4 sm:justify-between justify-center sm:flex-row flex-col-reverse"
            >
               <p class="text-xs text-[var(--screen-bg)]">
                  Copyright © 2025. All Rights Reserved.
               </p>

               <p class="text-xs text-[var(--screen-bg)]">Privacy Policy</p>
            </div>
         </div>
      </footer>
      <!-- Footer Section End -->
  `;
}

// Instantiate to append footer at end of body
new FooterModel();
