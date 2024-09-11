"use client";

import { useState } from "react";
import { deployCAT } from "@/utils/contracts";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/hooks/WalletConnectProvider";
import ConnectWallet from "@/components/ConnectWallet";

export default function CreateCAT() {
  const [formData, setFormData] = useState<DeployContractProps>({
    maxSupply: "",
    thresholdSupply: "",
    maxExpansionRate: "",
  });

  const { address } = useWallet();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    } as DeployContractProps);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deployCAT(formData as DeployContractProps);
      // Handle successful deployment (e.g., show success message, redirect)
    } catch (error) {
      console.error("Error deploying CAT:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create CAT</h1>
        {!address ? (
          <ConnectWallet />
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <Label htmlFor="maxSupply">Maximum Supply</Label>
              <Input
                id="maxSupply"
                name="maxSupply"
                type="number"
                required
                value={formData.maxSupply}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="thresholdSupply">Threshold Supply</Label>
              <Input
                id="thresholdSupply"
                name="thresholdSupply"
                type="number"
                required
                value={formData.thresholdSupply}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="maxExpansionRate">Maximum Expansion Rate (%)</Label>
              <Input
                id="maxExpansionRate"
                name="maxExpansionRate"
                type="number"
                required
                value={formData.maxExpansionRate}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Deploy CAT</Button>
          </form>
        )}
      </div>
    </Layout>
  );
}