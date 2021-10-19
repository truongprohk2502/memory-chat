export const getTranslateNumber = (element: HTMLElement) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrixReadOnly(style.transform);
  const translateX = matrix.m41;
  const translateY = matrix.m42;
  return { translateX, translateY };
};
