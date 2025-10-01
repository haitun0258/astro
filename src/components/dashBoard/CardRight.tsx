


import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import { createUserStore3 } from '../../zustand'
interface CardRightProps {
    isPending: boolean;
    title: string;
    body: string;
    name: string;
    userId: number;
}
export default function CardRight() {
    const { isPending, resdata } = createUserStore3();
    const hasData = resdata.title || resdata.body || resdata.name || resdata.userId;
    return (
        
        <>  
        {
            isPending || !hasData ? (
                <Stack spacing={1}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          
                {/* For other variants, adjust the size with `width` and `height` */}
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={210} height={60} />
                <Skeleton variant="rounded" width={210} height={60} />
              </Stack>
            ) : (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                     <p>{resdata.title}</p>
                     <p>{resdata.body}</p>
                     <p>{resdata.name}</p>
                     <p>{resdata.userId}</p>
                    </CardContent>
                </Card>
            )
        }
        </>
    )
}

