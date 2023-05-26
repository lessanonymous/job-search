const nextElementInList = <T>(currentElement: T, list: T[]) => {
  const currentElementIndex = list.findIndex(
    (element) => element === currentElement
  );
  const nextElementIndex = (currentElementIndex + 1) % list.length;
  return list[nextElementIndex];
};

export default nextElementInList;
