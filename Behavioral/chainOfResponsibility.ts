interface Handler {
  setNext(handler: Handler): Handler;

  handle(request: string): string;
}

abstract class AbstractHanler implements Handler {
  private nextHanlder: Handler;

  public setNext(handler: Handler): Handler {
    this.nextHanlder = handler;

    return handler;
  }

  handle(request: string): string {
    if (this.nextHanlder) {
      return this.nextHanlder.handle(request);
    }
    return '';
  }
}

class MonkeyHandler extends AbstractHanler {
  public handle(request: string): string {
    if (request === 'Banana') {
      return `Monkey: I'll eat eht ${request}.`
    }
    return super.handle(request);
  }
}

class SquirrelHandler extends AbstractHanler {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

class DogHandler extends AbstractHanler {
  public handle(request: string): string {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

function clientCode(handler: Handler) {
  const foods = ['Nut', 'Banana', 'Cup of coffee'];

  foods.forEach(food => {
    const result = handler.handle(food);
    if (result) {
      console.log(result);
    } else {
      console.log(`${food} was left untouched.`);
    }
  })
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);

console.log('Chain: Monkey > Squirrel > Dog');
clientCode(monkey);
console.log('Subchain: Squirrel > Dog');
clientCode(squirrel);