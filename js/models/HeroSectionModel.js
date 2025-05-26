import BaseModel from "/js/models/BaseModel.js";

const INPUT_STYLE = `
  bg-off-white
  border-1
  rounded-md
  p-3.5
  text-sm
  text-off-black
  focus:outline-none
  focus:ring-2
  focus:ring-brand-orange
  focus:border-transparent
  placeholder:text-off-black
  placeholder:opacity-50
  focus:placeholder:opacity-0
`;

export default class HeroSectionModel extends BaseModel {
  constructor() {
    super();

    this.container = document.getElementById('heroSection');
    this.render();
  }

  getTemplate = () => `
    <div class="hero-section-cover h-screen w-screen relative mb-[155px] md:mb-0">
      <div class="container h-full flex flex-col justify-end gap-3 px-4 mx-auto pb-20 absolute md:relative bottom-[-235px] md:bottom-0">
        <h2 class="text-off-white text-3xl">Search for your next adventure!</h2>
        <form class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4 bg-beje rounded-md p-4">
          <input class="${INPUT_STYLE}" placeholder="Departure" />
          <input class="${INPUT_STYLE}" placeholder="Date" />
          <input class="${INPUT_STYLE}" placeholder="1 Adult" />
          <input class="${INPUT_STYLE}" placeholder="Type" />
          <button class="bg-brand-orange text-sm text-off-white rounded-md p-3.5 pointer">Search</button>
        </form>
      </div>
    </div>
  `;
}
