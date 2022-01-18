/**
 * Implement a class named ring buffer with fixed capacity such that
 *
 * constructor: takes the capacity for the ring buffer
 *
 * push: adds a value to the ring buffer.
 * pop: removes the last value from the ring buffer or undefined if it's empty.
 * peek: returns the current value of the most recent value added or undefined if none have been added
 *
 * If we have too many values (exceeding capacity) the oldest values are lost.
 *
 * The ordering of the push operations must be kept.
 */
export class RingBuffer<T> {
  capacity: number;
  current: number;
  data: any[];
  constructor(capacity: number) {
    this.capacity = capacity;
    this.data = [];
    this.current = -1;
  }

  public push(value: T) {
    if (this.data.length === this.capacity) {
      this.data.shift();
      this.current -= 1;
    }
    this.data.push(value);
    this.current += 1;
  }

  public peek(): T | undefined {
    if (this.current > -1) {
      return this.data[this.current];
    }
    // not implemented
    return undefined;
  }

  public pop(): T | undefined {
    if (this.current > -1) {
      const pop = this.data.pop();
      return pop;
    }
    // not implemented
    return undefined;
  }
}
