// o["price"] = 37
function objectSet(object: any, key: any, value: any) {
  const copy = Object.assign({}, object); // 얕은 복사 진행
  copy[key] = value; // 값 넣기
  return copy; // Return
}
