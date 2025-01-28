import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchAssetHistory, fetchAssets } from "@/lib/api";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AssetDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: assets } = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  const { data: history } = useQuery({
    queryKey: ["asset-history", id],
    queryFn: () => fetchAssetHistory(id!),
    enabled: !!id,
  });

  const asset = assets?.find((a) => a.id === id);

  if (!asset) {
    return (
      <div className="container py-8">
        <div className="border-8 border-brutal-black p-8 bg-brutal-white">
          <h1 className="text-4xl font-bold mb-4">Asset not found</h1>
          <Link
            to="/"
            className="inline-block bg-brutal-black text-brutal-white px-6 py-3 hover:bg-brutal-blue transition-colors"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (value: string | number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(Number(value));
  };

  return (
    <div className="container py-8">
      <div className="border-8 border-brutal-black p-8 bg-brutal-white mb-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {asset.name} ({asset.symbol})
            </h1>
            <p className="text-2xl">
              {formatPrice(asset.priceUsd)}
              <span
                className={`ml-4 ${
                  parseFloat(asset.changePercent24Hr) >= 0
                    ? "text-brutal-green"
                    : "text-brutal-red"
                }`}
              >
                {parseFloat(asset.changePercent24Hr).toFixed(2)}%
              </span>
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-brutal-black text-brutal-white px-6 py-3 hover:bg-brutal-blue transition-colors"
          >
            ← Back to list
          </Link>
        </div>

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                dataKey="time"
                tickFormatter={(time) =>
                  new Date(time).toLocaleDateString()
                }
              />
              <YAxis
                dataKey="priceUsd"
                tickFormatter={(value) =>
                  formatPrice(value)
                }
              />
              <Tooltip
                formatter={(value: string) =>
                  formatPrice(value)
                }
                labelFormatter={(label) =>
                  new Date(label).toLocaleString()
                }
              />
              <Line
                type="monotone"
                dataKey="priceUsd"
                stroke="#0066FF"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border-4 border-brutal-black p-4">
            <h3 className="font-bold mb-2">Market Cap</h3>
            <p className="text-xl">{formatPrice(asset.marketCapUsd)}</p>
          </div>
          <div className="border-4 border-brutal-black p-4">
            <h3 className="font-bold mb-2">24h Volume</h3>
            <p className="text-xl">{formatPrice(asset.volumeUsd24Hr)}</p>
          </div>
          <div className="border-4 border-brutal-black p-4">
            <h3 className="font-bold mb-2">Supply</h3>
            <p className="text-xl">
              {parseInt(asset.supply).toLocaleString()} {asset.symbol}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;