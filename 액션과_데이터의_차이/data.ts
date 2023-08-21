// good 쿠폰 모음 (D)
export const makeGoodCoupon = (cou: Record<string, 'good' | 'bad' | 'best'>): string[] =>
  Object.entries(cou)
    .filter(([_, grade]) => grade === 'good')
    .map(([coupon, _]) => coupon)

// best 쿠폰 모음 (D)
export const makeBestCoupon = (cou: Record<string, 'good' | 'bad' | 'best'>): string[] =>
  Object.entries(cou)
    .filter(([_, grade]) => grade === 'best')
    .map(([coupon, _]) => coupon)

// bad 쿠폰 모음 (D)
export const makeBadCoupon = (cou: Record<string, 'good' | 'bad' | 'best'>): string[] =>
  Object.entries(cou)
    .filter(([_, grade]) => grade === 'bad')
    .map(([coupon, _]) => coupon)
