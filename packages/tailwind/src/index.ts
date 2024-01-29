import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { scrollbar } from './plugins/scrollbar';
import { borderRadius } from './tokens/border-radius';
import { borderWidth } from './tokens/border-width';
import { colorsPalette } from './tokens/colors-palette';
import { colorsSemantic } from './tokens/colors-semantic';
import { fontFamily } from './tokens/font-family';
import { fontSize } from './tokens/font-size';
import { fontWeight } from './tokens/font-weight';
import { screens } from './tokens/screens';
import { flattenColorPalette, rgbFromHex } from './utils';

export * from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MaybeNested<K extends keyof any = string, V = string> = {
  [key: string]: V | MaybeNested<K, V>;
};

type DefaultThemeType = 'light' | 'dark';
type ConfigObject = Record<string, MaybeNested>;

export type PresetConfig = {
  themes?: ConfigObject;
  defaultTheme?: DefaultThemeType;
  cssVarPrefix?: string;
};

const resolveConfig = (config: ConfigObject, defaultTheme: DefaultThemeType, cssVarPrefix: string) => {
  const resolved: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    utilities: Record<string, Record<string, any>>;
    colors: Record<string, string>;
  } = {
    utilities: {},
    colors: {},
  };

  Object.keys(config).forEach((themeName) => {
    let cssSelector = `.${themeName}, [data-theme="${themeName}"]`;

    if (themeName === defaultTheme) {
      cssSelector = `:root, ${cssSelector}`;
    }

    resolved.utilities[cssSelector] = {};

    const flatColors = flattenColorPalette(config[themeName]);

    Object.keys(flatColors).forEach((colorName) => {
      const colorValue = flatColors[colorName];

      if (!colorValue) {
        return;
      }

      const rgb = rgbFromHex(colorValue);

      const colorVariable = `--${cssVarPrefix}-${colorName}`;

      resolved.utilities[cssSelector][colorVariable] = `${rgb.r} ${rgb.g} ${rgb.b}`;

      resolved.colors[colorName] = `rgb(var(${colorVariable}) / <alpha-value>)`;
    });
  });

  return resolved;
};

const preset = (config: PresetConfig | undefined = {}): Partial<Config> => {
  const cssVarPrefix = config?.cssVarPrefix || 'r';

  const resolved = resolveConfig(
    {
      light: colorsSemantic.light,
      dark: colorsSemantic.dark,
    },
    config?.defaultTheme || 'light',
    cssVarPrefix,
  );

  return {
    darkMode: 'class',
    theme: {
      screens,
      fontFamily,
      fontSize,
      colors: { ...colorsPalette, ...resolved.colors },
      borderColor: ({ theme }) => ({
        ...theme('colors'),
        DEFAULT: `rgb(var(--${cssVarPrefix}-border-default))`,
      }),
      borderWidth,
      borderRadius,
      fontWeight,
    },
    plugins: [
      plugin(({ addBase, addUtilities, addVariant, theme }) => {
        addBase({
          body: {
            fontSize: theme('fontSize.base'),
            lineHeight: theme('fontSize.base[1]', 'lineHeight.normal'),
            color: `rgb(var(--${cssVarPrefix}-fg-default))`,
            backgroundColor: `rgb(var(--${cssVarPrefix}-bg-default))`,
          },
        });
        addUtilities(resolved.utilities);
        addVariant('active', ['&[data-active]', '&:active']);
        addVariant('opened', '&[data-opened]');
      }),
      scrollbar(cssVarPrefix),
    ],
  };
};

// noinspection JSUnusedGlobalSymbols
export default { preset };
