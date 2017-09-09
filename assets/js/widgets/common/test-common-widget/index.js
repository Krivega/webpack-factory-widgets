import Widget from '../../widget';

export default class WidgetCommon extends Widget {
  start() {
    return console.log('I am common widget! This is my options:', this.options);
  }
}
