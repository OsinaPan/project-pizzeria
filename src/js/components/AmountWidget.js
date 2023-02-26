import {select, settings} from '../settings.js';

class AmountWidget {
  constructor(element) {
    const thisWidget = this;

    thisWidget.getElements(element);
    thisWidget.setValue(thisWidget.input.value);
    thisWidget.initActions();

    console.log('AmountWidget:', thisWidget);
    console.log('constructor arguments:', element);
  }

  getElements(element) {
    const thisWidget = this;

    thisWidget.element = element;
    thisWidget.input = thisWidget.element.querySelector(select.widgets.amount.input);
    thisWidget.linkDecrease = thisWidget.element.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.linkIncrease = thisWidget.element.querySelector(select.widgets.amount.linkIncrease);
    thisWidget.setValue(settings.amountWidget.defaultValue);
  }

  setValue(value) {
    const thisWidget = this;
    const newValue = parseInt(value);

    /* TODO: Add Validation */
    if (thisWidget.value !== newValue && !isNaN(newValue)) {
      thisWidget.value = newValue;
    }

    thisWidget.input.value = thisWidget.value;
    thisWidget.announce();
  }

  announce() {
    const thisWidget = this;
    const event = new CustomEvent('updated', {
      bubbles: true
    });
    thisWidget.element.dispatchEvent(event);
  }

  initActions() {
    const thisWidget = this;
    thisWidget.setValue(thisWidget.input.value);

    thisWidget.input.addEventListener('change', function () {
      thisWidget.setValue(thisWidget.input.value);
    });

    thisWidget.linkDecrease.addEventListener('click', function (event) {
      event.preventDefault();

      thisWidget.setValue(thisWidget.value - 1);
    });

    thisWidget.linkIncrease.addEventListener('click', function (event) {
      event.preventDefault();

      thisWidget.setValue(thisWidget.value + 1);
    });
  }
}

export default AmountWidget;