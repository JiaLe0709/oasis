import Head from "next/head";
import ClickSpark from "./components/biteui/ClickSpark";
import "@/styles/globals.css"

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Oasis</title>
            </Head>
            <ClickSpark>
                <div>
                    {children}
                </div>
            </ClickSpark>
        </>
    );
}

export default Layout