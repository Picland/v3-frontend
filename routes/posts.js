const express = require('express')
const router = express.Router()

const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const checkLogin = require('../middlewares/check').checkLogin

// GET /posts 所有用户或者特定用户的文章页
// eg: GET /posts?author=xxx
router.get('/', (req, res, next) => {
  let author = req.query.author

  PostModel.getPosts(author)
    .then((posts) => {
      res.render('posts', {
        posts: posts
      })
    })
    .catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, (req, res, next) => {
  res.render('create')
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, (req, res, next) => {
  let author = req.session.user._id
  let title = req.fields.title
  let content = req.fields.content

  // 校验参数
  try {
    if (!title.length) {
      throw new Error('请填写标题')
    }
    if (!content.length) {
      throw new Error('请填写内容')
    }
  } catch (e) {
    req.flash('error', e.message)
    return res.redirect('back')
  }

  let post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  }

  PostModel.create(post)
    .then((result) => {
      // 此 post 是插入 mongodb 后的值，包含 _id
      post = result.ops[0]
      req.flash('success', '发表成功')
      // 发表成功后跳转到该文章页
      res.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})

// GET /posts/:postId 单独一篇的文章页
router.get('/:postId', (req, res, next) => {
  let postId = req.params.postId
  
  Promise.all([
    PostModel.getPostById(postId),// 获取文章信息
    CommentModel.getComments(postId),// 获取该文章所有留言
    PostModel.incPv(postId)// pv 加 1
  ])
  .then((result) => {
    let post = result[0]
    let comments = result[1]
    if (!post) {
      throw new Error('该文章不存在')
    }

    res.render('post', {
      post: post,
      comments: comments
    })
  })
  .catch(next)
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, (req, res, next) => {
  let postId = req.params.postId
  let author = req.session.user._id

  PostModel.getRawPostById(postId)
    .then((post) => {
      if (!post) {
        throw new Error('该文章不存在')
      }
      if (author.toString() !== post.author._id.toString()) {
        throw new Error('权限不足')
      }
      res.render('edit', {
        post: post
      })
    })
    .catch(next)
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
  let postId = req.params.postId
  let author = req.session.user._id
  let title = req.fields.title
  let content = req.fields.content

  PostModel.updatePostById(postId, author, { title: title, content: content })
    .then(() => {
      req.flash('success', '编辑文章成功')
      // 编辑成功后跳转到上一页
      res.redirect(`/posts/${postId}`)
    })
    .catch(next)
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, (req, res, next) => {
  let postId = req.params.postId
  let author = req.session.user._id

  PostModel.delPostById(postId, author)
    .then(() => {
      req.flash('success', '删除文章成功')
      // 删除成功后跳转到主页
      res.redirect('/posts')
    })
    .catch(next)
})

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, (req, res, next) => {
  let author = req.session.user._id
  let postId = req.params.postId
  let content = req.fields.content
  let comment = {
    author: author,
    postId: postId,
    content: content
  }

  CommentModel.create(comment)
    .then(() => {
      req.flash('success', '留言成功')
      // 留言成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, res, next) => {
  let commentId = req.params.commentId
  let author = req.session.user._id

  CommentModel.delCommentById(commentId, author)
    .then(() => {
      req.flash('success', '删除留言成功')
      // 删除成功后跳转到上一页
      res.redirect('back')
    })
    .catch(next)
})

module.exports = router
