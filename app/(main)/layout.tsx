'use client'

import MuiBox from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Tab from '@mui/material/Tab'
import { default as Tabs } from '@mui/material/Tabs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, SyntheticEvent, useMemo } from 'react'

type TabLink = '/board' | '/table' | '/'

export default function MainLayout({ children }: { children: ReactNode }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (event: SyntheticEvent, newValue: TabLink) => {
    router.push(newValue)
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MuiBox sx={{ width: '100%' }}>
          <MuiBox sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={pathname} onChange={handleChange} aria-label="tabs">
              <Tab label="Board" value="/board" />
              <Tab label="Table" value="/table" />
              <Tab label="Other" value="/" />
            </Tabs>
          </MuiBox>
        </MuiBox>
        {children}
      </ThemeProvider>
    </div>
  )
}
