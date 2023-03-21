const openItem = item => {
  const container = item.closest('.team__item');
  const contentBlock = container.find('.team__content');
  const textBlock = contentBlock.find('.team__item-info');
  const contentBlockHeight = textBlock.height();
  contentBlock.height(contentBlockHeight);
  container.addClass('team__item--active');
}

const closeItems = containter => {
  const items = containter.find('.team__content');
  const itemContainer = containter.find('.team__item');
  const itemName = containter.find('.team__item-name');
  itemContainer.removeClass('team__item--active');
  items.height(0);
}

$('.team__item-name').click (e => {
  e.preventDefault();
  const $this = $(e.currentTarget);
  const container = $this.closest('.team__list');
  const elemContainer = $this.closest('.team__item');
  if (elemContainer.hasClass('team__item--active')) {
    closeItems(container);
  } else {
    closeItems(container);
    openItem($this);
  }
})