(function(){
  const items = $('.products__item');
  const getItemWidth = (item) => {
    let resultWidth = 524;
  
    const windowWidth = $(window).width();
    const itemWidth = item.outerWidth(true);
  
    const isTablet = window.matchMedia('(max-width: 768px').matches;

    const isMobile = window.matchMedia('(max-width: 480px').matches;

    if (isTablet) {
      resultWidth = windowWidth - itemWidth * items.length;
    }
    if (isMobile) {
      resultWidth = windowWidth - itemWidth;
    }
  
    return resultWidth;
  }
  
  const setItemWith = (item, width) => {
    const itemContent = item.next();
    const itemText = itemContent.children();
    // console.log(itemText);
  
    itemContent.width(width + 'px');
    itemText.outerWidth(width + 'px');
  
  }
  
  const closeItem = (item) => {
    const itemParent = item.parent();
    itemParent.removeClass('products__item--active');
    item.removeClass('products__button--active');
  
    setItemWith(item, 0);
  }
  
  const openItemProduct = (item) => {
    const itemParent = item.parent();
    itemParent.addClass("products__item--active");
    item.addClass("products__button--active");
  
    const width = getItemWidth(item);
  
    setItemWith(item, width);
  }
  
  $('.products__button').click(e => {
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    console.log('e = ', $this);
    const isActive = $this.hasClass('products__button--active');
    const activeElement = $('.products__button--active');
  
    if ($this.hasClass('products__button') && isActive) {
      if (activeElement) {
        closeItem(activeElement);
      }
    }
  
    if ($this.hasClass('products__button') && !isActive) {
      if (activeElement) {
        closeItem(activeElement);
      }
      openItemProduct($this);
    }
  });
})();
