import "./App.css";
import Connect from "./components/connect";
import Transaction from "./components/transact";
import ShopMockNFT from "./components/shopMockNFT";
import Logs from "./components/logs";

import { AccountProvider } from "./context";

function App() {
     return (
          <AccountProvider>
               <h1 className="p-5">Technical Exam</h1>
               <Connect />
               <ShopMockNFT />
               <Logs />
          </AccountProvider>
     );
}

export default App;
