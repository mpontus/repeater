/**
 * Utility function to filter actions by key with type narrowing
 */
export const ofType = <T extends { key: string }, K extends string>(key: K) => (
  action: T
): action is Extract<T, { key: K }> => {
  return action.key == key;
};

/**
 * Another simple utility function which filters by the value
 */
export const is = <T>(x: T) => (y: T) => x === y;
