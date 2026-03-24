import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ThemeContextProvider from '../store/ThemeContext';
import BoardListContextProvider from '../store/BoardListContext';
import { SessionProvider } from 'next-auth/react';

// Main App component with context providers
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <ThemeContextProvider>
                <BoardListContextProvider>
                    <Component {...pageProps} />
                </BoardListContextProvider>
            </ThemeContextProvider>
        </SessionProvider>
    );
}
