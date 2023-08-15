{
  /**
   * ##########################################################################################################################################################
   * Action
   * ##########################################################################################################################################################
   */

  /**
   * @decs 이메일 보내는 함수
   * @personality 액션
   */
  const sendEmail = (to: string, from: string, subject: string, body: string) => {}

  /**
   * @desc 유저 저장하는 함수
   * @personality 액션
   */
  const saveUserDB = (user: {}) => {}

  /**
   * @desc 현재 시간을 구하는 함수
   * @personality 액션 (값이 계속 변함)
   */
  const getCurrentTime = () => {}

  /**
   * #########################################################################################################################################################
   * Calculator
   * #########################################################################################################################################################
   */

  /**
   * @desc 값들을 더하는 함수
   * @personality 계산
   */
  const sum = (numbers: string[]) => {}

  /**
   * @desc 문자열의 length를 반환하는 함수
   * @personality 계산
   */
  const getStringLength = (str: string) => {}

  /**
   * #########################################################################################################################################################
   * Data
   * #########################################################################################################################################################
   */

  const data = {
    firstname: 'Lee',
    lastName: 'donggyu',
  }
}

{
  /**
   * ############################################# 기본로직 1 #############################################
   */
  const DB: {
    [x: string]: Users
  } = {}

  interface Users {
    firstname: string
    lastname: string
  }

  const saveUserDB = (user: Users): void => {
    DB[user.firstname] = user
  }

  const sendEmail = (to: string, from: string, subject: string, user: Users) => {
    console.log({
      to,
      from,
      subject,
      body: JSON.stringify(user),
    })
  }

  ;(() => {
    saveUserDB({
      firstname: 'lee',
      lastname: 'donggyu',
    })

    sendEmail('zkfmapf123@naver.com', 'zkfmapf123@naver.com', 'hello world', DB['lee'])
  })()
}

/**
 * ############################################# 기본로직 1 + 함수형 로직으로 수정 #############################################
 */
{
  interface Users {
    firstname: string
    lastname: string
  }

  /**
   * 데이터
   */
  const createUser = (firstname: string, lastname: string): Users => ({
    firstname,
    lastname,
  })

  /**
   * 액션
   */
  const saveUserDB = (db: Record<string, Users>, user: Users) => ({
    ...db,
    [user.firstname]: user,
  })

  interface Email {
    to: string
    from: string
    subject: string
    body: string
  }

  /**
   * 계산
   */
  const createEmail = (to: string, from: string, subject: string, body: Users): Email => ({
    to,
    from,
    subject,
    body: JSON.stringify(body),
  })

  /**
   * 액션
   */
  const sendEmail = (email: Email): void => {
    console.log(email)
  }

  ;(() => {
    const db: Record<string, Users> = {}
    const user = createUser('lee', 'donggyu')
    saveUserDB(db, user)

    const email = createEmail('zkfmapf123@naver.com', 'zkfmapf123@naver.com', 'hello world', db['lee'])
    sendEmail(email)
  })()
}
