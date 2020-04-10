class Prototype {
  public primitive: string | number | boolean | undefined;
  public component: object;
  public circularReference: ComponentWithBackReference;

  public clone(): this {
    const clone = Object.create(this);

    clone.component = Object.create(this.component);

    clone.circularReference = {
      ...this.circularReference,
      prototype: clone
    }

    return clone;
  }
}

class ComponentWithBackReference {
  public prototype: Prototype;

  constructor(prototype: Prototype) {
    this.prototype = prototype;
  }
}

const p1= new Prototype();
p1.primitive = 123;
p1.component = new Date();
p1.circularReference = new ComponentWithBackReference(p1);

const p2 = p1.clone();

if (p1.primitive === p2.primitive) console.log('primitive cloned');
if (p1.component !== p2.component) console.log('component cloned');
if (p1.circularReference !== p2.circularReference) console.log('circular cloned');
if (p2 === p2.circularReference.prototype) console.log('linked to clone');