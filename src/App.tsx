import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core'
import { useState } from 'react'
import AppBar from './templates/AppBar'
import Todo from './templates/Todo'
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
        <Todo />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
