import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

// coinId를 가져오는게 아니라 props 객체를 가져오는거다! 그안에 coinId가 있는것,
// 즉 아래 {coinId}는 구조분해할당이라고 봐야한다.
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 100000000000000 }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : Object.keys(data!).length === 1 ? (
        "no"
      ) : (
        <>
          <ApexChart
            type="candlestick"
            series={[
              {
                data: [
                  {
                    x: new Date(1538778600000),
                    y: [6629.81, 6650.5, 6623.04, 6633.33],
                  },
                  {
                    x: new Date(1538780400000),
                    y: [6632.01, 6643.59, 6620, 6630.11],
                  },
                ],
              },
            ]}
            options={{
              chart: {
                type: "candlestick",
                height: 350,
              },
              title: {
                text: "CandleStick Chart",
                align: "left",
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
              },
            }}
            height={500}
          />
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => parseFloat(price.close)) ?? [],
              },
            ]}
            options={{
              theme: { mode: "dark" },
              chart: {
                height: 300,
                width: 500,
                toolbar: { show: false },
                background: "transparent",
              },
              grid: { show: false },
              stroke: { curve: "smooth", width: 5 },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                labels: {
                  show: false,
                },
                type: "datetime",
                axisTicks: { show: false },
                categories:
                  data?.map((price) =>
                    new Date(price.time_close * 1000).toUTCString()
                  ) ?? [],
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 100] },
              },
              colors: ["red"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
