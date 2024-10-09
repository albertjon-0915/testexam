import { createContext, useState } from "react";

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
     const [account, setAccount] = useState(null);
     const [provider, setProvider] = useState(null);
     const [signer, setSigner] = useState(null);
     const [transactions, setTransactions] = useState([]);
     const [selectedChain, setSelectedChain] = useState(null);

     return (
          <AccountContext.Provider
               value={{
                    account,
                    setAccount,
                    provider,
                    setProvider,
                    signer,
                    setSigner,
                    transactions,
                    setTransactions,
                    selectedChain,
                    setSelectedChain,
               }}
          >
               {children}
          </AccountContext.Provider>
     );
};

export { AccountProvider, AccountContext };
