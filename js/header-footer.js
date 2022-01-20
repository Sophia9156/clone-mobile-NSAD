
// header와 footer가 있는 모든 페이지에 header, footer 심기
$('header').load('header-footer.html header > div',headerFun);
$('footer').load('header-footer.html footer > div');

// 버거메뉴 클릭 시 히든메뉴 표시
function headerFun(){
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.hidden-menu-bg');
  const menuClose = document.querySelector('.hidden-menu-close');

  burger.onclick = function(){
    menu.classList.add('active');
  };
  menuClose.onclick = function(){
    menu.classList.remove('active');
  };


  // 검색버튼 클릭 시 검색공간 표시
  const searchBtn = document.querySelector('.search');
  const elSearch = document.querySelector('.hidden-search');
  const searchClose = document.querySelector('.hidden-search-close');

  searchBtn.onclick = function(){
    elSearch.classList.add('active');
  };
  searchClose.onclick = function(){
    elSearch.classList.remove('active');
  };


  // 검색공간의 탭 왔다갔다 하기
  const searchTab = document.querySelectorAll('.hidden-search-tab span');
  const searchResult = document.querySelectorAll('.hidden-search-result div');

  searchTab[0].classList.add('active');
  searchResult[0].classList.add('active');

  let idx = 0;
  searchTab.forEach(function(v,k){
    v.onclick = function(){
      searchTab[idx].classList.remove('active');
      searchResult[idx].classList.remove('active');
      searchTab[k].classList.add('active');
      searchResult[k].classList.add('active');
      idx = k;
    }
  });


  // 장바구니 아이콘에 담긴 아이템 개수 표시
  const cartBtn = document.querySelector('.cart span');
  if(localStorage.buyquantityM || localStorage.buyquantityL || localStorage.buyquantityXL){
    cartBtn.textContent = Number(localStorage.buyquantityM) + Number(localStorage.buyquantityL) + Number(localStorage.buyquantityXL)
  }else{
    cartBtn.textContent = '0';
  };
}

