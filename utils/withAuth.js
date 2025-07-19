// hoc/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config'; // Adjust path as needed
import { useState } from 'react';

const withAuth = (WrappedComponent) => {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.replace(`/login?redirect=${router.pathname}`);
        } else {
          setLoading(false);
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>; // Optional: Show spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
