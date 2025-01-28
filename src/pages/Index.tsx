import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "@/lib/api";
import AssetsList from "@/components/AssetsList";

const Index = () => {
  const { data: assets, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  return (
    <div className="container py-8">
      <div className="border-8 border-brutal-black p-8 bg-brutal-white mb-8">
        <h1 className="text-4xl font-bold mb-4">Crypto Assets</h1>
        <p className="text-xl mb-8">
          Track your favorite cryptocurrencies in real-time
        </p>
        {isLoading ? (
          <div className="text-center py-8">Loading assets...</div>
        ) : (
          <AssetsList assets={assets || []} />
        )}
      </div>
    </div>
  );
};

export default Index;