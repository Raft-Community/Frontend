import './globals.css'

export const metadata = {
  title: 'Raft Community',
  description: 'A raft based distributed community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
