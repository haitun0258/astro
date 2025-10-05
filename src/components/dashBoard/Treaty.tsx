import { USDC_ADDRESS, ERC20_ABI } from '../../api/address'
import { useAccount } from 'wagmi'
import { useReadContract } from 'wagmi'
import { useBalance } from 'wagmi'
import { useWriteContract } from 'wagmi'
import { useWaitForTransactionReceipt } from 'wagmi'
import { formatEther, parseEther } from 'viem'
import { parseUnits } from 'viem'; 
import { formatUnits } from 'viem';
import { useSendTransaction } from 'wagmi';
import { useChainId } from 'wagmi';
import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import HrForm from './HrForm';
import Divider from '@mui/material/Divider';
export default function Treaty() {
    const { address, isConnected } = useAccount();
    const { sendTransaction } = useSendTransaction();
    const chainId = useChainId();
    const [transferTo, setTransferTo] = React.useState('');
    const [transferAmount, setTransferAmount] = React.useState('');
    // 读取合约数据
    const { data: tokenName,isLoading: isTokenNameLoading, isError: isTokenNameError } = useReadContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'name',
    });

    const { data: tokenSymbol ,isLoading: isTokenSymbolLoading, isError: isTokenSymbolError } = useReadContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'symbol',
    });

    const { data: totalSupply,isLoading: isTotalSupplyLoading, isError: isTotalSupplyError } = useReadContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'totalSupply',
    });

    const { data: userBalance ,isLoading: isUserBalanceLoading, isError: isUserBalanceError } = useReadContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        },
    });

    // 获取 ETH 余额
    const { data: ethBalance ,isLoading: isEthBalanceLoading, isError: isEthBalanceError } = useBalance({
        address: address,

    });

    // 写入合约
    const {
        data: hash,
        isPending: isTransferPending,
        writeContract
    } = useWriteContract();

    // 等待交易确认
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    const handleTransfer = () => {
        // if (!transferTo || !transferAmount) return;
        const transferTo = '0x83537D71dA111A11AE6580b209B24d1B98C3Ae61';
        const transferAmount = parseUnits('0.1', 6);
     
        writeContract({
            address: USDC_ADDRESS,
            abi: ERC20_ABI,
            functionName: 'transfer',
            args: [transferTo as `0x${string}`, BigInt(transferAmount)],

        
        });
    };


    const { 
        sendTransaction: sendTransactionETH, 
        isPending: isSendingETH, 
        error: sendError,
        data: hashETH 
    } = useSendTransaction();


    const { 
        isLoading: isConfirmingETH, 
        isSuccess: isConfirmedETH,
        error: confirmError 
    } = useWaitForTransactionReceipt({
        hash: hashETH,
    });

    const handleTransferETH = () => {
        const message = "是我转载的";

        const messageHex = "0x" + Buffer.from(message, 'utf8').toString('hex');
        sendTransactionETH({
            to: '0x83537D71dA111A11AE6580b209B24d1B98C3Ae61',
            value: parseUnits('0.00001', 18),
            data: messageHex as `0x${string}`,
        });
    
    };
    console.log('isConnected', isConnected)
    console.log('isTokenSymbolLoading', isTokenSymbolLoading)
    console.log('tokenSymbol', tokenSymbol)

    console.log('写入合约', isTransferPending)
    console.log('hash', hash)
    console.log('等待交易确认', isConfirming)
    console.log('交易成功', isConfirmed)
    console.log('当前网络 ID:', chainId);
    console.log('Sepolia:', 11155111);
    console.log('Arbitrum:', 42161);
    const formattedEthBalance = ethBalance ? formatEther(ethBalance.value) : '0nn';
    const formattedTotalSupply = totalSupply ? formatEther(totalSupply) : '0nn';
    const formattedUserBalance = userBalance ? formatEther(userBalance) : '0nn';
    if(!isConnected) {
        return (
            <div className='flex justify-center items-center h-[500px]'>
                <h1>请先连接钱包 才能进行操作 才可以转账 请点击右侧按钮进行连接 </h1>
            </div>
        )
    }
    return (
        <>
            <Card>
                <CardContent>
                    <Typography component="h1" gutterBottom align="center" sx={{ fontSize: '20px', fontWeight: 'bold' }}>{'合约信息'}</Typography>
                    <div className='flex juntify-center flex-col items-center'>
                        <h1>合约地址{address}</h1>
                        <h1>合约名称{isTokenSymbolLoading ? '加载中...' : tokenName}</h1>
                        <h1>合约符号{isTokenSymbolLoading ? '加载中...' : tokenSymbol}</h1>
                        <h1>合约总供应量{isTotalSupplyLoading ? '加载中...' : formattedTotalSupply}</h1>
                        <h1>合约用户余额{isUserBalanceLoading ? '加载中...' : userBalance ? formatUnits(userBalance, 6):'0'}</h1>
                        <h1>合约ETH余额{isEthBalanceLoading ? '加载中...' : formattedEthBalance}</h1>
                    </div>
                    <Divider sx={{ my: 2 }} />
                    <div className='flex flex-col my-4 md:flex-row items-center justify-space-between gap-4'>
                        <HrForm transferType='USDC'/>
                        <HrForm transferType='ETH'/>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}