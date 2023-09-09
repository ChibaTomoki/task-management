'use client'

import MuiBox from '@mui/material/Box'
import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent, ReactNode, SyntheticEvent } from 'react'

function samePageLinkNavigation(
  event: MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false
  }
  return true
}

interface LinkTabProps {
  label?: string
  href?: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <MuiTab
      component="a"
      onClick={(event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault()
        }
      }}
      {...props}
    />
  )
}

export default function MainLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const value = pathname === '/board' ? 0 : pathname === '/table' ? 1 : 2

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      if (newValue === 0) router.push('/board')
      if (newValue === 1) router.push('/table')
      if (newValue === 2) router.push('/')
    }
  }

  return (
    <div>
      <MuiBox sx={{ width: '100%' }}>
        <MuiTabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Board" href="/board" />
          <LinkTab label="Table" href="/table" />
          <LinkTab label="Other" href="/" />
        </MuiTabs>
      </MuiBox>
      {children}
    </div>
  )
}
