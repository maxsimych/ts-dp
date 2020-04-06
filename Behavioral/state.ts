abstract class Context {
  protected state: State;

  constructor(state: State) {
    this.setState(state);
  }

  public abstract setState(state: State): void;
  public abstract getState(): State;
}

abstract class State {
  protected context: Context;

  public setContext(context: Context) {
    this.context = context;
  }

  public abstract cancelOrder(): void;
  public abstract verifyPayment(): void;
  public abstract shipOrder(): void;
}

class Order extends Context {
  public setState(state: State): void {
    console.log(`Order: setting state to ${(state as any).constructor.name}`);
    this.state = state;
    this.state.setContext(this);
  }

  public getState(): State {
    return this.state;
  }
}

class PaymentPendingState extends State {
  public cancelOrder(): void {
    console.log('Cancelling pending order');
    this.context.setState(new CanceledOrderState());
  }
  public verifyPayment(): void {
    console.log('Verifying order');
    this.context.setState(new OrderBeingPreparedState());
  }
  public shipOrder(): void {
    console.log('Order is not verified!');
  }
}

class CanceledOrderState extends State {
  public cancelOrder(): void {
    console.log('Order already cancelled!');
  }
  public verifyPayment(): void {
    console.log('Can not verify cancelled order');
  }
  public shipOrder(): void {
    console.log('Order is cancelled')
  }

}

class OrderBeingPreparedState extends State {
  public cancelOrder(): void {
    console.log('Cancelling verified order');

  }
  public verifyPayment(): void {
    console.log('Already verified');
  }
  public shipOrder(): void {
    console.log('Shipping order');
    this.context.setState(new OrderShippedState());
  }

}

class OrderShippedState extends State {
  public cancelOrder(): void {
    console.log('Cannot cancel shipped order');
  }
  public verifyPayment(): void {
    console.log('Cannot verify shipped order');
  }
  public shipOrder(): void {
    console.log('Order already shipped!');
  }

}

const order = new Order(new PaymentPendingState());
console.log((order as any).getState().constructor.name)
order.getState().cancelOrder();
console.log((order as any).getState().constructor.name)
order.getState().shipOrder();