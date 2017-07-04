export const DOMAIN = ''
const CREDENTIALS = (process.env.ORIGIN) ? 'include' : 'same-origin'
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const createResult = (result) => result
    ? result.json()
    : {
      code: -2,
      message: '未知错误'
    }
/*
 处理所有网络请求_目前没有和action集成异步数据流，
 使用同步数据流达成类似效果的后遗症应该就是组件耦合性巨高。。
 */

/*
 请求所有的博文
 /api/posts?author=xxx
 */

export const fetchPosts = async(id) => {
  let url = DOMAIN + `/api/posts?author=${id}`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}
/*
 请求单个博文
 /api/posts/
 */
export const fetchPost = async(postId) => {
  if (DOMAIN === '..') {
    // 服务器部署下需要调整路径,没有考虑到相对路径存在的问题
  }
  let url = DOMAIN + `/api/posts/${postId}`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 删除博文
 */
export const deletePost = async(params) => {
  let url = DOMAIN + `/api/posts/${params.postId}/remove`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 发表博文
 */
export const addPost = async(params) => {
  let url = DOMAIN + '/api/posts'
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        article: params.article
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}
// GET api/posts/edit/:postId  获取编辑文章的信息
export const fetchEditPost = async(postId) => {
  let url = DOMAIN + `/api/posts/edit/${postId}`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 更新博文
 */
export const updatePost = async(postId, article) => {
  let url = DOMAIN + `/api/posts/${postId}/edit`
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        title: article.title,
        context: article.context
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 注册
 涉及头像上传
 暂时不分离
 params
 account
 name
 password
 bio
 */
export const register = async(formData) => {
  let url = DOMAIN + '/api/signUp'
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      //      headers: {
      //          'Content-Type': 'application/x-www-form-urlencoded'
      //  },
      body: formData
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}
/*
 登录
 */
export const login = async(params) => {
  let url = `${DOMAIN}/api/v1/login`
  let { account, password } = params
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        account: account,
        password: password
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 添加评论
 */
export const addComment = async(params) => {
  let { articleId, comment } = params
  let url = DOMAIN + `/api/posts/${articleId}/comment`
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        articleId: articleId,
        content: comment
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

/*
 删除评论
 */
// GET /posts/:postId/comment/:commentId/remove 删除一条留言
export const deleteComment = async(params) => {
  let {articleId, commentId} = params
  let url = DOMAIN + `/posts/${articleId}/comment/${commentId}/remove`
  let result
  try {
    result = await fetch(url, {
      method: 'GET',
      headers: defaultHeaders,
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

export const checkAccount = async(account) => {
  let url = DOMAIN + '/api/checkAccount'
  let result
  try {
    result = await fetch(url, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({
        account
      }),
      credentials: CREDENTIALS
    })
  } catch (e) {
    console.error(e)
  }
  return createResult(result)
}

//* * promise
export const loginFetch = (params) => {
  let {account, password} = params
  let url = DOMAIN + '/api/signIn'
  return fetch(url, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      account: account,
      password: password
    }),
    credentials: CREDENTIALS
  })
}
