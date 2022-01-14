
// 장바구니에 담긴 상품이 없을 때
if(!localStorage.buyquantity){
  $('.empty').addClass('active');
  $('.filled').removeClass('active');
}

// 장바구니에 담긴 상품이 있을 때
if(localStorage.buyquantity){
  $('.empty').removeClass('active');
  $('.filled').addClass('active');
}


// 장바구니에 상품 localStorage로 추가하기
let buyProduct = '';
buyProduct += `
<li class="product-unit">
  <div class="unit-top">
    <div class="select-one">
      <input type="checkbox" id="selectOne" name="selectOne">
      <label for="selectOne">
        <span class="material-icons-outlined">
          check_circle
        </span>
      </label>
    </div>
    <figure><img src="${localStorage.buyImageSrc}" alt=""></figure>
    <div class="product-info">
      <p class="product-name">${localStorage.buyProductName}</p>
      <p class="product-size">사이즈 : ${localStorage.buySize}</p>
      <p class="product-quantity">수량 : <span class="qty">${localStorage.buyquantity}</span> 개</p>
      <p class="product-price">￦<span class="price">${localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span></p>
    </div>
    <div class="product-unit-close">
      <span></span>
      <span></span>
    </div>
  </div>
  <p class="unit-bottom">기본-금액별배송비 ￦0 (택배-선결제)</p>
</li>`;
$('.product-list-wrap').html(buyProduct);


// 최종 결정 창 표시
window.onload = function(){
  selectAll.checked = true;
  selectOne.checked = selectAll.checked;
  if(checkBox.checked){
    $('#totalQuantity').html(localStorage.buyquantity);
    $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
    totalSum = localStorage.buyPrice;
    $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
  }
}

// 전체상품 체크
let checkBox = document.querySelector('#selectOne');
let totalSum = '';
selectAll.onclick = function(){
  selectOne.checked = this.checked;
  if(checkBox.checked){
    $('#totalQuantity').html(localStorage.buyquantity);
    $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
    totalSum = localStorage.buyPrice;
    $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
  }else{
    $('#totalQuantity').html('0');
    $('#totalPrice').html('0');
    $('#totalPriceSum').html('0');
  }
};
selectOne.onclick = function(){
  selectAll.checked = this.checked;
  if(checkBox.checked){
    $('#totalQuantity').html(localStorage.buyquantity);
    $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
    totalSum = localStorage.buyPrice;
    $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
  }else{
    
  }
}


// 선택 상품 삭제
$('.select-delete').on('click',function(){
  if(selectOne.checked){
    localStorage.buyquantity = '';
    $('header .cart span').html(localStorage.buyquantity);

    buyProduct = '';
    $('.product-list-wrap').html(buyProduct);
    $('#totalQuantity').html('0');
    $('#totalPrice').html('0');
    $('#totalPriceSum').html('0');
  }
});

// 개별 상품 삭제
$('.product-unit-close').on('click',function(){
  localStorage.buyquantity = '';
  $('header .cart span').html(localStorage.buyquantity);

  buyProduct = '';
  $('.product-list-wrap').html(buyProduct);
  $('#totalQuantity').html('0');
  $('#totalPrice').html('0');
  $('#totalPriceSum').html('0');
});