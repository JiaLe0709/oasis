import Head from "next/head";
//import ClickSpark from "./components/biteui/ClickSpark";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Oasis</title>
            </Head>
            <div>
                {children}
            </div>
        </>
    );
}

export default Layout