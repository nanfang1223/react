import fetch from '../axios/fetch'

// 上传头像
export const edAvatar = data => fetch.post( '/api/user/edAvatar',data)

// 获取我的信息
export const getMessage = data => fetch.get( '/api/user/info',data)

// 获取收款方式 - 银行卡信息
export const bankpayinfo = data => fetch.get( '/api/user/bankpayinfo',data)

// 获取收款方式 - 支付宝信息
export const alipayinfo = data => fetch.get( '/api/user/alipayinfo',data)

// 收款方式 - 上传支付宝截图
export const zbfimg = data => fetch.post( '/api/general/uploadimg',data)

// 收款方式 - 提交支付宝
export const bindalipay = data => fetch.post( '/api/user/bindalipay',data)

// 收款方式 - 添加银行卡
export const bindBankPay = data => fetch.post( '/api/user/bindBankPay',data)

// 收款方式 - 删除银行卡
export const delbankpay = data => fetch.post( '/api/user/delbankpay',data)

// 收款方式 - 删除支付宝
export const delAliPay = data => fetch.post( '/api/user/delAliPay',data)

// 设置 - 退出登录
export const outlogin = data => fetch.post( '/api/user/logut',data)

// 设置 - 修改用户昵称
export const edNickName = data => fetch.post( '/api/user/edNickName',data)

// 设置 - 资金密码状态
export const fundStatus = data => fetch.get( '/api/user/fundStatus',data)

// 设置 - 修改资金密码
export const edFundPwd = data => fetch.post( '/api/user/edFundPwd',data)

// 设置 - 修改用户密码
export const edPassword = data => fetch.post( '/api/user/edPassword',data)

// 实名认证
export const auth = data => fetch.post( '/api/user/auth',data)

// 获取实名认证信息
export const authinfo = data => fetch.get( '/api/user/authinfo',data)

// 添加提币地址
export const addaddress = data => fetch.post( '/api/user/addaddress',data)

// 获取提币地址列表
export const addresslist = data => fetch.post( '/api/user/addresslist',data)

// 充值
export const recharge = data => fetch.post( '/api/asset/recharge',data)

// 充值金额比例
export const recharInfo = data => fetch.post( '/api/asset/recharInfo',data)

// 提现详情
export const withdrawInfo = data => fetch.post( '/api/asset/withdrawInfo',data)

// 提现-普通提现
export const withdraw = data => fetch.post( '/api/asset/withdraw',data)

// 提现-互转
export const transfer = data => fetch.post( '/api/asset/transfer',data)

// 我的团队
export const myteam = data => fetch.post( '/api/user/myteam',data)

// 总资产
export const allMoney = data => fetch.post( '/api/Product/totalAssets',data)

// 累计收益
export const accumulatedIncome = data => fetch.post( '/api/Product/accumulatedIncome',data)

// 推广收益
export const promotionalBenefits = data => fetch.post( '/api/Product/promotionalBenefits',data)

// 团队收益
export const teamProfit = data => fetch.post( '/api/Product/teamProfit',data)

// 我的神兽列表
export const myOrder = data => fetch.post( '/api/Product/myOrder',data)

// 我的神兽-一键收币
export const oneKeyCollect = data => fetch.post( '/api/Product/oneKeyCollect',data)

// 我的神兽-兑换
export const exchange = data => fetch.post( '/api/Product/change',data)

// 我的神兽-续费
export const renewal = data => fetch.post( '/api/Product/reNew',data)

// 我的神兽-一键收币-数量
export const myKeyNum = data => fetch.post( '/api/Product/myKeyNum',data)

// 我的收益列表
export const allTotal = data => fetch.post( '/api/Product/allTotal',data)

// 邀请截图
export const generalize = data => fetch.post( '/api/user/generalize',data)


