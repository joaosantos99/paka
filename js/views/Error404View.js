export default class Error404View {
  constructor() {
    // Select the <main> element from the DOM
    const main = document.querySelector('main');

    // Insert the HTML string returned by getTemplate()
    // right adter the opening <main> tag
    main.insertAdjacentHTML('afterbegin', this.getTemplate());
  }

  getTemplate = () => `
    <div
      class="min-h-screen !bg-no-repeat !bg-cover !bg-center"
      style="background: url(../img/404-bg.png)"
    >
      <div
        class="page-not-found max-w-7xl px-4 mx-auto flex items-center justify-center text-[var(--screen-bg)]"
      >
        <div>
          <h1 class="text-9xl font-black">404</h1>
          <p class="text-5xl">Are you lost?</p>
        </div>
      </div>
    </div>
  `;
}

// Instantiate to insert header inside <main>
new Error404View();
