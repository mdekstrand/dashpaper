import { useEffect } from "preact/hooks";
export type EventListener = (...args: any[]) => void;

type ListenerMap = {
  [key: string]: EventListener;
};
type EventListeners = {
  [key: string]: ListenerMap;
};

export class Subscription {
  emitter: EventEmitter;
  event: string;
  id: string;

  constructor(emitter: EventEmitter, event: string, id: string) {
    this.emitter = emitter;
    this.event = event;
    this.id = id;
  }

  disconnect() {
    this.emitter._disconnect(this.event, this.id);
  }
}

/**
 * Event emitter base class.
 *
 * I really shouldn't have needed to create this.
 */
export class EventEmitter {
  #listeners: EventListeners = {};

  constructor() {
  }

  on(event: string, callback: EventListener): Subscription {
    let id = crypto.randomUUID();
    this.#listeners[event] ??= {};
    this.#listeners[event][id] = callback;
    return new Subscription(this, event, id);
  }

  /**
   * Listen to an event in a Preact hook.
   * @param evt The event name.
   * @param callback The event listener callback.
   */
  hook(evt: string, callback: EventListener) {
    useEffect(() => {
      let sub = this.on(evt, callback);
      return () => sub.disconnect();
    });
  }

  _disconnect(evt: string, id: string) {
    let evls = this.#listeners[evt];
    if (evls && evls[id]) {
      delete evls[id];
    }
  }

  emit(evt: string, ...args: any[]) {
    let evls = this.#listeners[evt] ?? {};
    for (let id in evls) {
      let proc = evls[id];
      proc(...args);
    }
  }
}
