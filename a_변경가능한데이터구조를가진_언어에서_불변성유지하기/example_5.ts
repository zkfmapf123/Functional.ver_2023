import { cloneDeep } from 'lodash'

namespace shallowcopy {
  console.log('\n\n=================== shallow copy ===================')
  const person = {
    name: 'leedonggyu',
    region: {
      city: 'seoul',
      country: 'korea',
    },
  }

  const person_2 = Object.assign({}, person)
  person_2.name = '123123123'

  console.log('person >> ', person.name) // leedonggyu
  console.log('person_2 >>', person_2.name) // 123123123

  person_2.region.city = 'busan'

  console.log(person)
  console.log(person_2)
}

namespace deepcopy {
  console.log('\n\n=================== deepcopy ===================')
  const person = {
    name: 'leedonggyu',
    region: {
      city: 'seoul',
      country: 'korea',
    },
  }

  const person_2 = cloneDeep(person)
  person_2.name = '123123123'
  console.log('person >> ', person)
  console.log('person_2 >> ', person_2)

  person_2.region.city = 'incheon'
  console.log(person)
  console.log(person_2)
}
