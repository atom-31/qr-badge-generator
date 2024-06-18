import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @tracked styles = {};
  @tracked data = 'https://www.zoho.com/backstage/';
  @tracked selectedStyle = 'style1';
  @tracked image = '';
  @tracked dotcolor = '#39C0FE';
  @tracked type = 'rounded';
  @tracked bgcolor = '#FFFFFF';
  @tracked cornerSquare = 'extra-rounded';
  @tracked cornerDot = 'extra-rounded';
  @tracked colorStops0 = '#39C0FE';
  @tracked colorStops1 = '#39C0FE';
  @tracked height = 500;
  @tracked width = 500;
  @tracked image_type = 'svg';

  styleList = [
    { name: 'style1', label: 'Style 1', image: 'assets/images/style1.png' },
    { name: 'style2', label: 'Style 2', image: 'assets/images/style2.png' },
    { name: 'style3', label: 'Style 3', image: 'assets/images/style3.png' },
  ];

  constructor() {
    super(...arguments);
    this.loadStyles();
  }

  @action
  handleColorChange(event) {
    const dot = event.target.value;
    this.dotcolor = dot;
    this.colorStops0 = dot;
    this.colorStops1 = dot;
    this.updateProperties();
  }

  @action
  handleGradientZero(event) {
    const color = event.target.value;
    this.colorStops0 = color;
    this.updateProperties();
  }

  @action
  handleGradientOne(event) {
    const color = event.target.value;
    this.colorStops1 = color;
    this.updateProperties();
  }

  @action
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.updateProperties();
      };
      reader.readAsDataURL(file);
    }
  }

  @action
  handleInputChange(event) {
    const inputValue = event.target.value;
    this.data = inputValue || 'https://www.zoho.com/backstage/';
    this.updateProperties();
  }

  async loadStyles() {
    try {
      let response = await fetch('/styles.json');
      let styledata = await response.json();
      this.styles = styledata;
      this.applyStyle(this.selectedStyle);
    } catch (error) {
      console.error('Error loading styles:', error);
    }
  }

  getStyleProperties(styleName) {
    return this.styles[styleName] || {};
  }

  @action
  applyStyle(styleName) {
    const style = this.styles[styleName];
    if (style) {
      this.selectedStyle = style.selectedStyle;
      this.type = style.type;
      this.dotcolor = style.dotcolor;
      this.bgcolor = style.bgcolor;
      this.cornerSquare = style.cornerSquare;
      this.cornerDot = style.cornerDot;
      this.colorStops0 = style.colorStops0;
      this.colorStops1 = style.colorStops1;
      this.updateProperties();
    } else {
      console.error('Style not found:', styleName);
    }
  }

  updateProperties() {
    this.data = `${this.data}`;
    this.image = `${this.image}`;
    this.dotcolor = `${this.dotcolor}`;
    this.type = `${this.type}`;
    this.bgcolor = `${this.bgcolor}`;
    this.cornerSquare = `${this.cornerSquare}`;
    this.cornerDot = `${this.cornerDot}`;
    this.colorStops0 = `${this.colorStops0}`;
    this.colorStops1 = `${this.colorStops1}`;
    this.height = `${this.height}`;
    this.width = `${this.width}`;
    this.image_type = `${this.image_type}`;
  }
}
