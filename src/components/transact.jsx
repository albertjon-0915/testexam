import React, { useState } from "react";
import { ethers, parseUnits } from "ethers";

const networks = {
     ETH: {
          chainId: 1,
          chainName: "Ethereum Mainnet",
          nativeCurrency: {
               name: "Ether",
               symbol: "ETH",
               decimals: 18,
          },
     },
     Polygon: {
          chainId: 137,
          chainName: "Polygon Mainnet",
          nativeCurrency: {
               name: "MATIC",
               symbol: "MATIC",
               decimals: 18,
          },
     },
};

function Transaction({ address }) {
     const [recipient, setRecipient] = useState("");
     const [amount, setAmount] = useState(0);
     const [network, setNetwork] = useState("ETH");

     const decimals = {
          ETH: 18,
          USDT: 6,
          DAI: 18,
     };

     const sendTransaction = async (e) => {
          e.preventDefault();
          try {
               let converted = await parseUnits(amount, decimals[network]);
               console.log(converted);

               let params = [
                    {
                         from: address,
                         to: recipient,
                         gas: Number(21000).toString(16),
                         gasPrice: Number(2500000).toString(16),
                         value: Number(converted).toString(16),
                    },
               ];

               const result = await window.ethereum.request({
                    method: "eth_sendTransaction",
                    params: params,
               });
               console.log("Transaction hash:", result);

               if (result) {
                    setRecipient("");
                    setAmount(0);
                    setNetwork("ETH");
               }
          } catch (err) {
               console.log(err);
          }
     };

     // const changeNetworkChain = async () => {
     //      const provider = window.ethereum;
     //      if (!provider) {
     //           console.error("No provider found");
     //           return;
     //      }

     //      const networkKey = network;
     //      const networkData = networks[networkKey];
     //      if (!networkData) {
     //           console.error("Network not supported");
     //           return;
     //      }

     //      try {
     //           await provider.request({
     //                method: "wallet_switchEthereumChain",
     //                params: [{ chainId: networkData.chainId }],
     //           });

     //      } catch (err) {
     //           if (err.code === 4902) {
     //                try {
     //                     await provider.request({
     //                          method: "wallet_addEthereumChain",
     //                          params: [networkData],
     //                     });
     //                } catch (addError) {
     //                     console.error("Failed to add network", addError);
     //                }
     //           } else {
     //                console.error("Failed to switch network", err);
     //           }
     //      }
     // };

     return (
          <div>
               <h1>Send transaction</h1>
               <form action="submit" onSubmit={(e) => sendTransaction(e)}>
                    <label htmlFor="" className="px-2">
                         <div>recipient</div>
                         <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
                    </label>
                    <label htmlFor="" className="px-2">
                         <div>amount</div>
                         <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <label htmlFor="" className="px-2">
                         <div>Currency</div>
                         <select value={network} onChange={(e) => setNetwork(e.target.value)}>
                              <option value="ETH">ETH</option>
                              <option value="USDT">USDT</option>
                              <option value="DAI">DAI</option>
                         </select>
                    </label>
                    <button type="submit">send</button>
               </form>
          </div>
     );
}

export default Transaction;
