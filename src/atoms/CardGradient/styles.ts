/* eslint-disable @typescript-eslint/dot-notation */
import { createStyles } from '@mantine/core'
import { ColorProps } from './types'

const useStyles = createStyles((theme, colors: ColorProps) => {
  const primary = theme.colors[colors.primary[0]][colors.primary[1]]
  const secondary = theme.colors[colors.secondary[0]][colors.secondary[1]]

  return {
    card: {
      position: 'relative',
      cursor: 'pointer',
      overflow: 'hidden',
      transition: 'transform 150ms ease, box-shadow 100ms ease',
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,

      '&:hover': {
        boxShadow: theme.shadows.md,
        transform: 'scale(1.02)',
      },

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 6,
        backgroundImage: theme.fn.linearGradient(0, primary, secondary),
      },
    },
  }
})

export default useStyles
