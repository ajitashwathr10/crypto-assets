import { Link } from "react-router-dom";
import { Asset } from "@/lib/api";

interface AssetsListProps {
  assets: Asset[];
}

const AssetsList = ({ assets }: AssetsListProps) => {
  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-8 border-brutal-black">
        <thead className="bg-brutal-black text-brutal-white">
          <tr>
            <th className="p-4 text-left">Rank</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-right">Price</th>
            <th className="p-4 text-right">24h Change</th>
            <th className="p-4 text-right">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr
              key={asset.id}
              className="border-b-4 border-brutal-black hover:bg-brutal-blue/10 transition-colors"
            >
              <td className="p-4">{asset.rank}</td>
              <td className="p-4">
                <Link
                  to={`/asset/${asset.id}`}
                  className="flex items-center hover:text-brutal-blue"
                >
                  <span className="font-bold">{asset.name}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    {asset.symbol}
                  </span>
                </Link>
              </td>
              <td className="p-4 text-right font-mono">
                {formatNumber(asset.priceUsd)}
              </td>
              <td
                className={`p-4 text-right ${
                  parseFloat(asset.changePercent24Hr) >= 0
                    ? "text-brutal-green"
                    : "text-brutal-red"
                }`}
              >
                {parseFloat(asset.changePercent24Hr).toFixed(2)}%
              </td>
              <td className="p-4 text-right font-mono">
                {formatNumber(asset.marketCapUsd)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetsList;