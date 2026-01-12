import { type ReactElement, type ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { SuccessMessageProvider } from "@/utils/providers/successMessageProvider";

export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: boolean;
  pageId?: string;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};


function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <div>{page}</div>);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="" />
        <link rel="icon" type="image/png" href="" />
        <link rel="apple-touch-icon" sizes="180x180" href="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>food recipes</title>
        {/* <meta
          name="description"
          content=""
        /> */}
      </Head>

      
        <SessionProvider session={pageProps.session}>
          <SuccessMessageProvider>
            {Component.auth ? (
              <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </SuccessMessageProvider>
        </SessionProvider>
    </>
  );
}

type AuthProps = {
  children: ReactNode;
};

function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { status } = useSession({ required: true });

  if (!router.isReady || status === "loading") {
    return;
  }

  return <>{children}</>;
}

export default MyApp;
