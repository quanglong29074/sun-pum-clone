const TradeList = () => {
    const trades = [
        {id: '3DF', action: 'sell', amount: '0.01', time: '47m ago'},
        {id: '3vh', action: 'buy', amount: '0.01', time: '3h ago'},
        {id: 'E5s', action: 'sell', amount: '0.07', time: '3h ago'},
        {id: 'X6t', action: 'sell', amount: '0.03', time: '3h ago'},
        {id: '3Jo', action: 'sell', amount: '0.07', time: '3h ago'},
        {id: '3Jo', action: 'sell', amount: '0.07', time: '3h ago'},
    ];

    return (
        <div className="max-h-40 overflow-hidden">
            {/*<div className="text-white sticky top-0 z-10">*/}
            {/*    <table className="min-w-full">*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th className="">TRADES</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <div className="overflow-x overflow-y-auto max-h-52 scrollbar-hidden">
                <table className="min-w-full text-white">
                    <tbody>
                    {trades.map((item, index) => (
                        <tr key={index} className="">
                            <td className="py-2 px-4 text-xs text-[#EC8F6D]">{item.id}</td>
                            {
                                item.action === 'sell' ?
                                    (<td className="py-2 px-4 text-red-400">{item.action}</td>
                                    ) :
                                    (<td className="py-2 px-4 text-green-400">{item.action}</td>)
                            }
                            <td className="py-2 px-4">{item.amount}</td>
                            <td className="py-2 px-4 whitespace-nowrap">{item.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TradeList;