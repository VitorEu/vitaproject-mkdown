export const metadata = {
  title: 'Markdown Editor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-color-mode="light">
      <body>{children}</body>
    </html>
  )
}
