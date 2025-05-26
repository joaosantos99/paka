import BaseModel from "/js/models/BaseModel.js";


export default class BreakSectionModel extends BaseModel {
  constructor() {
    super();

    this.container = document.getElementById('breakSection');
    this.render();
  }

  getTemplate = () => `
    <div class="container py-16 md:py-24 px-4 mx-auto relative overflow-hidden">
      <h1 class="lg:w-[750px] text-4xl md:text-5xl text-off-black font-semibold uppercase">
        Fuel your wanderlust and embark on unforgettable <span class="text-brand-orange">adventures</span>.
      </h1>
      <img src="/img/icons/mountain-icon.svg" alt="" class="w-[320px] h-auto absolute top-[65px] right-[-65px] opacity-50 -z-999">
    </div>
  `;
}
