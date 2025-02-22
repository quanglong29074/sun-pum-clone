import {useEffect, useMemo, useRef} from "react";
import { createChart, IChartApi } from "lightweight-charts";
import {formatEther} from "viem";

const PriceChartForAdvanced = ({chartData}:{chartData:any}) => {
    const priceUpColor = "#26a69a";
    const priceDownColor = "#ef5350";
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi>();

    const formattedChartData = useMemo(() => {
        try {
            const dataArray = chartData?.data || [];
            return dataArray.map((item: any) => ({
                time: Number(item.time),
                open: Number(formatEther(BigInt(item.open))),
                high: Number(formatEther(BigInt(item.high))),
                low: Number(formatEther(BigInt(item.low))),
                close: Number(formatEther(BigInt(item.close)))
            }));
        } catch (error) {
            console.error('Error formatting chart data:', error);
        }
    }, [chartData]);



    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            width: 136,
            height: 120,
            layout: {
                background: { color: "#0f172b" },
                textColor: "#888888",
                attributionLogo:false,
            },
            grid: {
                vertLines: { visible: false },
                horzLines: { visible: false },

            },
            rightPriceScale: {
                visible: false,
            },
            timeScale: {
                borderVisible: false,
                timeVisible: false,
                secondsVisible: false,
                allowBoldLabels:false

            },
            autoSize: true,
        });
        chartRef.current = chart;
        const candleSeries = chart.addCandlestickSeries({
            upColor: priceUpColor,
            downColor: priceDownColor,
            borderDownColor: priceDownColor,
            borderUpColor: priceUpColor,
            wickDownColor: priceDownColor,
            wickUpColor: priceUpColor,
            borderVisible: false,
        });
        candleSeries.setData(formattedChartData);
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
    }, [formattedChartData]);
    return (
        <div className="w-full  ">
            <div ref={chartContainerRef} className="w-full" />
        </div>
    );
};

export default PriceChartForAdvanced;