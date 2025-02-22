import { Modal} from 'antd';

export default function ModalFilter({ isOpen, onCancel, onOk }:{isOpen:boolean,onCancel:any,onOk:any}) {
    return (
        <div>
            <Modal
                title={<span style={{ color: '#86efac', fontWeight: 'bold' }}>Filter</span>}
                open={isOpen}
                onOk={onOk}
                onCancel={onCancel}
                okText={<span>Apply</span>}
                cancelText="Clear"
                // style={{ backgroundColor: '#1c1f26', borderRadius: '8px' }}
                style={{ backgroundColor: '#1c1f26', borderRadius: '8px' }}
                className="rounded-md"
            >
                <div className="grid w-fit justify-self-center gap-4 p-4">
                    <label className="text-white text-lg font-semibold">Market Cap</label>
                    <div className="flex gap-2 items-center">
                        <div className="relative flex items-center">
                            <input placeholder="From" className="p-2 h-10 text-white focus:bg-white placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                            <span className="absolute right-2 text-white font-bold">$</span>
                        </div>
                        <span className="text-white">to</span>
                        <div className="relative flex items-center">
                            <input placeholder="To" className="p-2 h-10 text-black placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                            <span className="absolute right-2 text-white font-bold">$</span>
                        </div>
                    </div>
                    <label className="text-white text-lg font-semibold">Volume</label>
                    <div className="flex gap-2 items-center">
                        <div className="relative flex items-center">
                            <input placeholder="From" className="p-2 h-10 text-black placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                            <span className="absolute right-2 text-white font-bold">$</span>
                        </div>
                        <span className="text-white">to</span>
                        <div className="relative flex items-center">
                            <input placeholder="To" className="p-2 h-10 text-black placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                            <span className="absolute right-2 text-white font-bold">$</span>
                        </div>
                    </div>
                    <label className="text-white text-lg font-semibold">Number of Holders</label>
                    <div className="flex gap-2 items-center">
                        <input placeholder="From" className="p-2 h-10 text-black placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                        <span className="text-white">to</span>
                        <input placeholder="To" className="p-2 h-10 text-black placeholder-[#D3D3D3] border-1" style={{ backgroundColor: '#2c2f36', color: 'white', borderRadius: '4px' }} />
                    </div>
                </div>
            </Modal>
        </div>
    );
}