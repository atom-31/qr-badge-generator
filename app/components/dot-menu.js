import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DotMenuComponent extends Component {
  @action
  setupDropdown(element) {
    const button = element.querySelector('.dropdown-button');
    const dropdown = element.querySelector('.dropdown-menu');

    const toggleDropdown = () => {
      dropdown.classList.toggle('hidden');
    };

    const closeDropdown = (event) => {
      if (!element.contains(event.target)) {
        dropdown.classList.add('hidden');
      }
    };

    button.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);

    // Store references to the event listeners so they can be removed later
    this.toggleDropdown = toggleDropdown;
    this.closeDropdown = closeDropdown;
  }

  @action
  cleanupDropdown(element) {
    const button = element.querySelector('.dropdown-button');
    document.removeEventListener('click', this.closeDropdown);
    button.removeEventListener('click', this.toggleDropdown);
  }

  @action
  selectItem(item, event) {
    event.preventDefault();
    this.args.selectFunction(item);
    const dropdown = event.target.closest('.dropdown-menu');
    if (dropdown) {
      dropdown.classList.add('hidden');
    }
  }
}
