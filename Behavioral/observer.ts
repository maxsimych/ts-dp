interface Observable<T> {
  registerObserver(o: Observer<T>): void;
  removeObserver(o: Observer<T>): void;
  notifyObservers(): void;
}

interface Observer<T> {
  update(value: T): void;
}

class StringStorage implements Observable<string> {
  private value: string;

  private observers: Observer<string>[] = [];

  public registerObserver(o: Observer<string>): void {
    this.observers.push(o);
  }
  public removeObserver(o: Observer<string>): void {
    const index = this.observers.indexOf(o);
    if (index === -1) throw new Error('Observer not found');

    this.observers.splice(index, 1);
  }

  public setValue(str: string): void {
    console.log(`New string is: ${str}`);
    this.value = str;
    this.notifyObservers();
  }
  public notifyObservers(): void {
    this.observers.forEach(observer => observer.update(this.value));
  }
}

class LengthCounter implements Observer<string> {
  private observable: Observable<string>;

  constructor(stringStorage: Observable<string>) {
    this.observable = stringStorage;
    stringStorage.registerObserver(this);
  } 

  public update(value: string): void {
    console.log(`New string length is: ${value.length}`)
  }
}

class SubstringCounter implements Observer<string> {
  private observable: Observable<string>;
  private substring: string;

  constructor(stringStorage: Observable<string>, substring: string) {
    this.observable = stringStorage;
    this.substring = substring;
    stringStorage.registerObserver(this);
  }

  public update(value: string): void {
    const regExp = new RegExp(this.substring, 'gi');
    const subArr = value.match(regExp) ?? [];
    console.log(`New string containts substring "${this.substring}" ${subArr.length} times`)
  }
}

const strStorage = new StringStorage();

const lengthCounter = new LengthCounter(strStorage);

const substrCounter = new SubstringCounter(strStorage, 'a');

strStorage.setValue('Hello World!');

strStorage.setValue('A bird in hand is worth two in the bush.');