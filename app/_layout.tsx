import { NAV_THEME } from '@/lib/constants'
import { ModelProvider } from '@/lib/ModelContext'
import { useColorScheme } from '@/lib/useColorScheme'
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider
} from '@react-navigation/native'
import { PortalHost } from '@rn-primitives/portal'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/global.css'

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light
}
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export default function RootLayout() {
  const hasMounted = React.useRef(false)
  const { colorScheme, isDarkColorScheme } = useColorScheme()
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background')
      // Apply dark mode class to html element
      if (isDarkColorScheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    setIsColorSchemeLoaded(true)
    hasMounted.current = true
  }, [isDarkColorScheme])

  // Update dark mode class when color scheme changes
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      if (isDarkColorScheme) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [isDarkColorScheme])

  if (!isColorSchemeLoaded) {
    return null
  }

  return (
    <>
      <SafeAreaProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <ModelProvider>
            <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="notes/[id]"
                options={{ headerShown: false, animation: 'slide_from_right' }}
              />
              <Stack.Screen
                name="mind-maps/[id]"
                options={{ headerShown: false, animation: 'slide_from_right' }}
              />
              <Stack.Screen
                name="settings/ai"
                options={{
                  headerShown: false,
                  animation: 'slide_from_right'
                }}
              />
            </Stack>
          </ModelProvider>
        </ThemeProvider>
      </SafeAreaProvider>
      <PortalHost />
    </>
  )
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined'
    ? React.useEffect
    : React.useLayoutEffect
