export function assertIsDefined<T>(val: T, errorMessage?: string): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new Error(errorMessage || `Expected 'val' to be defined, but received ${val}`);
  }
}
