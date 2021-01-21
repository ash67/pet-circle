class Products {
  instance;
  products = [
    {
      name: "squeaky-ball",
      display_name: "Amazing Squeaky Ball",
      category: "toys",
      avg_rating: 4.1,
      reviews: 9,
      varieties: [
        {
          size: "small",
          price: 9.98,
          currency: "AUD",
          colour: "black",
        },
        {
          size: "large",
          price: 19.95,
          currency: "AUD",
          colour: "black",
        },
      ],
    },
  ];

  static getInstance() {
    if (!Products.instance) {
      Products.instance = new Products();
    }
    return Products.instance;
  }

  getProducts() {
    return this.products;
  }

  getProductDisplayName(item) {
    const foundProduct = this.products.find((product) => {
      return product.varieties.find(
        (variety) =>
          product.name === item.name &&
          variety.size === item.size &&
          item.colour === item.colour
      );
    });
    if (foundProduct) {
      return foundProduct.display_name;
    }
  }
}

export default Products;
