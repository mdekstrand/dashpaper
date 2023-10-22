export type EventListener = (...args: any[]) => void;

type ListenerMap = {
  [key: string]: EventListener[];
};

/**
 * Event emitter base class.
 *
 * I really shouldn't have needed to create this.
 */
export class EventEmitter {
  #listeners: ListenerMap = {};

  constructor() {
  }

  on(evt: string, callback: EventListener) {
    this.#listeners[evt] ??= [];
    this.#listeners[evt].push(callback);
  }

  emit(evt: string, ...args: any[]) {
    for (let proc of this.#listeners[evt] ?? []) {
      proc(...args);
    }
  }
}
