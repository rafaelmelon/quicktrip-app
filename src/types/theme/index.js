import { shape, number, string } from "prop-types";

export const colorsType = shape({
  white: string,
  catskillWhite: string,
  athensGray: string,
  iron: string,
  geyser: string,
  osloGray: string,
  nevada: string,
  steelGray: string,
  mirage: string,
  blackPearl: string,
  cream: string,
  chardonnay: string,
  magicMint: string,
  eden: string,
  torchRed: string,
  monza: string,
  concrete: string,
  alto: string,
  dustyGray: string,
  emperor: string,
  mineShaft: string,
  heather: string,
  morningGlory: string,
  pelorous: string,
  contessa: string
}).isRequired;

export const fontsType = shape({
  ibmPlexSans: string,
  iaWriter: string,
  openSans: string
}).isRequired;

export const fontSizeType = shape({
  xxxl: string,
  xxl: string,
  xl: string,
  lg: string,
  md: string,
  nm: string,
  sm: string
}).isRequired;

export const fontWeightType = shape({
  thin: number,
  extraLight: number,
  light: number,
  regular: number,
  medium: number,
  semiBold: number,
  bold: number,
  extraBold: number,
  black: number
}).isRequired;

export const iconSizetType = shape({
  nm: number,
  sm: number
}).isRequired;

export const themeType = shape({
  media: shape({}),
  colors: colorsType,
  fonts: fontsType,
  fontSize: fontSizeType,
  fontWeight: fontWeightType,
  iconSize: iconSizetType,
  helpers: shape({})
});
