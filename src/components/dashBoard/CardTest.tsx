import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResponsea, postResponsea } from '../../api/dashBoardApi';
import { type getResponseList, type postParmas, type postItems } from '../../api/dashBoardApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import FormBtn from './FormBtn';
import CardRight from './CardRight';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export default function CardTest() {
    const { i18n } = useTranslation();

    const [id, setId] = React.useState<number>(1);
    const [postData, setPostData] = React.useState<postParmas>({
        userId: 1,
        title: '',
        body: ''
    });
    const queryClient = useQueryClient();
    const { isPending, error, data: resDate } = useQuery<getResponseList>({
        queryKey: [id, i18n.language],
        queryFn: () => getResponsea({ id: id }), // 传递函数，不是函数调用
    })
    // 使用 useMutation
    const mutation = useMutation({
        mutationFn: postResponsea,
        onSuccess: (data) => {
            console.log('POST 成功:', data);
            // 可选：刷新查询数据
            queryClient.invalidateQueries({ queryKey: ['repoData', postData, i18n.language] });
        },
        onError: (error) => {
            console.error('POST 失败:', error);
        }
    });
    const handlePost = () => {
        mutation.mutate(postData );
    };









    return (
        <div>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component="h1" gutterBottom align="center" sx={{ fontSize: '20px', fontWeight: 'bold' }}>{'下方按钮调用接口 返回不同内容'}</Typography>
                    <div className='flex justify-center mt-2 gap-4'>
                        <Button variant="contained" disabled={isPending} onClick={() => setId(1)}>入参 id1</Button>
                        <Button variant="contained" disabled={isPending} onClick={() => setId(2)}>入参 id2</Button>
                    </div>
                    <div className='flex justify-center mt-2 gap-4'>
                        <p className='text-2xl'>展示内容区域: 详情看下方：</p>

                    </div>
                    <Divider sx={{ my: 2, color: 'red' }} />
                    <Card sx={{ minWidth: 275, maxWidth: 600, mx: 'auto', p: 3 }}>
                        <CardContent>
                            {isPending ? <p>加载中...</p> : <p>{resDate?.title}</p>}
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>


            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    {/* <Button onClick={handlePost}>post请求</Button> */}
                    <div className='w-full flex flex-col md:flex-row '>
                        {/* <div className='flex-1'>
                            <FormBtn />
                        </div> */}
                        <div className='flex-1'>
                            <CardRight />
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>


    )
}
