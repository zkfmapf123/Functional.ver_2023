import * as _ from "lodash";

let shopping_cart = [];

function add_item_to_cart(name, price) {
  const item = make_cart_item(name, price);
  shopping_cart = add_item(shopping_cart, item); // copy-on-write
  const total = calc_total(shopping_cart); // copy-on-write
  set_cart_total_dom(total);
  update_shipping_icons(shopping_cart);
  update_tax_dom(total);
  black_friday_promotion(shopping_cart); // <- 이 함수에서 copy-on-wirte를 준수할 수는 없을까? 기존의 장바구니 데이터를 변경해야 함
}

const calc_total = (shopping_cart) => {};

const update_tax_dom = (total) => {};

const update_shipping_icons = (shopping_cart) => {};

const set_cart_total_dom = (total) => {};

const make_cart_item = (name, price) => {};

const add_item = (shopping_cart, item) => {
  /**
   * first method
   * */
  // const newShoppingCart = Object.assign([], shopping_cart)
  // return newShoppingCart.push(item)
  /**
   * secound method
   */
  //   return shopping_cart.map((it) => it).push(item);

  return [];
};

const black_friday_promotion = (shopping_cart) => {
  const newShoppingCart = _.cloneDeep(shopping_cart);
  /**
   * job
   */
};
