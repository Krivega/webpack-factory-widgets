export default {
  TestLazyWidget() {
    return import(/* webpackChunkName: "TestLazyWidget" */ './lazy/test-lazy-widget/index');
  }
};
