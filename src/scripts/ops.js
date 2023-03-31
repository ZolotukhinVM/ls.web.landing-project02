(function(){
  const sections = $('section');
  const display = $('.maincontent');
  const sideMenu = $('.fixed-menu');
  let inScroll = false;
  const md = new MobileDetect(window.navigator.userAgent);  
  
  sections.first().addClass('active');
  
  const countSectionPosition = sectionEq => {
    return sectionEq * -100;
  }
  
  const changeMenuTheme = sectionEq => {
      const currentSection = sections.eq(sectionEq);
      const menuTheme = currentSection.attr('data-theme');
      const burger = $('.hamburger');
  
      (menuTheme == "black") ? sideMenu.addClass('fixed-menu--black') : sideMenu.removeClass('fixed-menu--black');
      (menuTheme == "black") ? burger.addClass('hamburger--theme--black') : burger.removeClass('hamburger--theme--black');
  }
  
  const  sectionTransition = sectionEq => {
  
    if (inScroll === true) return;
  
    const transitonOver = 1000;
    const mouseOver = 300;
    
    inScroll = true;
    position = countSectionPosition(sectionEq);
  
    changeMenuTheme(sectionEq);
  
    $('.maincontent').css({
      transform: `translateY(${position}%)`
    });
    
    sections.eq(sectionEq).addClass('active').siblings().removeClass('active');
  
    setTimeout(() => {
      inScroll = false;
  
      sideMenu
      .find('.fixed-menu__item')
      .eq(sectionEq)
      .addClass('fixed-menu__item--active')
      .siblings()
      .removeClass('fixed-menu__item--active');
  
    }, transitonOver + mouseOver)
    
  
  }
  
  const scrollViewport = direction => {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();
    if (direction === 'next' && nextSection.length) {
      sectionTransition(nextSection.index());
    } else if (direction ==='prev' && prevSection.length) {
      sectionTransition(prevSection.index());
    }
  }
  
  $(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    if (deltaY > 0) {
      scrollViewport("next");
    } 
  
    if (deltaY < 0) {
      scrollViewport("prev");
    }
  
  })
  
  
  $(window).on('keydown', (e) => {
    switch (e.keyCode) {
      case 40:
        scrollViewport('next');
        break;
      case 38:
        scrollViewport('prev');
        break;
      default:
        break;
    }
  })
  

  $('[data-scroll-to]').click(e => {
    e.preventDefault();
    $this = $(e.currentTarget);
    target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-id=${target}]`);
    console.log(reqSection.index());
    sectionTransition(reqSection.index());
  });
})();

// if (md.mobile()) {
//   $('.wrapper').on('touchmove', e => e.preventDefault());
//   $('body').swipe( {
//     swipe:function(direction) {
//       alert("You swiped " + direction );  
//       scrollDirection = "";
//       (direction == "up") ? scrollDirection = "prev" : scrollDirection = "next";
//       scrollViewport(scrollDirection);
//     }
//   });
// }