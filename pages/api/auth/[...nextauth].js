// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        // Aquí puedes agregar la lógica para verificar las credenciales
        if (credentials.username === 'admin' && credentials.password === '1234') {
          return { id: 1, name: 'Admin' };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET
});