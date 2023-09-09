import Button from '@mui/material/Button'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Layout</h1>
      <Button variant="contained">Hello world</Button>
      {children}
    </div>
  )
}
