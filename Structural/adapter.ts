class Target {
  public request(): string {
    return 'Target: default behavior.';
  }
}

class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `Adapter: Translated - ${result}`;
  }
}

function clientCode(target: Target) {
  console.log(target.request());
}

console.log('regular target object');
clientCode(new Target);

console.log('adaptee is incompatible');
const adaptee = new Adaptee();
console.log(adaptee.specificRequest());

console.log('adaptee becames compatible with adapter');
clientCode(new Adapter(adaptee));