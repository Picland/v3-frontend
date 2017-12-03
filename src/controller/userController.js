import fs from 'fs'
import path from 'path'
import sha1 from 'sha1'
import userService from '../service/userService'
import tokenUtil from '../util/token'

const getOwnInfo = async (req, res, next) => {
    const oldToken = tokenUtil.getToken(req)
    if (oldToken && tokenUtil.verifyToken(oldToken)) {
        // TODO: revoke old token
        const newTokent = tokenUtil.refreshToken(oldToken)
        res.cookie('token', newTokent, {httpOnly: true})
        try {
            const user = await userService.getUserById(tokenUtil.decodeToken(newTokent).userId)
            delete user.password
            res.api({user})
        } catch (e) {
            res.api(403, {}, {
                code: -1,
                msg: e.message
            })
        }
    } else {
        res.api(401, {}, {
            code: -1,
            msg: '未登录无权限'
        })
    }
}

const getUserInfo = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id)
        delete user.password
        res.api({user})
    } catch (e) {
        res.api(403, {}, {
            code: -1,
            msg: e.message
        })
    }
}

const updateUserInfo = async (req, res, next) => {
    if (req.body.password) {
        if (req.body.newpassword1 && req.body.newpassword2) {
            let {password, newpassword1, newpassword2} = req.body
            // 基础校验
            if (password.length < 6 || password.length > 16) {
                throw new Error('密码长度须6-16位')
            }
            if (newpassword1.length < 6 || newpassword1.length > 16) {
                throw new Error('密码长度须6-16位')
            }
            if (newpassword2.length < 6 || newpassword2.length > 16) {
                throw new Error('密码长度须6-16位')
            }
            // 基础校验通过
            password = sha1(password)
            newpassword1 = sha1(newpassword1)
            newpassword2 = sha1(newpassword2)
            try {
                const user = await userService.getUserById(req.headers.userid)
                if (password !== user.password) {
                    throw new Error('原密码不正确')
                }
                if (newpassword1 !== newpassword2) {
                    throw new Error('两次密码输入不一致')
                }
                let result = await userService.updateUserInfo(req.headers.userid, {password: newpassword2})
                delete result.password
                res.api(result)
            } catch (e) {
                res.api(403, {}, {
                    code: -1,
                    msg: e.message
                })
            }
        } else {
            res.api(403, {}, {
                code: -1,
                msg: '请填写新密码'
            })
        }
    } else {
        try {
            let result = await userService.updateUserInfo(req.headers.userid, req.body)
            delete result.password
            res.api(result)
        } catch (e) {
            res.api(403, {}, {
                code: -1,
                msg: e.message
            })
        }
    }
}

const updateUserAvatar = async (req, res, next) => {
    const avatar = req.files.files
    const body = {
        avatar: avatar.path.split(path.sep).pop()
    }
    try {
        let result = await userService.updateUserInfo(req.headers.userid, body)
        delete result.password
        res.api(201, result, {
            code: 0,
            msg: '上传成功'
        })
    } catch (e) {
        // 上传头像失败，异步删除上传的头像
        avatar && avatar.path && fs.unlink(avatar.path)
        res.api(403, {}, {
            code: -1,
            msg: e.message
        })
    }
}

export default {
    getOwnInfo,
    getUserInfo,
    updateUserInfo,
    updateUserAvatar
}
