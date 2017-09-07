import Widget from '../../widget';

export default class WidgetCommon extends Widget {
  start() {
    console.log('I am common widget! This is my options:', this.options);
  }
} 
