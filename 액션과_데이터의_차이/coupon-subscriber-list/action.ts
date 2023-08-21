import { couponTable, emailTable } from './common-records'

// 구독자 가져오기 (A)
export const getSubscribers = (): Record<string, number> => {
  return emailTable
}

// 쿠폰 목록 가져오기 (A)
export const getCouponList = (): Record<string, 'good' | 'bad' | 'best'> => {
  return couponTable
}

export const sendEmail = (emailReq: Record<string, string>) =>
  Object.entries(emailReq).forEach(([email, coupon]) => console.log(`hello ${email} send coupon : ${coupon} bye...`))
