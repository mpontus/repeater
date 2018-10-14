export interface IRoundRobin {
  write(data: Float32Array): void;

  readLast(length: number): Float32Array;
}

export class RoundRobin implements IRoundRobin {
  private readonly buffer: Float32Array;
  private offset: number = 0;

  constructor(size: number) {
    this.buffer = new Float32Array(size);
    this.offset = 0;
  }

  write(data: Float32Array) {
    if (this.offset + data.length > this.buffer.length) {
      this.buffer.set(
        data.subarray(0, this.buffer.length - this.offset),
        this.offset
      );
      this.buffer.set(data.subarray(this.buffer.length - this.offset));
      this.offset = this.buffer.length - this.offset;
    } else {
      this.buffer.set(data, this.offset);
      this.offset += data.length;
    }
  }

  readLast(length: number): Float32Array {
    length = Math.min(this.buffer.length, length);

    if (length <= this.offset) {
      return this.buffer.slice(this.offset - length, this.offset);
    }

    const output = new Float32Array(length);

    output.set(
      this.buffer.subarray(this.buffer.length - (length - this.offset))
    );
    output.set(this.buffer.subarray(0, this.offset), length - this.offset);

    return output;
  }
}

export default RoundRobin;
