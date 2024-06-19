import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import QRCodeStyling from 'qr-code-styling';

export default class QrCodeGeneratorComponent extends Component {
  qrCode = null;

  @tracked initialized = false;

  constructor() {
    super(...arguments);
    this.initializeQRCode();
  }

  initializeQRCode() {
    this.qrCode = new QRCodeStyling({
      width: 500 || this.args.width,
      height: 500 || this.args.height,
      type: 'svg' || this.args.image_type,
      data: this.args.data || 'https://www.zoho.com/backstage/',
      image: this.args.image || '',
      margin: 10,
      qrOptions: {
        typeNumber: '0',
        errorCorrectionLevel: 'M',
      },
      dotsOptions: {
        color: this.args.dotcolor || '#000000',
        type: this.args.type || 'square',
        gradient: {
          type: this.args.gradient_type || 'linear',
          rotation: this.args.rotation || 0,
          colorStops: [
            { offset: 0, color: this.args.colorStops0 || '#000000' },
            { offset: 1, color: this.args.colorStops1 || '#000000' },
          ],
        },
      },
      backgroundOptions: {
        color: this.args.bgcolor || '#FFFFFF',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        hideBackgroundDots: true,
        imageSize: 0.4,
      },
      cornersSquareOptions: {
        type: this.args.cornerSquare || '',
      },
      cornersDotOptions: {
        type: this.args.cornerDot || '',
      },
    });
    //console.log(typeNumber);
    this.initialized = true;
  }

  // getTypeNumber(data, errorCorrectionLevel) {
  //   for (let version = 1; version <= 40; version++) {
  //     try {
  //       new QRCodeStyling({
  //         data: data,
  //         qrOptions: {
  //           typeNumber: version,
  //           errorCorrectionLevel: errorCorrectionLevel
  //         }
  //       });
  //       return version;
  //     } catch (e) {
  //     }
  //   }
  //   return 40;
  // }

  @action
  updateQRCode() {
    // const errorCorrectionLevel = "M";
    // const typeNumber = this.getTypeNumber(this.args.data, errorCorrectionLevel);
    if (this.qrCode) {
      this.qrCode.update({
        width: this.args.width,
        height: this.args.height,
        data: this.args.data,
        type: this.args.image_type,
        image: this.args.image,
        dotsOptions: {
          color: this.args.dotcolor,
          type: this.args.type,
          gradient: {
            type: this.args.gradient_type,
            rotation: this.args.rotation,
            colorStops: [
              { offset: 0, color: this.args.colorStops0 },
              { offset: 1, color: this.args.colorStops1 },
            ],
          },
        },
        backgroundOptions: {
          color: this.args.bgcolor,
        },
        cornersSquareOptions: {
          type: this.args.cornerSquare,
        },
        cornersDotOptions: {
          type: this.args.cornerDot,
        },
      });
    }
  }

  @action
  setupQRCode(element) {
    if (this.initialized) {
      this.qrCode.append(element);
      this.updateQRCode();
    } else {
      this.initializeQRCode();
      this.qrCode.append(element);
    }
  }

  @action
  downloadQRCode() {
    this.qrCode.download({
      name: 'qr-code',
      extension: 'svg',
    });
  }
}
