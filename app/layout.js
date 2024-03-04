import ThemeRegistry from '@/theme/ThemeRegistry'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './redux/StoreProvider';

export const metadata = {
  title: 'Started code',
  description: 'By ADS Frontend Team',
}

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
      <html lang="en">
        <ThemeRegistry>
          <body id="__next">{children}</body>
        </ThemeRegistry>
      </html>
    </StoreProvider>
  )
}
