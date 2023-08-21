import { getCouponList, getSubscribers, sendEmail } from './action'
import { makeEmailReqeust } from './calc'
import { makeBadCoupon, makeBestCoupon, makeGoodCoupon } from './data'
;(() => {
  // 1. 구독자 가져오기 A
  const subscriberList = getSubscribers()

  // 2. 쿠폰 가져오기 A
  const couponList = getCouponList()

  // 3. 리스트에서 Good (D)
  const goodCoupon = makeGoodCoupon(couponList)

  // 4. 리스트에서 Best (D)
  const bestCoupon = makeBestCoupon(couponList)

  // 5. 리스트에서 Bad (D)
  const badCoupon = makeBadCoupon(couponList)

  // 6. Email 목록을 미리 만들기 (C)
  const emailReq = makeEmailReqeust(subscriberList, {
    good: goodCoupon,
    best: bestCoupon,
    bad: badCoupon,
  })

  // 7. 이메일 보내기 (A)
  sendEmail(emailReq)
})()
