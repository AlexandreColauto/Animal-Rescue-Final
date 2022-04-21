import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Layout from "../src/components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const APP_ID = process.env.NEXT_PUBLIC_APPID;
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVERURL;
  let isServerInfo = APP_ID && SERVER_URL ? true : false;
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!APP_ID || !SERVER_URL) {
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file."
    );
  }

  if (!showChild) {
    return null;
  }
  if (isServerInfo) {
    return (
      <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </MoralisProvider>
    );
  }
}

export default MyApp;
