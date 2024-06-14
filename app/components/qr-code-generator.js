import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import QRCodeStyling from 'qr-code-styling';

export default class QrCodeGeneratorComponent extends Component {
  @tracked data = 'https://www.zoho.com/backstage/';
  @tracked selectedStyle = 'style1';
  @tracked image = '';
  @tracked dotcolor = '';
  @tracked type = 'rounded';
  @tracked bgcolor = '#FFFFFF';
  @tracked cornerSquare = 'extra-rounded';
  @tracked cornerDot = 'extra-rounded';
  @tracked colorStops0 = '#39C0FE';
  @tracked colorStops1 = '#39C0FE';

  qrCode = new QRCodeStyling({
    width: 500,
    height: 500,
    type: "png",
    data: this.data,
    image: this.image, 
    margin: 10,
    qrOptions: {
      typeNumber: "0",
      errorCorrectionLevel: "M",
    },
    dotsOptions: {
      color: this.dotcolor,
      type: this.type,
      gradient: {
        type: "radial",
        rotation: 0,
        colorStops: [
          { offset: 0, color: this.colorStops0 },
          { offset: 1, color: this.colorStops1 }
        ],
      }
    },
    backgroundOptions: {
      color: this.bgcolor,
    },
    imageOptions: {
      crossOrigin: "anonymous",
      hideBackgroundDots: true, 
      imageSize: 0.4, 
    },
    cornersSquareOptions: {
      type: this.cornerSquare,
    },
    cornersDotOptions: {
      type: this.cornerDot,
    },
  });

  getTypeNumber(data, errorCorrectionLevel) {
    for (let version = 1; version <= 40; version++) {
      try {
        new QRCodeStyling({
          data: data,
          qrOptions: {
            typeNumber: version,
            errorCorrectionLevel: errorCorrectionLevel
          }
        });
        return version;
      } catch (e) {
      }
    }
    return 40;
  }

  updateQRCode() {
    const errorCorrectionLevel = "M"; 
    const typeNumber = this.getTypeNumber(this.data, errorCorrectionLevel);
    console.log(this.dotcolor,"dotcolor");
    
    this.qrCode.update({
      data: this.data,
      dotsOptions: {
        color: this.dotcolor,
        type: this.type,
        gradient: {
          type: "radial",
          rotation: 0,
          colorStops: [
            { offset: 0, color: this.colorStops0 },
            { offset: 1, color: this.colorStops1 }
          ],
        }
      },
      backgroundOptions: {
        color: this.bgcolor,
      },
      qrOptions: {
        typeNumber: typeNumber,
        errorCorrectionLevel: errorCorrectionLevel,
      },
      cornersDotOptions: {
        type: this.cornerDot,
      },
      cornersSquareOptions: {
        type: this.cornerSquare,
      },
      image: this.image,
    });

    this.qrCode.append(document.getElementById("canvas"));
  }

  @action
  handleColorChange(event) {
    const dot = event.target.value;
    this.colorStops0 = dot;
    this.colorStops1 = dot;
    this.dotcolor = dot;
    this.updateQRCode();
  }

  @action
  handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        console.log(this.image,"image");
        this.updateQRCode();
      };
      reader.readAsDataURL(file);
    }
  }

  @action
  handleInputChange(event) {
    const inputValue = event.target.value;
    if (inputValue) {
      this.data = inputValue;
    } else {
      this.data = 'https://www.zoho.com/backstage/';
    }
    this.updateQRCode();
  }

  @action
  style1() {
    this.selectedStyle = 'style1';
    this.type = "rounded";
    this.dotcolor = '#39C0FE';
    this.bgcolor = '#FFFFFF';
    this.cornerSquare = 'extra-rounded';
    this.cornerDot = 'extra-rounded';
    this.colorStops0 = '#39C0FE';
    this.colorStops1 = '#39C0FE';

    this.updateQRCode();
  }

  @action
  style2() {
    this.selectedStyle = 'style2';
    this.type = "dots";
    this.dotcolor = '#E62622';
    this.bgcolor = '#FFFFFF';
    this.cornerSquare = '';
    this.cornerDot = '';
    this.colorStops0 = '#E62622';
    this.colorStops1 = '#FF5733';

    this.updateQRCode();
  }

  @action
  style3() {
    this.selectedStyle = 'style3';
    this.type = "square";
    this.dotcolor = '#000000';
    this.bgcolor = '#FFFFFF';
    this.cornerSquare = '';
    this.cornerDot = '';
    this.colorStops0 = '#000000';
    this.colorStops1 = '#000000';

    this.updateQRCode();
  }

  @action
  generateQRCode() {
    this.updateQRCode();
  }
}
