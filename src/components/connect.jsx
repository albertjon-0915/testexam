import React, { useState, useEffect, useContext } from "react";
import { ethers, BrowserProvider } from "ethers";
import Web3Modal from "web3modal";

import Transaction from "./transact";
import { AccountContext } from "../context";

const web3Modal = new Web3Modal({
     networks: [
          {
               name: "Sepolia Testnet",
               chainId: 1666603396,
               rpcUrl: "https://sepolia-testnet-rpc.allthatnode.com:8545",
          },
     ],
     cacheProvider: true,
     providerOptions: {},
});

function Connect() {
     const { account, setAccount } = useContext(AccountContext);
     const { setProvider } = useContext(AccountContext);
     const { signer, setSigner } = useContext(AccountContext);
     const { setTransactions } = useContext(AccountContext);
     const [balance, setBalance] = useState(null);
     // const [signer, setSigner] = useState(null);

     const connectWallet = async () => {
          try {
               const instance = await web3Modal.connect();

               const provider = new ethers.BrowserProvider(instance);
               setProvider(provider);

               const signer = await provider.getSigner();
               setSigner(signer);

               const address = signer.address;
               setAccount(address);

               const balance = await provider.getBalance(address);

               const formattedBalance = ethers.formatEther(balance);
               setBalance(formattedBalance);

               instance.on("accountsChanged", (accounts) => {
                    setAccount(accounts[0]);
               });

               instance.on("disconnect", (error) => {
                    console.log("Disconnected:", error);
                    disconnectWallet();
               });

               //
          } catch (error) {
               console.error("Could not connect to wallet:", error);
          }
     };

     const disconnectWallet = async () => {
          await web3Modal.clearCachedProvider();
          setTransactions(null);
          setProvider(null);
          setAccount(null);
          setSigner(null);
     };

     useEffect(() => {
          if (web3Modal.cachedProvider) {
               connectWallet();
          }
     }, []);

     return (
          <div style={styles.container}>
               <h2>Connect Your Wallet</h2>
               {account ? (
                    <div>
                         <h1>Connected Account:</h1> {account}
                         <p>balance: {balance}</p>
                         <button style={styles.button} onClick={disconnectWallet}>
                              Disconnect Wallet
                         </button>
                         {signer && <Transaction address={account} />}
                    </div>
               ) : (
                    <button style={styles.button} onClick={connectWallet}>
                         Connect Wallet
                    </button>
               )}
          </div>
     );
}

// Simple styling for the component
const styles = {
     container: {
          textAlign: "center",
          marginTop: "50px",
     },
     button: {
          padding: "10px 20px",
          backgroundColor: "#f6851b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
     },
};

export default Connect;
