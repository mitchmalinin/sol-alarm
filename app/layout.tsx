import '../globals.css'
import PrivyProvider from '../providers/PrivyProvider'
import ClientLayout from './ClientLayout'

export const metadata = {
  title: 'Alarm Clock App',
  description: 'A simple alarm clock application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PrivyProvider>
          <ClientLayout>{children}</ClientLayout>
        </PrivyProvider>
      </body>
    </html>
  )
}
