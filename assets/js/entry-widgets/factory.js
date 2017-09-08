import $ from 'jquery';
import WidgetsFactoryCommon from './factory-common';
import WidgetsFactoryLazy from './factory-lazy';
import widgetsMapCommon from './widgets-common';
import widgetsMapLazy from './widgets-lazy';

export default class {
  constructor() {
    this.dataWidgets = [];
    this.commonFactory = new WidgetsFactoryCommon(widgetsMapCommon);
    this.lazyFactory = new WidgetsFactoryLazy(widgetsMapLazy);

    this.initWidgets($('script[type="application/widget+json"]'));

    this.addWidgets();
  }

  initWidgets($scripts) {
    $scripts.each((index, element) => this.initWidget(element));

    return this;
  }

  initWidget(script) {
    const data = this.parseWidget(script);

    this.dataWidgets.push(data);

    return data;
  }

  parseWidget(script) {
    let data;

    try {
      data = $.parseJSON(script.innerHTML);
    } catch (e) {
      throw new Error('Malformed syntax of widget JSON.');
    }

    if (!data.el) {
      data.el = script.parentNode;
    }

    return data;
  }

  addWidgets() {
    const noCommonDataWidgets = this.addCommonWidgets(this.dataWidgets);

    this.starCommonWidgets();
    this.addLazyWidgets(noCommonDataWidgets);

    return this;
  }

  addCommonWidgets(dataWidgets) {
    const noCommonDataWidgets = [];

    for (let i = 0; i < dataWidgets.length; i++) {
      const dataWidget = dataWidgets[i];
      const isCommonWidget = this.addCommonWidget(dataWidget);

      if (!isCommonWidget) {
        noCommonDataWidgets.push(dataWidget);
      }
    }

    return noCommonDataWidgets;
  }

  addLazyWidgets(dataWidgets) {
    for (let i = 0; i < dataWidgets.length; i++) {
      const dataWidget = dataWidgets[i];

      this.addLazyWidget(dataWidget);
    }

    return this;
  }

  addCommonWidget(dataWidget) {
    return this.commonFactory.addWidget(dataWidget);
  }

  addLazyWidget(dataWidget) {
    return this.lazyFactory.addWidget(dataWidget);
  }

  starCommonWidgets() {
    this.commonFactory.start();

    return this;
  }
}
