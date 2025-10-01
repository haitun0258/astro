export interface getResponseList {
    userId: number
    id: number
    title: string
    body: string
}

export interface getResponseData {
    data: getResponseList[]
}

// 修复：返回单个对象，不是数组
export const getResponse = async (): Promise<getResponseList[]> => {
    const response = await fetch(
        'http://jsonplaceholder.typicode.com/posts',
    )
    const data = await response.json()
    return data // 包装成对象
}


type getParmas = {
    id: number
}
// 修复：返回单个对象，不是数组
export const getResponsea = async (id:getParmas): Promise<getResponseList> => {
    const response = await fetch(
        `http://jsonplaceholder.typicode.com/posts/${id.id}`,
    )
    const data = await response.json()
    return data // 包装成对象
}


export interface postParmas {
    userId: number
    title: string
    body: string
}
export interface postItems {
    id: number
}

// 修复：返回单个对象，不是数组
export const postResponsea = async (body:postItems): Promise<postItems> => {
    const response =  await fetch(
        `http://jsonplaceholder.typicode.com/posts`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    )
    const data =  response.json()
    return data // 包装成对象
}