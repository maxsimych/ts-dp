interface Iter<T> {
  current(): T;
  next(): T;
  key(): number;
  valid(): boolean;
  rewind(): void;
}

interface Aggregator {
  getIterator(): Iter<string>;
}

class DefaultOrderIterator implements Iter<string> {
  private collection: WordsCollection;
  private reverse = false;
  private position = 0;

  constructor(collection: WordsCollection, reverse = false) {
    this.collection = collection;
    this.reverse = reverse;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  public next(): string {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  };
  current(): string {
    return this.collection.getItems()[this.position];
  }
  key(): number {
    return this.position;
  }
  valid(): boolean {
    if (this.reverse) {
      return this.position >= 0
    }
    return this.position < this.collection.getCount();
  }
  rewind(): void {
    this.position = this.reverse
      ? this.collection.getCount() - 1
      : 0
  }
}

class WordsCollection implements Aggregator {
  private items: string[] = [];

  public getItems(): string[] {
    return this.items;
  }

  public  getCount(): number {
    return this.items.length;
  }

  public addItem(item: string): void {
    this.items.push(item);
  }

  public getIterator(): Iter<string> {
    return new DefaultOrderIterator(this)
  }

  public getReverseIterator(): Iter<string> {
    return new DefaultOrderIterator(this, true);
  }
}

const collection = new WordsCollection();
collection.addItem('First');
collection.addItem('Second');
collection.addItem('Third');

const iterator = collection.getIterator();

while (iterator.valid()) {
  console.log(iterator.next());
}

console.log('Reverse traversal:');
const reverseIterator = collection.getReverseIterator();
while (reverseIterator.valid()) {
  console.log(reverseIterator.next());
}