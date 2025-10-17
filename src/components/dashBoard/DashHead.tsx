import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { useBlockNumber, useAccount } from 'wagmi'
import { Skeleton } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function DashHead() {
  const { t, i18n } = useTranslation();
  const [age, setAge] = React.useState<string>('');
  const [isWalletReady, setIsWalletReady] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    if (event.target.value === 'English') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('zh');
    }
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
      }, 3000); // 短暂延迟确保UI稳定
      
      return () => clearTimeout(timer);
    }
  }, [isConnecting]);

  React.useEffect(() => {
    if (i18n.language == 'en') {
      setAge('English')
    } else {
      setAge('中文')
    }
    console.log('i18n.language', i18n.language)
  }, [i18n.language])

  return (
    <div className="pb-2 flex flex-col md:items-center space-y-4 md:flex-row md:space-y-0 md:justify-between">
      <div>
        <h2 className="text-[20px] text-[#5fcc64] font-semibold ]">{t('welcome')}</h2>
        <p className="text-sm text-[#5176d4] font-normal">{t('table.name')}</p>
      </div>
      <div className="flex justify-between">
        <FormControl sx={{ minWidth: 120, border: 'none', bgcolor: 'transparent' }} size="small">
          {/* 添加 InputLabel */}
          <InputLabel
            id="language-select-label"
            sx={{
              color: '#3b82f6',
              bgcolor: 'transparent',
              display: 'none' // 隐藏标签，因为你有自定义样式
            }}
          >
            请选择语言
          </InputLabel>

          <Select
            aria-controls="language-select-menu"
            labelId="language-select-label"
            id="language-select"
            value={age}
            label="请选择语言"
            onChange={handleChange}
            inputProps={{
              'aria-controls': 'language-select-menu',
              'aria-expanded': age ? 'true' : 'false'
            }}
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
              id: "language-select-menu", // 关键：添加菜单 ID
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
            <MenuItem sx={{ color: '#3b82f6' }} value={'English'}>{t('lang.en')}</MenuItem>
            <MenuItem sx={{ color: '#3b82f6' }} value={'中文'}>{t('lang.zh')}</MenuItem>
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