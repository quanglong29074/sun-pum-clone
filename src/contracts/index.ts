import {
    getAccount,
    getBalance,
    readContract,
    sendTransaction,
    waitForTransactionReceipt,
    writeContract
} from "@wagmi/core";
import {wagmiConfig} from "../configs.ts";
import PUMP_ABI from "./abis/pump.json";
import ERC20_ABI from "./abis/erc20.json";
import {parseEther, parseUnits} from "viem";
import uniswapV3factory from "./abis/uniswapV3factory.json";
import positionManager from "./abis/positionManager.json";
import swapRouter from "./abis/swapRouter.json";
import quoter from "./abis/quoter.json";

export const contractPort = {
    pumpFun: {
        createTokenSale: async (name: string, symbol: string) => {
            const account = getAccount(wagmiConfig)
            if (!account.isConnected || !account.address) {
                throw new Error('Please connect wallet first');
            }
            const balance = await getBalance(wagmiConfig, {
                address: account.address,
            })
            if (balance.value === 0n) {
                throw new Error('Insufficient balance');
            }
            const hash = await writeContract(wagmiConfig, {
                abi: PUMP_ABI,
                address: import.meta.env.VITE_PUMP_FUN_ADDRESS,
                functionName: 'createTokenSale',
                args: [name, symbol]
            })
            await waitForTransactionReceipt(wagmiConfig, {hash})
            return hash;
        },

        buyTokenSale: async (tokenAddress: string, amount: number) => {
            //1. Get WETH by send ETH to WETH contract
            //2. Approve WETH to pump contract
            //3. Call buyTokenSale of pump contract
            const account = getAccount(wagmiConfig)
            if (!account.isConnected || !account.address) {
                throw new Error('Please connect wallet first');
            }
            const balance = await getBalance(wagmiConfig, {
                address: account.address,
            })
            const wethBalance = await readContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: import.meta.env.VITE_WETH_ADDRESS,
                functionName: 'balanceOf',
                args: [account.address]
            }) as bigint;
            const amountBn = parseEther(amount.toString());
            if (balance.value + wethBalance < amountBn) {
                throw new Error('Insufficient balance');
            }
            const wethToConvert = amountBn - wethBalance;
            //convert ETH to WETH only if needed
            if (wethToConvert > 0n) {
                const hash = await sendTransaction(wagmiConfig, {
                    to: import.meta.env.VITE_WETH_ADDRESS,
                    value: wethToConvert,
                })
                await waitForTransactionReceipt(wagmiConfig, {hash})
            }
            //approve WETH to pump contract
            const hash = await writeContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: import.meta.env.VITE_WETH_ADDRESS,
                functionName: 'approve',
                args: [import.meta.env.VITE_PUMP_FUN_ADDRESS, amountBn]
            })
            await waitForTransactionReceipt(wagmiConfig, {hash})
            //call buyTokenSale of pump contract
            const buyTokenSaleHash = await writeContract(wagmiConfig, {
                abi: PUMP_ABI,
                address: import.meta.env.VITE_PUMP_FUN_ADDRESS,
                functionName: 'buyTokenSale',
                args: [tokenAddress, amountBn]
            })
            await waitForTransactionReceipt(wagmiConfig, {hash: buyTokenSaleHash})
            return buyTokenSaleHash;
        },
        sellToken: async (tokenAddress: string, amount: number) => {
            //1. Approve token to pump contract
            //2. Call sellToken of pump contract
            const account = getAccount(wagmiConfig)
            if (!account.isConnected || !account.address) {
                throw new Error('Please connect wallet first');
            }
            const tokenBalance = await readContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: tokenAddress as `0x${string}`,
                functionName: 'balanceOf',
                args: [account.address]
            }) as bigint;
            const amountBn = parseEther(amount.toString());
            if (tokenBalance < amountBn) {
                throw new Error('Insufficient balance');
            }
            //approve token to pump contract
            const hash = await writeContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: tokenAddress as `0x${string}`,
                functionName: 'approve',
                args: [import.meta.env.VITE_PUMP_FUN_ADDRESS, amountBn]
            })
            await waitForTransactionReceipt(wagmiConfig, {hash})
            //call sellToken of pump contract
            const sellTokenHash = await writeContract(wagmiConfig, {
                abi: PUMP_ABI,
                address: import.meta.env.VITE_PUMP_FUN_ADDRESS,
                functionName: 'sellToken',
                args: [tokenAddress, amountBn]
            })
            await waitForTransactionReceipt(wagmiConfig, {hash: sellTokenHash})
            return sellTokenHash;
        }
    },
    swap: {
        createPosition: async (tokenA: string, tokenB: string, fee: number, amountA: string, amountB: string, initialPrice: string) => {
            const account = getAccount(wagmiConfig);
            if (!account.isConnected || !account.address) {
                throw new Error('Please connect wallet first');
            }
            const poolAddress = await readContract(wagmiConfig, {
                address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                abi: uniswapV3factory,
                functionName: 'getPool',
                args: [tokenA, tokenB, fee]
            });
            if (poolAddress !== "0x0000000000000000000000000000000000000000") {
                throw new Error('Pool already exists!');
            }
            const [token0, token1] = tokenA.toLowerCase() < tokenB.toLowerCase()
                ? [tokenA, tokenB]
                : [tokenB, tokenA];
            const [amount0, amount1] = tokenA.toLowerCase() < tokenB.toLowerCase()
                ? [amountA, amountB]
                : [amountB, amountA];
            const createPoolHash = await writeContract(wagmiConfig, {
                address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                abi: uniswapV3factory,
                functionName: 'createPool',
                args: [tokenA, tokenB, fee]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: createPoolHash});
            const newPoolAddress = await readContract(wagmiConfig, {
                address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                abi: uniswapV3factory,
                functionName: 'getPool',
                args: [tokenA, tokenB, fee]
            });
            const price = parseFloat(initialPrice);
            const adjustedPrice = tokenA.toLowerCase() < tokenB.toLowerCase()
                ? price
                : 1 / price;
            const sqrtPriceX96 = BigInt(Math.floor(Math.sqrt(adjustedPrice) * 2 ** 96));
            const initializeHash = await writeContract(wagmiConfig, {
                address: newPoolAddress as `0x${string}`,
                abi: [
                    {
                        inputs: [{type: "uint160", name: "sqrtPriceX96"}],
                        name: "initialize",
                        outputs: [],
                        stateMutability: "nonpayable",
                        type: "function",
                    },
                ],
                functionName: 'initialize',
                args: [sqrtPriceX96]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: initializeHash});
            const approveAHash = await writeContract(wagmiConfig, {
                address: tokenA as `0x${string}`,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [import.meta.env.VITE_ADD_LIQUID, parseEther(amountA)]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: approveAHash});
            const approveBHash = await writeContract(wagmiConfig, {
                address: tokenB as `0x${string}`,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [import.meta.env.VITE_ADD_LIQUID, parseEther(amountB)]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: approveBHash});


            const amount0Desired = parseUnits(amount0, 18);
            const amount1Desired = parseUnits(amount1, 18);
            const mintParam = {
                token0,
                token1,
                fee,
                tickLower: -887220,
                tickUpper: 887220,
                amount0Desired: amount0Desired,
                amount1Desired: amount1Desired,
                amount0Min: 0n,
                amount1Min: 0n,
                recipient: account.address,
                deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 10),
            };
            const mintHash = await writeContract(wagmiConfig, {
                address: import.meta.env.VITE_ADD_LIQUID,
                abi: positionManager,
                functionName: 'mint',
                args: [mintParam],
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: mintHash});
            return mintHash;
        },
        swapToken: async (tokenIn: string, tokenOut: string, amountIn: any, fee: any) => {
            const account = getAccount(wagmiConfig);
            if (!account.isConnected || !account.address) {
                throw new Error('Please connect wallet first');
            }
            const poolAddress = await readContract(wagmiConfig, {
                address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                abi: uniswapV3factory,
                functionName: 'getPool',
                args: [tokenIn, tokenOut, fee]
            });

            if (poolAddress === "0x0000000000000000000000000000000000000000") {
                throw new Error('Pool does not exists!');
            }
            const approveTokenInHash = await writeContract(wagmiConfig, {
                address: tokenIn as `0x${string}`,
                abi: ERC20_ABI,
                functionName: 'approve',
                args: [import.meta.env.VITE_SWAP_ROUTER, parseEther(amountIn)]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: approveTokenInHash});
            const exactInputParam = {
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: fee,
                recipient: account.address,
                deadline: Math.floor(Date.now() / 1000) + 60 * 10,
                amountIn: parseUnits(amountIn, 18),
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            };
            const exactInputHash = await writeContract(wagmiConfig, {
                address: import.meta.env.VITE_SWAP_ROUTER,
                abi: swapRouter,
                functionName: 'exactInputSingle',
                args: [exactInputParam]
            });
            await waitForTransactionReceipt(wagmiConfig, {hash: exactInputHash});

            return exactInputHash;
        },
        caculateAmountOut: async (tokenIn: string, tokenOut: string, amountIn: any, fee: any) => {
            const poolAddress = await readContract(wagmiConfig, {
                address: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS,
                abi: uniswapV3factory,
                functionName: 'getPool',
                args: [tokenIn, tokenOut, fee]
            });
            if (poolAddress === "0x0000000000000000000000000000000000000000") {
                throw new Error('Pool does not exists!');
            }
            const amountInWei = parseUnits(amountIn, 18);
            const params = {
                tokenIn: tokenIn as `0x${string}`,
                tokenOut: tokenOut as `0x${string}`,
                amountIn: amountInWei,
                fee: fee,
                sqrtPriceLimitX96: BigInt(0),
                pool: poolAddress
            };
            const quote = (await readContract(wagmiConfig, {
                address: import.meta.env.VITE_QUOTER,
                abi: quoter,
                functionName: 'quoteExactInputSingleWithPool',
                args: [params]
            })) as [bigint, bigint, number, bigint];
            const amountOutFinal = Number((Number(quote[0]) / 1e18).toFixed(3));
            return amountOutFinal;
        }
    },
    erc20: {
        symbol(address: string): Promise<string> {
            return readContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: address as `0x${string}`,
                functionName: 'symbol'
            }) as Promise<string>
        },
        getTokenBalance: async (tokenAdrress: any) => {
            const account = getAccount(wagmiConfig);
            const tokenBalance = await readContract(wagmiConfig, {
                abi: ERC20_ABI,
                address: tokenAdrress as `0x${string}`,
                functionName: 'balanceOf',
                args: [account.address]
            }) as bigint;
            return tokenBalance;
        }
    }
}
