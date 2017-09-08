export default class {
  constructor(widgetsMap) {
    this.widgetsMap = widgetsMap;
  }

  addWidget(data) {
    const loaderWidget = this.widgetsMap[data.widget];
    const isDefined = loaderWidget !== undefined;

    if (isDefined) {
      loaderWidget().then(this.createWidget.bind(this, data));
    }

    return isDefined;
  }

  createWidget(data, module) {
    const Widget = module.default;
    const widget = new Widget(data);

    widget.start();

    return this;
  }
}
