
// 장바구니에 담긴 상품이 없을 때
if(!localStorage.buyquantity){
  $('.empty').addClass('active');
}

// 장바구니에 담긴 상품이 있을 때
if(localStorage.buyquantity){
  $('.empty').removeClass('active');
  $('.filled').addClass('active');
}

// 전체상품 체크
selectAll.checked;
selectAll.onclick = function(){
  selectOne.checked = this.checked;
};


// 장바구니에 상품 localStorage로 추가하기
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

    }
  })
}
dataChange();