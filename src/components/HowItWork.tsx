import React from "react";
import {AppModal} from "./index.ts";

const HowItWork: React.FC<
  {
    openHowItWorks: boolean;
    setOpenHowItWorks: (open: boolean) => void;
  }
> = ({openHowItWorks, setOpenHowItWorks}) => {
  return (
    <AppModal
      title='how it works'
      open={openHowItWorks}
      setOpen={setOpenHowItWorks}
    >
      <div className='text-center text-md'>
        <p className='mb-3'>
          Go Pho Fun ensures that all created tokens are safe to trade through a secure and battle-tested token launching
          system. each coin on pump is a fair-launch with no presale and no team allocation.
        </p>
        <p className='mb-3'>
          step 1: pick a coin that you like
        </p>
        <p className='mb-3'>
          step 2: buy the coin on the bonding curve
        </p>
        <p className='mb-3'>
          step 3: sell at any time to lock in your profits or losses
        </p>
        <p className='mb-3'>
          step 4: when enough people buy on the bonding curve it reaches a market cap of $100k
        </p>
        <p className='mb-3'>
          step 5: $17k of liquidity is then deposited in raydium and burned
        </p>
        <p className='mb-3'>
          by clicking this button you agree to the terms and conditions
        </p>
      </div>
      <div className='text-center'>
        <button className='cursor-pointer font-bold hover:underline' onClick={() => setOpenHowItWorks(false)}>
          [I'm ready to eat pho]
        </button>
      </div>
    </AppModal>
  )
}
export default HowItWork;