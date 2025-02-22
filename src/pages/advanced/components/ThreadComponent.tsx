const ThreadsComponent = () => {
    const threads = [
        { id: 'CE7wJZ', content: 'Better than yesterday.', time: '1d ago' },
        { id: '2zu2dS', content: 'Unstoppable force or immovable excuse?', time: '1d ago' },
        { id: '4jDNg3', content: 'like taking candy from a baby', time: '1d ago' },
        { id: '86trbU', content: 'We didn’t deserve this', time: '1d ago' },
        { id: '86trbU', content: 'We didn’t deserve this', time: '1d ago' },
    ];

    return (
        <div className="max-h-40 overflow-hidden">
            {/*<div className="text-white sticky top-0 z-10">*/}
            {/*    <table className="min-w-full">*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            <th className="">THREADS</th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <div className="overflow-y-auto max-h-40 scrollbar-hidden max-w-full">
                <table className="min-w-full text-white">
                    <tbody>
                    {threads.map((item, index) => (
                        <tr key={index} className="">
                            <td className="py-2 px-4 text-xs text-[#EC8F6D]">{item.id}</td>
                            <td className="py-2 px-4 text-xs text-[#FFFF]">{item.content}</td>
                            <td className="py-2 whitespace-nowrap">{item.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ThreadsComponent;