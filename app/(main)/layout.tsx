import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <h1>Layout</h1>
      {children}
    </div>
  )
}
