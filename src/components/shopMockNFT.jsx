import React, { useState, useContext } from "react";
import { ethers } from "ethers";

import { AccountContext } from "../context";

function ShopMockNFT() {
     const { account, setAccount } = useContext(AccountContext);

     const mockNftData = [
          { address: "0x6cE18A9BA6dA8869A59F0aADF60B1dF92F850560", price: 2, nftName: "NFT1" },
          { address: "0x687aDaA3A1B188C3e8626018b901df7118158894", price: 3, nftName: "NFT2" },
          { address: "0x84E061A5a88b053b9d3bCA983ea994be29D327D1", price: 1, nftName: "NFT3" },
     ];

     const sendTransaction = async (e, address, price) => {
          e.preventDefault();
          if (!account) {
               console.error("Please connect your wallet");
               alert("Please connect your wallet");
          }

          try {
               let converted = await ethers.parseUnits(price.toString(), 18);
               console.log(converted);

               let params = [
                    {
                         from: account,
                         to: address,
                         gas: Number(21000).toString(16),
                         gasPrice: Number(2500000).toString(16),
                         value: Number(converted).toString(16),
                    },
               ];

               const result = await window.ethereum.request({ method: "eth_sendTransaction", params: params });
               console.log("Transaction hash:", result);

               //
          } catch (err) {
               console.log(err);
          }
     };

     return (
          <div style={styles.container}>
               {mockNftData.map((item, index) => (
                    <div style={styles.card} key={index}>
                         <h3>{item.nftName}</h3>
                         <p style={{ fontSize: "1.5em" }}>
                              {item.price} <span style={{ fontSize: "0.5em" }}>ETH</span>
                         </p>
                         <button
                              style={styles.button}
                              onClick={(e) => {
                                   sendTransaction(e, item.address, item.price);
                              }}
                         >
                              Buy
                         </button>
                    </div>
               ))}
          </div>
     );
}

const styles = {
     container: {
          margin: "50px",
          display: "flex",
          justifyContent: "space-between",
     },
     card: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          width: "300px",
          height: "300px",
          padding: "10px",
          backgroundColor: "#f6851b",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
     },
     button: {
          padding: "10px",
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
     },
};

export default ShopMockNFT;
