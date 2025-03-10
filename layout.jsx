import Head from "next/head";

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