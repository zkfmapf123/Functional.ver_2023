namespace default_example {
  const a = [1, 2, 3, 4];
  const b = a.pop(); // a => [1,2,3] b => 4
  console.log(b); // 4
  console.log(a); // [1,2,3]
}

// 읽기함수와 쓰기함수로 분리
namespace separate_read_and_write {
  const getA = () => [1, 2, 3, 4];

  const popA = (array: number[], index: number) =>
    array.filter((_, i) => i !== index);

  const a = getA();
  const b = popA(a, 0);
  console.log(a);
  console.log(b);
}

// 값 두개 리턴하는 함수로 만들기
namespace return_two_value {
  const popA = (array: number[], index: number) => {
    return {
      primitiveArray: array,
      popArray: array.filter((_, i) => i !== index),
    };
  };

  const a = [1, 2, 3, 4];
  const { primitiveArray, popArray } = popA(a, 0);
  console.log(primitiveArray);
  console.log(popA);
}
