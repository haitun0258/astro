import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useBlockNumber, useAccount } from 'wagmi'
import { Skeleton } from '@mui/material';

export default function DashHead() {
  const [age, setAge] = React.useState<string>('English');
  const [isWalletReady, setIsWalletReady] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const { isConnected, address, isConnecting } = useAccount()
  const result = useBlockNumber()
  console.log('result', result)

  React.useEffect(() => {
    if (isConnecting) {
      setIsWalletReady(false)
    } else {
      // 钱包连接完成或未连接时显示按钮
      const timer = setTimeout(() => {
        setIsWalletReady(true);
      }, 1000); // 短暂延迟确保UI稳定
      
      return () => clearTimeout(timer);
    }
  }, [isConnecting]);

  return (
    <div className="pb-2 flex flex-col md:items-center space-y-4 md:flex-row md:space-y-0 md:justify-between">
      <div>
        <h2 className="text-[20px] text-[#5fcc64] font-semibold ]">Welcome bac</h2>
        <p className="text-sm text-[#4C556B] font-normal">Innovate, Build, and Scale in the Web3 Era.</p>
      </div>
      <div className="flex justify-between">
        <FormControl sx={{ minWidth: 120, border: 'none', bgcolor: 'transparent' }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ color: '#3b82f6', bgcolor: 'transparent' }}></InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={age}
            label="请输入"
            onChange={handleChange}
            sx={{
              color: '#3b82f6',
              bgcolor: 'transparent',
              '& .MuiSelect-icon': { color: '#3b82f6' },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiList-root': { bgcolor: 'transparent' }
            }}
            MenuProps={{
              disableScrollLock: true,
              disablePortal: true, 
              PaperProps: {
                sx: {
                  bgcolor: 'transparent',
                  backgroundImage: 'none',
                  boxShadow: 'none'
                }
              },
              MenuListProps: {
                sx: {
                  bgcolor: 'transparent',
                  // 去除悬停/选中底色
                  '& .MuiMenuItem-root': {
                    color: '#3b82f6',
                    '&:hover': { backgroundColor: 'transparent' },
                    '&.Mui-selected': { backgroundColor: 'transparent' },
                    '&.Mui-selected.Mui-focusVisible': { backgroundColor: 'transparent' }
                  }
                }
              }
            }}
          >
            <MenuItem sx={{ color: '#3b82f6' }} value={'English'}>English</MenuItem>
            <MenuItem sx={{ color: '#3b82f6' }} value={'中文'}>中文</MenuItem>
          </Select>
        </FormControl>
        
        {/* 钱包连接按钮区域 - 使用Skeleton */}
        <div className="ml-4">
          {!isWalletReady ? (
            <Skeleton 
              variant="rectangular" 
              width={200} 
              height={36} 
              animation="wave"
              sx={{ 
                borderRadius: 2,
                bgcolor: '#f0f0f0'
              }} 
            />
          ) : (
            <appkit-button />
          )}
        </div>
      </div>
    </div>
  )
}