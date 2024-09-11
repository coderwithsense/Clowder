import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import CATInfo from "@/components/CATInfo";
import { useCAT } from "@/hooks/CatsProvider";
import { useWallet } from "@/hooks/WalletConnectProvider";
import ConnectWallet from "@/components/ConnectWallet";

export default function CATPage() {
  const router = useRouter();
  const { address } = router.query;
  const { cat, isOwner } = useCAT(address as any);
  const { address: walletAddress } = useWallet();

  if (!walletAddress) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <ConnectWallet />
        </div>
      </Layout>
    );
  }

  if (!cat) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">CAT Details</h1>
        <CATInfo cat={cat} />
        {isOwner && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Owner Actions</h2>
            {/* Add forms for minting tokens and updating parameters */}
          </div>
        )}
      </div>
    </Layout>
  );
}