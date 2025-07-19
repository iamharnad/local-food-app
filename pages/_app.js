// pages/_app.js
import '../styles/globals.css';
import MobileNavBar from '../components/MobileNavBar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Define routes where footer should be hidden
  const hideFooterOnRoutes = ['/login', '/profile-setup'];

  const shouldHideFooter = hideFooterOnRoutes.includes(router.pathname);

  return (
    <>
      <Component {...pageProps} />
      {!shouldHideFooter && <MobileNavBar />}
    </>
  );
}

export default MyApp;
