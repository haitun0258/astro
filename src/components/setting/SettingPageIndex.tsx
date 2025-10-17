import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from '@mui/material'
export default function SettingsPageIndex() {
    const { t } = useTranslation()
    return (
        <div>
            <Typography component="h1" gutterBottom align="center" sx={{ fontSize: '20px', fontWeight: 'bold' }}>{'代表国际化在其他页面也是可以使用的 不同群岛也可以使用'}</Typography>
            <h1>{t('table.name')}</h1>
        </div>
    )
}   