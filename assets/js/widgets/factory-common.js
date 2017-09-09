export default class {
  constructor(widgetsMap) {
    this.widgets = [];
    this.widgetsMap = widgetsMap;
  }

  addWidget(data) {
    const Widget = this.widgetsMap[data.widget];
    const isDefined = Widget !== undefined;

    if (isDefined) {
      this.createWidget(Widget, data);
    }

    return isDefined;
  }

  createWidget(Widget, data) {
    const widget = new Widget(data);

    this.widgets.push(widget);

    return this;
  }

  start() {
    for (let i = 0; i < this.widgets.length; i++) {
      this.widgets[i].start();
    }

    return this;
  }
}
