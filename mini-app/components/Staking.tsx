"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAccount, useContractWrite, useContractRead, useWaitForTransaction } from "wagmi";
import { abi as stakingAbi } from "@/lib/stakingAbi";
import { address as stakingAddress } from "@/lib/stakingAddress";

export default function Staking() {
  const { address } = useAccount();
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [balance, setBalance] = useState<string>("0");
  const [reward, setReward] = useState<string>("0");
  const [isStaking, setIsStaking] = useState<boolean>(false);

  const { data: stakeTx, writeAsync: stake } = useContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "stake",
    args: [BigInt(stakeAmount)],
  });

  const { data: claimTx, writeAsync: claim } = useContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "claim",
  });

  const { data: withdrawTx, writeAsync: withdraw } = useContractWrite({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "withdraw",
  });

  const { data: balanceData } = useContractRead({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: rewardData } = useContractRead({
    address: stakingAddress,
    abi: stakingAbi,
    functionName: "rewardsOf",
    args: [address],
  });

  useEffect(() => {
    if (balanceData) setBalance(BigInt(balanceData).toString());
    if (rewardData) setReward(BigInt(rewardData).toString());
  }, [balanceData, rewardData]);

  const handleStake = async () => {
    if (!stakeAmount) return;
    setIsStaking(true);
    await stake();
    setIsStaking(false);
  };

  const handleClaim = async () => {
    await claim();
  };

  const handleWithdraw = async () => {
    await withdraw();
  };

  return (
    <div className="mt-8 w-full max-w-md mx-auto p-4 border rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Staking</h2>
      <div className="mb-4">
        <label className="block mb-1">Stake Amount</label>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          className="w-full border rounded px-2 py-1"
        />
      </div>
      <div className="flex gap-2 mb-4">
        <Button onClick={handleStake} disabled={isStaking}>
          {isStaking ? "Staking..." : "Stake"}
        </Button>
        <Button variant="outline" onClick={handleClaim}>
          Claim Rewards
        </Button>
        <Button variant="outline" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </div>
      <div className="text-sm">
        <p>Staked Balance: {balance}</p>
        <p>Pending Rewards: {reward}</p>
      </div>
    </div>
  );
}
>>>>>>> SEARCH
````

mini-app/lib/stakingAbi.ts
````typescript
<<<<<<< SEARCH
