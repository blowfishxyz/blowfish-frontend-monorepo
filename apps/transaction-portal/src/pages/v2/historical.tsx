import React, { useState } from "react";
import { useSimulateByTxnHash } from "~hooks/useSimulateByTxnHash";

const Historical: React.FC = () => {
  const [txnHash, setTxnHash] = useState<string>("");
  const [dappDomain, setDappDomain] = useState<string>("");

  const handleTxnHashChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTxnHash(e.target.value);
  };

  const handleDappDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDappDomain(e.target.value);
  };

  const simulateByTxnHash = useSimulateByTxnHash();

  const handleSimulateClick = () => {
    simulateByTxnHash(txnHash, dappDomain);
  };

  return (
    <div>
      <div>
        <label htmlFor="txnHash">Txn Hash: </label>
        <input
          type="text"
          id="txnHash"
          value={txnHash}
          onChange={handleTxnHashChange}
        />
      </div>

      <div>
        <label htmlFor="dappDomain">Dapp Domain: </label>
        <input
          type="text"
          id="dappDomain"
          value={dappDomain}
          onChange={handleDappDomainChange}
        />
      </div>

      <button onClick={handleSimulateClick}>Simulate</button>
    </div>
  );
};

export default Historical;
