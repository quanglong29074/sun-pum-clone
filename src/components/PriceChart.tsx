import {useEffect, useRef, useState} from "react";
import {createChart, CrosshairMode, IChartApi} from "lightweight-charts";
import {Token} from "../types.ts";

const PriceChart: React.FC<{
  data: {
    time: number,
    open: number,
    high: number,
    low: number,
    close: number
  }[],
  token: Token
}> = ({data = [], token}) => {
  const priceUpColor = "#26a69a";
  const priceDownColor = "#ef5350";
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi>();
  const [currentCandle, setCurrentCandle] = useState<any>({
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    isUp: false,
    priceChangePercentage: 0,
    priceChange: 0
  })

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth || 800,
      height: 500,
      layout: {
        background: {color: "#131722"},
        textColor: "#888888",
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#758696",
          width: 1,
          style: 3,
          visible: true,
          labelVisible: true
        },
        horzLine: {
          color: "#758696",
          width: 1,
          style: 3,
          visible: true,
          labelVisible: true,
        },
      },
      rightPriceScale: {
        borderColor: "transparent",
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
        alignLabels: false,
        entireTextOnly: false,
        visible: true
      },
      timeScale: {
        borderColor: "transparent",
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString().slice(0, 5);
        },
      },
      handleScroll: {
        vertTouchDrag: false,
      },
    });

    chartRef.current = chart;

    try {
      const candleSeries = chart.addCandlestickSeries({
        upColor: priceUpColor,
        downColor: priceDownColor,
        borderDownColor: priceDownColor,
        borderUpColor: priceUpColor,
        wickDownColor: priceDownColor,
        wickUpColor: priceUpColor,
        borderVisible: false,
        priceFormat: {
          type: 'price',
          precision: 9,
          minMove: 0.000000001,
        },
      });

      candleSeries.setData(data as any);
      chart.subscribeCrosshairMove((param) => {
        if (param.time) {
          const currentCandle: any = param.seriesData.get(candleSeries);
          const allCandles = candleSeries.data()
          const currentIndex = allCandles.findIndex((item: any) => +item.time === +currentCandle.time)
          if (currentIndex < 1) {
            //not found previous candle
            setCurrentCandle({
              ...currentCandle,
              isUp: false,
              priceChangePercentage: 0,
              priceChange: 0
            })
            return;
          }
          const previousCandle: any = allCandles[currentIndex - 1]
          if (!previousCandle) {
            //not found previous candle
            setCurrentCandle({
              ...currentCandle,
              isUp: false,
              priceChangePercentage: 0,
              priceChange: 0
            })
            return;
          }
          setCurrentCandle({
            ...currentCandle,
            isUp: currentCandle.close >= previousCandle.close,
            priceChangePercentage: ((currentCandle.close - previousCandle.close) / previousCandle.close) * 100,
            priceChange: currentCandle.close - previousCandle.close
          })

        }
      });

      const handleResize = () => {
        if (chartContainerRef.current) {
          chart.applyOptions({
            width: chartContainerRef.current.clientWidth
          });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    } catch (err: any) {
      console.error("Chart error:", err.message);
    }
  }, [data]);

  return (
    <div className="w-full bg-[#131722]">
      <div className="p-4 text-sm text-gray-300">
        {token?.symbol} · PHO · O<span style={{
        color: currentCandle.isUp ? priceUpColor : priceDownColor
      }}>{currentCandle.open}</span> H<span style={{
        color: currentCandle.isUp ? priceUpColor : priceDownColor
      }}>{currentCandle.open}</span> L<span style={{
        color: currentCandle.isUp ? priceUpColor : priceDownColor
      }}>{currentCandle.open}</span> C<span style={{
        color: currentCandle.isUp ? priceUpColor : priceDownColor
      }}>{currentCandle.open}</span>
        <span style={{
          color: currentCandle.isUp ? priceUpColor : priceDownColor
        }}> {currentCandle.priceChange.toFixed(9)}({currentCandle.priceChangePercentage.toFixed(2)}%)</span>
      </div>
      <div ref={chartContainerRef} className="w-full"/>
    </div>
  );
};

export default PriceChart;