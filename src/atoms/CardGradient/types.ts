type ColorOptions = [string, number]

export interface ColorProps {
  primary: ColorOptions
  secondary: ColorOptions
}

export interface CardGradientProps {
  children: React.ReactNode
  colors?: ColorProps
}
