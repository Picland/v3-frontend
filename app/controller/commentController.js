const commentService = require('../service/commentService')

module.exports = {
  createComment(req, res, next) {
    let author = req.session.user._id
    let articleId = req.params.articleId
    let content = req.fields.content
    let comment = {
      author: author,
      articleId: articleId,
      content: content
    }

    commentService.create(comment)
      .then(() => {
        req.flash('success', '留言成功')
        // 留言成功后跳转到上一页
        res.redirect('back')
      })
      .catch(next)
  },

  deleteComment(req, res, next) {
    let commentId = req.params.commentId
    let author = req.session.user._id

    commentService.delCommentById(commentId, author)
      .then(() => {
        req.flash('success', '删除留言成功')
        // 删除成功后跳转到上一页
        res.redirect('back')
      })
      .catch(next)
  }

}