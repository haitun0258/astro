import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResponsea, postResponsea } from '../../api/dashBoardApi';
import { type getResponseList, type postParmas, type postItems } from '../../api/dashBoardApi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function CardTest() {

    const [id, setId] = React.useState<number>(1);
    const [postData, setPostData] = React.useState<postParmas>({
        userId: 1,
        title: '',
        body: ''
    });
    const queryClient = useQueryClient();
    const { isPending, error, data: resDate } = useQuery<getResponseList>({
        queryKey: [id],
        queryFn: () => getResponsea({ id: id }), // 传递函数，不是函数调用
    })
    // 使用 useMutation
    const mutation = useMutation({
        mutationFn: postResponsea,
        onSuccess: (data) => {
            console.log('POST 成功:', data);
            // 可选：刷新查询数据
            queryClient.invalidateQueries({ queryKey:['repoData',postData] });
        },
        onError: (error) => {
            console.error('POST 失败:', error);
        }
    });
    const handlePost = () => {
        mutation.mutate(postData );
    };

    React.useEffect(() => {
        mutation.mutate(postData );
    }, [postData]);
    

    return (
        <div>
            <h1>{'更改下面接口入参'}</h1>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div className='flex justify-between'>
                        <Button onClick={() => setId(1)}>id1</Button>
                        <Button onClick={() => setId(2)}>id2</Button>
                    </div>
                    <div>
                        <p className='text-2xl'>展示内容区域</p>
                        {isPending ? <p>加载中...</p> : <p>{resDate?.title}</p>}
                    </div>
                </CardContent>
            </Card>


            <Card>
                <CardContent>
                    <Button onClick={handlePost}>post请求</Button>
                    <div>
                    <input className='border-2 border-gray-300 rounded-md p-2' type="text" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <input className='border-2 border-gray-300 rounded-md p-2' type="text" value={postData.body} onChange={(e) => setPostData({ ...postData, body: e.target.value })} />
                    <input className='border-2 border-gray-300 rounded-md p-2' type="number" value={postData.userId} onChange={(e) => setPostData({ ...postData, userId: parseInt(e.target.value) })} />
                    </div>
                </CardContent>
            </Card>

        </div>


    )
}
