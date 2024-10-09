import React, { useContext, useState, useEffect } from "react";
import { AccountContext } from "../context";
import { ethers } from "ethers";

function Logs() {
     const { transactions, setTransactions } = useContext(AccountContext);
     const { account, provider } = useContext(AccountContext);
     console.log(account, provider);

     useEffect(() => {
          const fetchTransactions = async () => {
               const appendedTransact = [];

               try {
                    const transactionCount = await provider.send("eth_getTransactionCount", [account, "latest"]);
                    console.log(transactionCount);

                    for (let i = 0; i < transactionCount; i++) {
                         const blockNumber = await provider.send("eth_blockNumber", []);

                         const block = await provider.send("eth_getBlockByNumber", [blockNumber, false]);

                         const transactionHash = block.transactions[i];

                         const transaction = await provider.send("eth_getTransactionByHash", [transactionHash]);

                         console.log(appendedTransact);
                         appendedTransact.push(transaction);
                    }

                    setTransactions(appendedTransact);

                    console.log("Transactions:", transactions);
               } catch (error) {
                    console.error("Error fetching transaction history:", error);
               }
          };
          fetchTransactions();
     }, [account]);

     return (
          <div className="p-5">
               <h1>Transaction History</h1>
               {transactions ? (
                    transactions.map((tx, index) => (
                         <div key={index} className="mx-3 border-top py-4">
                              <p className="m-0 p-0 mx-4" style={{ fontSize: "0.8em" }}>
                                   Transaction Hash: {tx.hash}
                              </p>
                              <p className="m-0 p-0 mx-4" style={{ fontSize: "0.8em" }}>
                                   Block Number: {tx.blockNumber}
                              </p>
                              <p className="m-0 p-0 mx-4" style={{ fontSize: "0.8em" }}>
                                   From: {tx.from}
                              </p>
                              <p className="m-0 p-0 mx-4" style={{ fontSize: "0.8em" }}>
                                   To: {tx.to}
                              </p>
                              <p className="m-0 p-0 mx-4" style={{ fontSize: "0.8em" }}>
                                   Value: {tx.value.toString()}
                              </p>
                         </div>
                    ))
               ) : (
                    <div className="m-5">No transactions - connect wallet ...</div>
               )}
          </div>
     );
}

export default Logs;
