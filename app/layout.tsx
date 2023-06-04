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
      <body className='h-screen w-screen flex justify-center items-center'>
        {children}
      </body>
    </html>
  )
}
