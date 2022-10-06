import { Paper } from '@mantine/core'
import theme from '../../theme'
import useStyles from './styles'
import { CardGradientProps, ColorProps } from './types'

const defaultColors: ColorProps = {
  primary: [theme.primaryColor, 5],
  secondary: [theme.primaryColor, 5],
}

export default function CardGradient({
  children,
  colors = defaultColors,
}: CardGradientProps) {
  const { classes } = useStyles(colors)

  return (
    <Paper withBorder radius="md" className={classes.card}>
      {children}
    </Paper>
  )
}
