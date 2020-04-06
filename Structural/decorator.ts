abstract class Phone {
  public description: string;
  
  public getDescription(): string {
    return this.description;
  }

  public abstract cost(): number;
}

class Pixel extends Phone {
  public description = 'Google Pixel';

  public cost() {
    return 1000;
  }
}

class IPhone extends Phone {
  public description = 'Apple IPhone';

  public cost() {
    return 1200;
  }
}

abstract class PhoneOptions extends Phone {
  protected decoratedPhone: Phone;

  public abstract getDescription(): string;
  public abstract cost(): number;
}

class FiveG extends PhoneOptions {
  protected decoratedPhone: Phone;

  constructor(phone: Phone) {
    super();
    this.decoratedPhone = phone;
  }

  public getDescription(): string {
    return `${this.decoratedPhone.getDescription()}, 5G`;
  }
  public cost(): number {
    return this.decoratedPhone.cost() + 500;
  }
}

class WideCamera extends PhoneOptions {
  protected decoratedPhone: Phone;

  constructor(phone: Phone) {
    super();
    this.decoratedPhone = phone;
  }

  public getDescription(): string {
    return `${this.decoratedPhone.getDescription()}, Wide-Lense Camera`;
  }
  public cost(): number {
    return this.decoratedPhone.cost() + 400;
  }
}

let myPhone = new Pixel();
console.log(myPhone.getDescription());
console.log(myPhone.cost());

myPhone = new FiveG(myPhone);
console.log(myPhone.getDescription());
console.log(myPhone.cost());

myPhone = new WideCamera(myPhone);
console.log(myPhone.getDescription());
console.log(myPhone.cost());