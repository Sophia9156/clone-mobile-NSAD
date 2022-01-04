$('header').load('inc.html header > div',headerFun);
$('footer').load('inc.html footer > div');

function headerFun(){
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.hidden-menu-bg');
  const menuClose = document.querySelector('.hidden-menu-close');

  burger.onclick = function(){
    menu.classList.add('active');
  }
  menuClose.onclick = function(){
    menu.classList.remove('active');
  }


  const searchBtn = document.querySelector('.search');
  const elSearch = document.querySelector('.hidden-search');
  const searchClose = document.querySelector('.hidden-search-close');

  searchBtn.onclick = function(){
    elSearch.classList.add('active');
  }
  searchClose.onclick = function(){
    elSearch.classList.remove('active');
  }


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
  })
}