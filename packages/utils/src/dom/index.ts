export const isBrowser = () => {
  return typeof window !== 'undefined' && !!window.document?.createElement;
};

export const isButton = (element: { tagName: string; type?: string }) => {
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'button') {
    return true;
  }

  if (tagName === 'input' && element.type) {
    return ['button', 'color', 'file', 'image', 'reset', 'submit'].indexOf(element.type) !== -1;
  }

  return false;
};
