import { Axios, AxiosPromise, AxiosResponse } from 'axios';
import { Attributes } from './Attributes';

interface ModelAttributes<T> {
  set(value: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger('change');
  }

  async fetch(): Promise<void> {
    try {
      const id = this.get('id');
      if (typeof id !== 'number') throw new Error('Cannot fetch without id');

      const response: AxiosResponse = await this.sync.fetch(id);
      this.set(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async save(): Promise<void> {
    try {
      const response = await this.sync.save(this.attributes.getAll());
      this.trigger('save');
    } catch (error) {
      this.trigger('error');
    }
  }
}
