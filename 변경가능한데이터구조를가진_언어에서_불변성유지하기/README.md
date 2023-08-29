# 변경가능한 데이터구조를 가진 언어에서 불변성 유지하기

## 불변성 유지하는 코드 만들기 (wis님 part)

> StateFul vs Stateless

- StateFul (정보를 가지고 있는 경우)
- StateLess (정보를 가지고있지 않은 경우) <- 불변성을 가짐

```
기존 Application Level에서 StateFul한 객체, StateFul한 Component라고 한다면,
인스턴스 및 Component는 항상 값이 고정되어있지 않다 (변한다) -> 값을 예측하기 어렵다 -> 부수효과..

Stateless한 방법을 구상한다면 -> 값을 예측할 수 있다 -> 부수효과 없어짐 -> 순수함수
```

> 모든것을 불변형으로 바꿀수는 없을까?

```
    1. 제품개수 가져오기
    2. 제품이름으로 제품 가져오기
    3. 제품 추가하기
    4. 제품이름으로 제품빼기
    5. 제품이름으로 제품구매 수량 바꾸기 (Coupling 발생)
```

- 결국 모든 불변셩을 유지하기 위해선 Read / Write 형태로 나눠야 함
- Write 형태에서는 3가지 규칙을 준수 해야 함 (Copy-On-Write) \*\*\*
  - 복사본 만들기 (.slice, spread, loadsh... )
  - 복사본을 변경
  - 복사본 Return -> Primitive 값을 훼손하지 않는다 (원본의 값)

```typescript
// 새로운 배열을 다시 반환 함 (Copy-On-Write)
function add_element_last(array: string[], elem: string) {
  return [...array, elem];
}
```

```typescript
// 새로운 배열을 다시 반환 함 (Copy-On-Write)
function remove_item_by_name(cart: string[], name: string) {
  return cart.filter((name) => name !== name);
}
```

> 만약 Write + Read가 같이 하는 함수는 어떻게 해야할까?

1. 읽기와 쓰기 함수로 각각 분리한다 (SRP => Single Responsibiliy Principle)
   - 함수가 많아짐
   - CodeBase가 길어질 수 있음
   - 하나의 기능을 만든다는 전제하에 여러개의 Read 조각함수, Write 조각함수가 생성될 여지가 있음
2. 함수에서 값을 2개 리턴한다
   - 굳이?
   - 왜?
   - 때에 따라 더 좋을수도 있을 듯함 <- 전체 CodeBase가 줄어들수 있음

> 연습문제

- [example_1](./example_1.ts)
- [example_2](./example_2.ts)

> 109 ~ 130 Conclustion

- 불변성 즉 순수함수를 유지하기 위해선 Read / Write를 구분한다.
- Write 함수가 존재한다면 Copy-on-Write 방식을 사용해야 한다
- .slice, .splice 여러 메서드가 존재하지만 개인적으로 (.map, .filter, .reduce, ... )를 사용하자.
- Read + Write를 나눌수 없고 두개가 공존한다면 2가지 방법을 사용하자
  - 읽기쓰기 함수로 각각 분리하는 방법 (이게 좋은 듯)
  - 두개의 값을 Return하자 (약간 굳이인듯하다...) <- 때에 따라 더 좋을수도 있을듯

## 결국 불변의 데이터를 읽는 것은 계산이다 (이동규)

- 변경 가능한 데이터를 읽는것은 액션이다
  - 액션자체는 순수함수가 아닌 변경할수 있는 함수이다. 그렇기에 언제든지 변경가능한 데이터를 참조할 수 있다.
- 쓰기는 데이터를 변경가능한 구조로 만든다
  - 불변의 데이터라도 쓰기가 발생한다면 변경가능한 구조로 만들 수 있다.
- 어떤 데이터의 쓰기가 없다면 데이터는 변경불가능한 데이터이다.
  - 어떠한 데이터의 추가적인 쓰기 함수가 없다면 해당 데이터는 불변의 데이터이다.
- 불변데이터 구조를 읽는 것은 계산입니다.
  - 변경되지 않는 불변의 데이터는 액션에서 참조되는 것이 아닌 계산에서 참조된다.
- 쓰기를 읽기로 바꾸면 코드에 계산이 많아집니다.
  - Copy-on-Wirte를 말하는건가?
  - 코드가 길어지긴 함

> 시간에 따라 변하는 함수는 어떻게 관리될까?

    - 시간에 따라 변한다고 하더라도 함수형 패턴에서는 값은 항상 최신상태를 유지한다.
    - Copy-on-Write 형태내에서 값은 최신상태를 유지하도록 관리한다.

```typescript
const shoppingList = [];

const addToShoppingList = (shoppingList: stirng[], shopping: string) => {
  /*
   * Copy-on-Wirte
   */
  return newShoppintList;
};

shoppintList = addToShoppingList(shoppingList, "new"); // 새로운값으로 계속 대체된다.
```

> 불변의 데이터는 효율적인가?

- 불변의 데이터를 유지하기 위한 방법

  - Copy-on-Write
  - 읽기/쓰기 나누기, 값을 2개로 처리하기

- 함수형 프로그래밍 (불변의 데이터)는 메모리를 더 많이 사용한다.

  - 예전에는 Memory 친화적인 개발을 주로했지만, 현재는 Hardware 비용이 싸졌기에 메모리를 좀더 써도 괜찮음
  - Memory를 좀더 사용하더라도, 좀더 안정적인 개발을 도모할 수 있음

- GC
  - 기본적인 GC는 2가지형태로 나뉨 (MarkSweep, Scavenger)
  - MarkSweep (느리지만 한번에 많이 처리), Scavenger (빠르지만 조금씩 처리)
  - 함수단위로 Copy-on-Wirte하게 되면 함수자체내에서 메모리를 사용하고 회수하는 형태로 개발이 진행됨

> 객체의 대한 Copy-on-Write (얕은복사 2가지 방식)

```typescript
// 기존의 Copy-on-Write
const a = [1, 2, 3, 4, 5];
const b = a.map((it) => it + 10);
```

```typescript
// Example 1) 객체의 Copy-on-Write
const a = {
  name: "leedonggyu",
  job: "programmer",
};

const b = {
  ...a,
  name: "leedonggyu-2",
  job: "promgrammer-2",
};

console.log(b);
```

```typescript
// Example 2) 객체의 Copy-on-Write
const a = {
  name: "leedonggyu",
  job: "programmer",
};

const b = Object.assign(a, { name: "leedonggyu-2", job: "programmer-2" });
```

> 자바스크립트를 사용하다보면 많이 쓰는 함수 (실무에서도 많이 사용함)

- Object.keys()
- Object.values()
- Object.entries()
- Object.assign()

> 중첩된 쓰기를 읽기로 바꾸기

```typescript
// Before Refactoring
function setPriceByName(cart, name, price) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === name) {
      cart[i].price = price;
    }
  }
}

// After Refactoring (Copy-on-Write)
function setPriceByName(cart, name, price) {
  // Copy-on-Wirte 형식으로 변경
  return cart.map((it) => {
    if (it == name) {
      setPrice(it, price);
    }

    return it;
  });
}

function setPrice(item, new_price) {
  // 값을 변경하는 부분도 Copy-on-Write
  return Object.assign(item, {
    price: new_price,
  });
}
```

> 연습문제

- [objectSet 함수 만들기](./example_3.ts)
- [objestSet 함수를 사용하여 Refactoring 하기](./example_4.ts)

> Conclustion

- 함수형 프로그래밍 자체는 불변의 데이터가 필요하다. 결국 함수 코드레벨내에서 Copy-on-Write를 진행한다.
- Copy-on-Write는 데이터를 불변형으로 유지할 수 있다. -> 원본대신 복사본을 사용한다 (spread, Object.assign)
