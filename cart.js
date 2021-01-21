class Cart {
  instance;
  selectedItems = [];

  static getInstance() {
    if (!Cart.instance) {
      Cart.instance = new Cart();
    }
    return Cart.instance;
  }

  addItemsToCart(itemName, colour, size) {
    const hasItemAddedBefore = this.selectedItems.find(
      (item) =>
        item.name === itemName && item.size === size && item.colour === colour
    );
    if (hasItemAddedBefore) {
      hasItemAddedBefore.qty++;
    } else {
      this.selectedItems.push({
        name: itemName,
        colour: colour,
        size: size,
        qty: 1,
      });
    }
  }

  getTotalItemsCount() {
    return this.selectedItems.reduce((sum, current) => sum + current.qty, 0);
  }

  getSelectedItems() {
    return this.selectedItems;
  }
}
export default Cart;
