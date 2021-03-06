import {Button, TextInput, WebElement} from './';

class WebComponentEnsurer {
  constructor(private component: WebElement) {
  }

  public async textIs(expected: string) {
    const text = await this.component.getText();

    if (expected.trim() !== text.trim()) {
      throw new Error(`Element ${this.component.selector} text is '${text}'. Expected value is '${expected}'`);
    }
  }

  public async isVisible() {
    if (!await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }

  public async isNotVisible() {
    if (await this.component.isDisplayed()) {
      throw new Error(`Element ${this.component.selector} is visible`);
    }
  }
}

class ButtonEnsurer extends WebComponentEnsurer {
  protected button: Button;
  constructor(button: Button) {
    super(button);
    this.button = button;
  }

  public async isNotDisabled() {
    if (await this.button.isDisabled()) {
      throw new Error(`Button ${this.button.selector} is disabled`);
    }
  }
}

class TextInputEnsurer extends WebComponentEnsurer {
  constructor(element: TextInput) {
    super(element);
  }
}

export function ensure(component: Button): ButtonEnsurer;
export function ensure(component: TextInput): TextInputEnsurer;
export function ensure(component: WebElement): WebComponentEnsurer;
export function ensure(component: WebElement | Button): any {
    if (component instanceof Button) {
        return new ButtonEnsurer(component);
    } else if (component instanceof WebElement) {
        return new WebComponentEnsurer(component);
    }
}
