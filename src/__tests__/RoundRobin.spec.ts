import RoundRobin from "../RoundRobin";

it("wraps around", () => {
  const buffer = new RoundRobin(6);

  buffer.write(new Float32Array([1, 2, 3, 4]));

  expect(Array.from(buffer.readLast(4))).toEqual([1, 2, 3, 4]);
  expect(Array.from(buffer.readLast(5))).toEqual([0, 1, 2, 3, 4]);
  expect(Array.from(buffer.readLast(6))).toEqual([0, 0, 1, 2, 3, 4]);

  buffer.write(new Float32Array([5, 6, 7, 8]));

  expect(Array.from(buffer.readLast(4))).toEqual([5, 6, 7, 8]);
  expect(Array.from(buffer.readLast(5))).toEqual([4, 5, 6, 7, 8]);
  expect(Array.from(buffer.readLast(6))).toEqual([3, 4, 5, 6, 7, 8]);
});
