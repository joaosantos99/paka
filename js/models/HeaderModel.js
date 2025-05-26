export default class HeaderModel {
  constructor() {
    this.header = document.querySelector('header');
    this.header.innerHTML = this.getTemplate();
  }

  getTemplate = () => `
    <header class="border-b border-gray-300">
      <div class="flex items-center justify-between py-7 container mx-auto">

        <!-- Logo -->
        <a href="/" class="flex items-center">
          <img src="/img/logos/logo-black.svg" alt="PAKA Logo" class="h-10" />
        </a>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-6 text-gray-800 text-lg">
          <a href="#" class="hover:underline">Mountains</a>
          <a href="#" class="hover:underline">Water</a>
          <a href="#" class="hover:underline">Deserts</a>
          <a href="#" class="hover:underline">Forests</a>
          <a href="#" class="hover:underline">Contacts</a>
        </nav>

        <!-- Admin Button and User Icon -->
        <div class="hidden md:flex items-center space-x-4">
          <a href="/admin" class="bg-brand-orange text-white px-4 py-2 rounded-md hover:bg-brand-orange">
            Admin Dashboard
          </a>
          <button aria-label="User Profile">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804zM12 12a3 3 0 100-6 3 3 0 000 6z" />
            </svg>
          </button>
        </div>

      </div>
    </header>
  `;
}