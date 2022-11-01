import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core'
import { useState } from 'react'
import AppBar from './Templates/AppBar'
import ToDo from './Templates/Todo'

import theme from './theme'

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')

  const links = [
    {
      link: '',
      label: 'Home',
    },
    {
      link: '',
      label: 'Contact',
    },
  ]

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme, primaryColor: theme.primaryColor }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppBar links={links} />
        <ToDo />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
