// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenColorPalette = (colors: Record<string, any>): Record<string, string> =>
  Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      (values !== null && typeof values === 'object')
        ? Object.entries(flattenColorPalette(values)).map(([name, value]) => ({
            [color + (name === 'DEFAULT' ? '' : `-${name}`)]: value,
          }))
        : [{ [color]: values }],
    ),
  );

export const rgbFromHex = (color: string) => {
  const rgb = { r: 0, g: 0, b: 0 };

  if (color.length == 4) {
    rgb.r = parseInt(color[1] + color[1], 16);
    rgb.g = parseInt(color[2] + color[2], 16);
    rgb.b = parseInt(color[3] + color[3], 16);
  } else if (color.length == 7) {
    rgb.r = parseInt(color[1] + color[2], 16);
    rgb.g = parseInt(color[3] + color[4], 16);
    rgb.b = parseInt(color[5] + color[6], 16);
  }

  return rgb;
};
