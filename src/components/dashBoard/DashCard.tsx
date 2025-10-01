import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {
    useQuery,
} from '@tanstack/react-query'
import { getResponse, type getResponseData, type getResponseList } from '../../api/dashBoardApi'
import { createUserStore, createUserStore2 } from '../../zustand'
import React from 'react';
export default function DashCard() {
    const { count, inc } = createUserStore();
    const { countwo, inc: incwo } = createUserStore2();
    const { isPending, error, data: resDate, isFetching } = useQuery<getResponseList[]>({
        queryKey: ['repoData'],
        queryFn: getResponse,
    })

    if (isPending) {
        return (
            <Box
                sx={{
                    mt: { xs: 2, md: 0 },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 2,
                }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => (
                    <Box key={index} sx={{
                        mt: 2,
                        p: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#fff',
                        wordBreak: 'break-word', overflowWrap: 'anywhere',
                    }}>
                        <Card onClick={() => {
                            console.log('点击了')
                        }}>
                            <CardContent>
                                <Stack spacing={1}>
                                    {/* For variant="text", adjust the height via font-size */}
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

                                    {/* For other variants, adjust the size with `width` and `height` */}
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="rectangular" width={210} height={60} />
                                    <Skeleton variant="rounded" width={210} height={60} />
                                </Stack>
                            </CardContent>
                            <CardActions>
                                <Button size="small">点击按钮  没有用</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        )
    }

    if (error) return 'An error has occurred: ' + error.message


    const MemoBox = React.memo(() => {
        return (
            <Box
                sx={{
                    mt: { xs: 2, md: 0 },
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 2,
                }}
            >
                {resDate.map((item) => (
                    <Box key={item.id} sx={{
                        mt: 2,
                        p: 2, borderRadius: 2, boxShadow: 1, bgcolor: '#fff',
                        wordBreak: 'break-word', overflowWrap: 'anywhere',
                    }}>
                        <Card onClick={() => {
                            console.log('点击了')
                        }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {/* {item.body} */}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>ID: {item.id}</Typography>
                                <Typography variant="body2">
                                    User ID: {item.userId}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">点击按钮  没有用</Button>
                            </CardActions>
                        </Card>

                        {count}

                        <Button onClick={() => {
                            inc(1)
                        }}>点击增加</Button>

                        <Button onClick={() => {
                            inc(10)
                        }}>点击减少</Button>

                        <p>{countwo.one}</p>

                        <Button onClick={() => {
                            incwo({ one: 1, two: '2', three: true })
                        }}>改变对象</Button>

                    </Box>
                ))}
            </Box>
        )
    })

    return <MemoBox />





}