import { AppProps } from "next/app";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
