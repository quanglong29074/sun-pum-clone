const HolderTable = () => {
    const data = [
        { holder: 'bPT', own: '1.83%', sol: '0.1', uPnL: '-1.29', rPnL: '+0.08' },
        { holder: '2HW', own: '0.97%', sol: '0.0', uPnL: '-1.00', rPnL: '0.00' },
        { holder: 'HEi', own: '0.81%', sol: '0.0', uPnL: '-1.67', rPnL: '0.00' },
        { holder: '92N', own: '0.47%', sol: '46.7', uPnL: '-1.00', rPnL: '0.00' },
        { holder: 'JDL', own: '0.45%', sol: '3.3', uPnL: '-0.70', rPnL: '0.00' },
        { holder: 'A5F', own: '0.15%', sol: '11.5', uPnL: '-0.74', rPnL: '0.02' },
    ];

    return (
        <div className="max-h-36 overflow-hidden">
            {/*<div className="text-white sticky top-0 z-10">*/}
            {/*    <table className="min-w-full">*/}
            {/*        <thead>*/}
            {/*        <tr className="flex gap-4">*/}
            {/*            <th className="text-left w-1/5">HOLDERS</th>*/}
            {/*            <th className="text-left w-1/5">Own</th>*/}
            {/*            <th className="text-left w-1/5">Sol</th>*/}
            {/*            <th className="text-left w-1/5">U.PnL</th>*/}
            {/*            <th className="text-left w-1/5">R.PnL</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <div className="overflow-y-auto max-h-52 scrollbar-hidden">
                <table className="min-w-full text-white">
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="">
                            <td className="py-2 px-4 text-left text-xs w-1/5 text-[#EC8F6D]">{item.holder}</td>
                            <td className="py-2 px-4 text-left w-1/5">{item.own}</td>
                            <td className="py-2 px-4 text-left w-1/5">{item.sol}</td>
                            <td className="py-2 px-4 text-left w-1/5 text-red-400">{item.uPnL}</td>
                            <td className="py-2 px-4 text-left w-1/5 text-green-400">{item.rPnL}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HolderTable;