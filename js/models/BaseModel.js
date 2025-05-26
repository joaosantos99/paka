export default class BaseModel {
  getTemplate = () => {
    throw new Error('getTemplate method must be implemented in the subclass');
  }

  render = () => {
    this.container.innerHTML = this.getTemplate();
  }
}