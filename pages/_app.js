import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import sequelize from '../lib/sequelize';
import Blog from '../models/Blog';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const syncDatabase = async () => {
      await sequelize.sync();
    };
    syncDatabase();
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;