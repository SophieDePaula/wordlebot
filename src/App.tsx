import { Container } from "@mui/material";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Board from "./components/Board";

function App() {
    return (
        <Layout>
            <Container maxWidth="sm">
                <Header />
                <Board></Board>
                {/* Insert App here */}
            </Container>
        </Layout>
    );
}

export default App;

//https://localstorage24.z13.web.core.windows.net/