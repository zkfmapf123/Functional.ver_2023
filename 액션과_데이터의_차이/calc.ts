interface CouponGradeListParams {
  good: string[]
  bad: string[]
  best: string[]
}

// 이메일 목록 기준으로 미리 보내놓을 이메일 만들어 놓기 (C)
export const makeEmailReqeust = (sub: Record<string, number>, { good, bad, best }: CouponGradeListParams) =>
  Object.entries(sub).reduce((acc, [email, point]) => {
    const grade = getPointCondition(point)

    switch (grade) {
      case 'bad':
        acc[email] = bad[0]
        bad.shift()
        break

      case 'good':
        acc[email] = good[0]
        good.shift()
        break

      case 'best':
        acc[email] = best[0]
        best.shift()
        break
    }

    return acc
  }, {})

// point를 기준으로 grade 나누기 (C)
const getPointCondition = (point: number): 'good' | 'bad' | 'best' => {
  if (point > 10) return 'best'
  if (point >= 1) return 'good'
  return 'bad'
}
