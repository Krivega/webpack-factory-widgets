import Widget from '../../widget';

export default class WidgetLazy extends Widget {
  start() {
    return console.log('I am lazy widget! This is my options:', this.options);
  }
}
