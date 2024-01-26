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
import { hexToRGB } from './utils';

export * from './types';
export { hexToRGB };

type DefaultThemeType = 'light' | 'dark';
type ConfigObject = Record<string, Record<string, string>>;

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

    Object.keys(config[themeName]).forEach((colorName) => {
      const colorValue = config[themeName][colorName];

      if (!colorValue) {
        return;
      }

      const rgb = hexToRGB(colorValue);

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
    corePlugins: {
      preflight: false,
    },
    plugins: [
      plugin(({ addBase, addUtilities, addVariant, theme }) => {
        addBase({
          '*, *::before, *::after': {
            boxSizing: 'border-box',
            borderWidth: '0',
            borderStyle: 'solid',
            borderColor: `rgb(var(--${cssVarPrefix}-border-default))`,
          },
          '*': {
            margin: '0',
          },
          html: {
            textSizeAdjust: '100%',
          },
          body: {
            fontFamily: theme('fontFamily.sans'),
            fontSize: theme('fontSize.base'),
            lineHeight: theme('fontSize.base[1]', 'lineHeight.normal'),
            color: `rgb(var(--${cssVarPrefix}-fg-default))`,
            backgroundColor: `rgb(var(--${cssVarPrefix}-bg-default))`,
          },
          'img, picture, video, canvas, svg': {
            display: 'block',
            maxWidth: '100%',
          },
          'input, button, textarea, select': {
            font: 'inherit',
          },
          'p, h1, h2, h3, h4, h5, h6': {
            overflowWrap: 'break-word',
          },
          'code, kbd, samp, pre': {
            fontFamily: theme('fontFamily.mono'),
            fontFeatureSettings: theme('fontFamily.mono[1].fontFeatureSettings', 'normal'),
            fontVariationSettings: theme('fontFamily.mono[1].fontVariationSettings', 'normal'),
          },
          a: {
            color: 'inherit',
            textDecoration: 'inherit',
          },
          'button, [role=button]': { cursor: 'pointer' },
          'button, [type=button], [type=reset], [type=submit]': {
            appearance: 'button',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
          },
          '#root, #__next': {
            isolation: 'isolate',
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
