import Head from 'next/head';
import { FC, PropsWithChildren, useContext } from 'react';
import { LogoDark, LogoLight } from '../../components/Icons/Icons';
import { ThemeContext } from '../../store/ThemeContext';
import { signIn, getSession, GetSessionParams } from 'next-auth/react';
import { Input } from '../../components/Inputs/Inputs';
import { ButtonPrimary } from '../../components/Buttons/Buttons';
import useInput from '../../hooks/useInput';

// Provider button component for OAuth login
const ProviderButton: FC<PropsWithChildren<{ provider: string; className?: string; icon?: string }>> = (props) => {
    return (
        <button
            onClick={() => signIn(props.provider)}
            className={`mt-4 flex w-full items-center justify-center rounded-md py-3 px-4 font-bold ${props.className ?? ''
                }`}
        >
            {props.icon && <img src={props.icon} alt={`${props.provider} icon`} className="h-6 w-6" />}
            <span className="flex-grow">{props.children}</span>
        </button>
    );
};

// Login page component with OAuth and email authentication
export default function Home() {
    const { darkModeEnabled } = useContext(ThemeContext);
    const emailInput = useInput<string>({
        validateFn: (value) => {
            if (!value) return [false, ''];
            if (
                // Valid email regex
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    value.toLocaleLowerCase()
                )
            ) {
                return [true, ''];
            }
            return [false, 'Invalid email'];
        },
    });

    const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        emailInput.setIsTouched(true);
        if (!emailInput.hasError) {
            signIn('email', { email: emailInput.value });
        }
    };

    return (
        <div className={darkModeEnabled ? 'dark' : ''}>
            <Head>
                <title>Login - Kanban</title>
                <meta name="description" content="Login to your Kanban account" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.svg" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center bg-light-grey p-6 dark:bg-dark-grey">
                <div className="mb-8">
                    {darkModeEnabled ? <LogoDark /> : <LogoLight />}
                </div>
                <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-dark-grey">
                    <h1 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">Welcome Back!</h1>
                    <p className="mb-8 text-center text-mid-grey dark:text-light-grey">
                        Sign in to your account to continue
                    </p>

                    <form onSubmit={handleEmailSubmit} className="mb-6">
                        <Input
                            value={emailInput.value ?? ''}
                            onChange={emailInput.valueChangeHandler}
                            onBlur={emailInput.inputBlurHandler}
                            haserror={emailInput.hasError}
                            errorMsg={emailInput.errorMsg}
                            label="Email Address"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className="mb-4"
                        />
                        <ButtonPrimary type="submit" className="w-full">
                            Sign in with Email
                        </ButtonPrimary>
                    </form>

                    <div className="mb-6 text-center text-mid-grey dark:text-light-grey">or</div>

                    <ProviderButton
                        provider="google"
                        className="border border-lines-dark bg-white text-black hover:bg-lines-light dark:bg-dark-grey dark:text-white dark:hover:bg-lines-dark"
                    >
                        Sign in with Google
                    </ProviderButton>

                    <ProviderButton
                        provider="github"
                        className="border border-lines-dark bg-white text-black hover:bg-lines-light dark:bg-dark-grey dark:text-white dark:hover:bg-lines-dark"
                    >
                        Sign in with GitHub
                    </ProviderButton>
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(context: GetSessionParams) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}
