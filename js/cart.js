
// 장바구니에 담긴 상품이 없을 때
if(!localStorage.buyquantity){
  $('.empty').addClass('active');
}

// 장바구니에 담긴 상품이 있을 때
if(localStorage.buyquantity){
  $('.empty').removeClass('active');
  $('.filled').addClass('active');
}