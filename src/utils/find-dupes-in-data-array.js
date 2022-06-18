export default function findDupesInData(arr) {
  const duplicates = new Set();

  const result = arr.filter((item) => {
    if (duplicates.has(item)) {
      return true;
    }
    duplicates.add(item);
    return false;
  });
  return result;
}
