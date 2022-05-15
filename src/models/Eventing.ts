type CallBack = () => void;

export class Eventing {
  events: { [key: string]: CallBack[] } = {};

  on = (eventName: string, callback: CallBack) => {
    const handlers = this.events[eventName] || [];
    // [f] || [];

    handlers.push(callback);
    // [f]
    this.events[eventName] = handlers;
    // click: [f]
  };

  trigger = (eventName): void => {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) return;

    handlers.forEach((callback) => callback());
  };
}
