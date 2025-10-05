import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Paper,
    Alert,
    Snackbar,
    Button
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getResponsea, postResponsea } from '../../api/dashBoardApi';
import { type getResponseList, type postParmas, type postItems } from '../../api/dashBoardApi';
import { createUserStore3 } from '../../zustand'

export default function FormBtn() {
    const queryClient = useQueryClient();
    const { setResdataZustand, setIsPendingZustand } = createUserStore3();
    const [resdata, setResdata] = React.useState(
        {
            userId: '',
            name: '',
            title: '',
            body: '',
        }
    );
    const [formData, setFormData] = React.useState({
        userId: '', // 改为空字符串，没有默认值
        name: '',
        title: '',
        body: '',
    });
    
    const [errors, setErrors] = React.useState({
        userId: '',
        name: '',
        title: '',
        body: '',
    });
    
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [showError, setShowError] = React.useState(false);
    
    // 使用 useMutation
    const mutation = useMutation({
        mutationFn: postResponsea,
        onSuccess: (data) => {
            console.log('POST 成功:', data);
            setShowSuccess(true);
            setResdataZustand(data as any);
            // 重置表单
            setFormData({
                userId: '', // 重置时也保持空值
                name: '',
                title: '',
                body: '',
            });
            queryClient.invalidateQueries({ queryKey:['repoData'] });
        },
        onError: (error) => {
            console.error('POST 失败:', error);
            setShowError(true);
        }
    });
    
    // 处理输入变化
    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    
        // 清除该字段的错误
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };
    
    // 验证表单
    const validateForm = () => {
        const newErrors = {
            userId: '',
            name: '',
            title: '',
            body: '',
        };
    
        let isValid = true;
    
        // 验证用户ID - 必填且必须是数字
        if (!formData.userId.trim()) {
            newErrors.userId = '用户ID是必填项';
            isValid = false;
        } else if (isNaN(Number(formData.userId)) || Number(formData.userId) <= 0) {
            newErrors.userId = '用户ID必须是大于0的数字';
            isValid = false;
        }
    
        // 验证姓名
        if (!formData.name.trim()) {
            newErrors.name = '姓名是必填项';
            isValid = false;
        }
    
        // 验证标题
        if (!formData.title.trim()) {
            newErrors.title = '标题是必填项';
            isValid = false;
        } 
    
        // 验证内容
        if (!formData.body.trim()) {
            newErrors.body = '内容是必填项';
            isValid = false;
        } else if (formData.body.trim().length < 10) {
            newErrors.body = '内容至少需要10个字符';
            isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };
    
    // 处理提交
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    
        if (validateForm()) {
            // 将 userId 转换为数字
            const submitData = {
                ...formData,
                userId: Number(formData.userId)
            };
            console.log('表单数据:', submitData);
            // 发送 POST 请求
            mutation.mutate(submitData);
        } else {
            setShowError(true);
        }
    };
    
    // 关闭提示
    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };
    
    const handleCloseError = () => {
        setShowError(false);
    };
    React.useEffect(() => {
        setIsPendingZustand(mutation.isPending);

        console.log('FormBtn 状态:', mutation.isPending);
    }, [mutation.isPending, setIsPendingZustand]);
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    联系表单
                </Typography>
                
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                    请填写以下必填信息
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {/* 用户ID输入框 - 没有默认值 */}
                        <TextField
                            label="用户ID"
                            type="number"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.userId}
                            onChange={handleInputChange('userId')}
                            error={!!errors.userId}
                            helperText={errors.userId || '请输入用户ID（必填）'}
                            placeholder="请输入用户ID"
                            inputProps={{ min: 1 }}
                        />

                        {/* 姓名输入框 */}
                        <TextField
                            label="姓名"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleInputChange('name')}
                            error={!!errors.name}
                            helperText={errors.name || '请输入您的姓名'}
                            placeholder="请输入您的姓名"
                        />

                        {/* 标题输入框 */}
                        <TextField
                            label="标题"
                            variant="outlined"
                            fullWidth
                            required
                            value={formData.title}
                            onChange={handleInputChange('title')}
                            error={!!errors.title}
                            helperText={errors.title || '请输入标题'}
                            placeholder="请输入标题"
                        />

                        {/* 内容输入框 */}
                        <TextField
                            label="内容"
                            variant="outlined"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={formData.body}
                            onChange={handleInputChange('body')}
                            error={!!errors.body}
                            helperText={errors.body || '请输入内容（至少10个字符）'}
                            placeholder="请输入内容..."
                        />

                        {/* 提交按钮 */}
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={mutation.isPending}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {mutation.isPending ? '提交中...' : '提交表单'}
                        </Button>
                    </Box>
                </form>

                {/* 成功提示 */}
                <Snackbar
                    open={showSuccess}
                    autoHideDuration={3000}
                    onClose={handleCloseSuccess}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSuccess} severity="success">
                        表单提交成功！
                    </Alert>
                </Snackbar>

                {/* 错误提示 */}
                <Snackbar
                    open={showError}
                    autoHideDuration={4000}
                    onClose={handleCloseError}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseError} severity="error">
                        请检查并填写所有必填项！
                    </Alert>
                </Snackbar>
            </Paper>
        </Box>
    )
}