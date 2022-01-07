let liNum = 0;

$('.tab-menu li').eq(liNum).addClass('active');
$('.tab-content li').eq(liNum).addClass('active');
$('.tab-menu li').on('click',function(){
  liNum = $(this).index();
  $('.tab-menu li').removeClass('active');
  $('.tab-content li').removeClass('active');
  $('.tab-menu li').eq(liNum).addClass('active');
  $('.tab-content li').eq(liNum).addClass('active');
})