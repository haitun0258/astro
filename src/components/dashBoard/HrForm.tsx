import React from 'react'
import { TextField, Button, Box, Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod' // 注意从这里引
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
import { Typography } from '@mui/material';
// interface HrFormProps {
//     amount: string;
//     address: string;
// }
const evmAddress = /^0x[a-fA-F0-9]{40}$/
const schema = z.object({
  amount: z
    .string()
    .trim()
    .nonempty('请输入金额')
    .refine(v => !Number.isNaN(Number(v)), '金额必须是数字')
    .refine(v => Number(v) > 0, '金额需大于 0'),
  address: z
    .string()
    .trim()
    .nonempty('请输入地址')
    .regex(evmAddress, '请输入正确的 0x 开头的地址'),
})

type FormValues = z.infer<typeof schema>
export default function HrForm({ transferType }: { transferType: string }) {
  const { address, isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const chainId = useChainId();
  const [transferTo, setTransferTo] = React.useState('');




  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange', // 或 'onBlur'
    defaultValues: { amount: '', address: '0x83537D71dA111A11AE6580b209B24d1B98C3Ae61' },
  })





  const onSubmit = async (data: FormValues) => {
    console.log('提交', data.amount, data.address)
    if (transferType === 'USDC') {
      handleTransfer(data)
    } else if (transferType === 'ETH') {
      handleTransferETH(data)
    }
    // 提交成功后
    reset(
      { amount: '', address: '' },
      { keepErrors: false, keepTouched: false, keepDirty: false, keepIsSubmitted: false, keepSubmitCount: false }
    )


  }
  // 写入合约
  const {
    data: hash,
    isPending: isTransferPending,
    writeContract
  } = useWriteContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess: isConfirmed, error: confirmError } =
    useWaitForTransactionReceipt({
      hash,
    });

  // 转账usdc
  const handleTransfer = (data: FormValues) => {
    // if (!transferTo || !transferAmount) return;
    // const transferTo = '0x83537D71dA111A11AE6580b209B24d1B98C3Ae61';
    const transferAmount = parseUnits(data.amount as string, 6);
    writeContract({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: 'transfer',
      args: [data.address as `0x${string}`, BigInt(transferAmount)],


    });
  };
  // 转账eth  
  const {
    sendTransaction: sendTransactionETH,
    isPending: isSendingETH,
    error: sendError,
    data: hashETH
  } = useSendTransaction();


  const {
    isLoading: isConfirmingETH,
    isSuccess: isConfirmedETH,
    error: confirmErrorETH
  } = useWaitForTransactionReceipt({
    hash: hashETH,
  });

  const handleTransferETH = (data: FormValues) => {
    // const message = "是我转载的";

    // const messageHex = "0x" + Buffer.from(message, 'utf8').toString('hex');
    sendTransactionETH({
      to: data.address as `0x${string}`,
      value: parseUnits(data.amount as string, 18),
      // data: messageHex as `0x${string}`,
    });

  };

  React.useEffect(() => {
    if (isConfirmed || isConfirmedETH) {
      alert('转账成功')
    }
    if (confirmError || confirmErrorETH) {
      alert('转账失败')
    }
  }, [isConfirmed, confirmError, isConfirmedETH, confirmErrorETH])

  return (
    <Box sx={{ width: '100%', minWidth: 400, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" gutterBottom align="center" sx={{ fontSize: '20px', fontWeight: 'bold' }}>转账测试网络{transferType}</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
          <TextField
            label="转账金额"
            variant="outlined"
            {...register('amount')}
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
          <TextField
            label="转账地址"
            variant="outlined"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <div className='flex justify-end gap-6'>
            <Button type="submit" variant="contained" disabled={isTransferPending || isConfirming || isSendingETH || isConfirmingETH}>转账测试网络{transferType}</Button>
            <Button type="button" variant="contained" disabled={isTransferPending || isConfirming || isSendingETH || isConfirmingETH} onClick={() => reset(
              { amount: '', address: '' },
              { keepErrors: false, keepTouched: false, keepDirty: false, keepIsSubmitted: false, keepSubmitCount: false }
            )}>重置金额地址</Button>
          </div>
        </form>
      </Paper>
    </Box>
  )
}