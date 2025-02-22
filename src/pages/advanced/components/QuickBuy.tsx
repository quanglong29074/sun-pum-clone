import {CiShoppingTag} from "react-icons/ci";


const QuickBuy = ({amount}:{amount:number}) => {
    return (
        <div className="">
            <button className="flex px-3 py-2 items-center bg-green-400 hover:bg-green-700 rounded-lg text-black">
                <CiShoppingTag/>
                {amount}
            </button>
        </div>
    )
}
export default QuickBuy;