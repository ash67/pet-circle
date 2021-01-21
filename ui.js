import Products from "./products.js";
import Cart from "./cart.js";

(() => {
  const products = Products.getInstance().getProducts();

  const generateProductVarietiesMarkup = (product) => {
    const markup = [];
    product.varieties.forEach((variant) => {
      const productVariantContainer = document.createElement("span");
      productVariantContainer.innerHTML = variant.size;
      productVariantContainer.classList.add("variant");
      productVariantContainer.onclick = () => {
        productVariantContainer.classList.add("selected");
        const priceElement = document.getElementById("price");
        priceElement.innerHTML = `$${variant.price}`;
        const addToCartElement = document.getElementById("addToCart");
        addToCartElement.setAttribute("data-selected-size", variant.size);
        addToCartElement.setAttribute("data-selected-colour", variant.colour);
        const errorSpanElement = document.getElementsByClassName("error");
        errorSpanElement[0]?.remove();
      };
      markup.push(productVariantContainer);
    });
    return markup;
  };

  const addToCartHandler = (product) => {
    const addToCartButtonElement = document.getElementById("addToCart");
    const selectedSize = addToCartButtonElement.getAttribute(
      "data-selected-size"
    );
    const selectedColour = addToCartButtonElement.getAttribute(
      "data-selected-colour"
    );

    if (selectedSize) {
      Cart.getInstance().addItemsToCart(
        product.name,
        selectedColour,
        selectedSize
      );
      const totalItemsInCartElement = document.getElementById("addItemsCount");
      totalItemsInCartElement.innerText = Cart.getInstance().getTotalItemsCount();
      totalItemsInCartElement.style.visibility = "visible";
      addToCartButtonElement.removeAttribute("data-selected-size");
      addToCartButtonElement.removeAttribute("data-selected-colour");
      const  selectedSizeElement =  document.getElementsByClassName("selected");
      selectedSizeElement[0]?.classList.remove("selected");
      showSelectedItems();
    } else {
      const varietiesContainerElement = document.getElementsByClassName(
        "varieties"
      );
      const errorSpanElement = document.createElement("span");
      errorSpanElement.className = "error";
      errorSpanElement.innerText = "Please select size";
      varietiesContainerElement[0].insertAdjacentElement(
        "afterEnd",
        errorSpanElement
      );
    }
  };

  const generateProductsMarkup = (products) => {
    const nodes = [];
    products.forEach((product) => {
      const productContainer = document.createElement("div");
      productContainer.classList.add("product");

      // image tag
      const imgElement = document.createElement("img");
      imgElement.src = "./assets/img/squeaky-ball.png";
      imgElement.className = "product-image";

      // product name tag
      const productNameElement = document.createElement("strong");
      productNameElement.innerText = product.display_name;

      // product varieties
      const allProductVarieties = document.createElement("div");
      allProductVarieties.classList.add("varieties");
      const varietiesNodes = generateProductVarietiesMarkup(product);
      allProductVarieties.append(...varietiesNodes);

      // price
      const priceContainer = document.createElement("span");
      if (product.varieties[0]) {
        priceContainer.classList.add("price");
        priceContainer.setAttribute("id", "price");
        priceContainer.innerHTML = `$${product.varieties[0].price}`;
      }

      // add to cart
      const addToCartButtonElement = document.createElement("button");
      addToCartButtonElement.setAttribute("id", "addToCart");
      addToCartButtonElement.innerText = "Add to cart";
      addToCartButtonElement.onclick = () => addToCartHandler(product);

      productContainer.appendChild(imgElement);
      productContainer.appendChild(productNameElement);
      productContainer.appendChild(allProductVarieties);
      productContainer.append(priceContainer);
      productContainer.append(addToCartButtonElement);
      nodes.push(productContainer);
    });
    return nodes;
  };

  const generateSelectedItemsMarkup = (selectedItems) => {
    const itemsNode = [];
    selectedItems.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = "selected-item";
      const imageEle = document.createElement("img");
      imageEle.src = "./assets/img/squeaky-ball.png";
      imageEle.width = 80;

      const productName = document.createElement("span");
      productName.textContent = Products.getInstance().getProductDisplayName(
        item
      );
      const productColour = document.createElement("span");
      productColour.textContent = item.colour;
      const productSize = document.createElement("span");
      productSize.textContent = item.size;
      const productQty = document.createElement("span");
      productQty.textContent = item.qty;

      itemContainer.append(
        ...[
          imageEle,
          productName,
          productColour,
          productSize,
          productSize,
          productQty,
        ]
      );
      itemsNode.push(itemContainer);
    });
    return itemsNode;
  };

  const showSelectedItems = () => {
    const selectedItems = Cart.getInstance().getSelectedItems();

    if (!selectedItems.length) {
      return;
    }
    let selectedItemsHeading;
    let addedItemsContainer;
    let selectedItemsContainer;

    if (!document.getElementById("addedItems")) {
      addedItemsContainer = document.createElement("div");
      addedItemsContainer.setAttribute("id", "addedItems");
      selectedItemsHeading = document.createElement("h2");
      selectedItemsHeading.innerText = "Items added to cart";
      document.getElementById("content").append(addedItemsContainer);
      selectedItemsContainer = document.createElement("div");
      selectedItemsContainer.setAttribute("id", "selectedItemsContainer");
      addedItemsContainer.append(
        ...[selectedItemsHeading, selectedItemsContainer]
      );
    }
    addedItemsContainer = document.getElementById("addedItems");
    selectedItemsContainer = document.getElementById("selectedItemsContainer");
    const selectedItemsHtmlNodes = generateSelectedItemsMarkup(selectedItems);

    if (selectedItemsContainer.hasChildNodes()) {
      selectedItemsContainer.querySelectorAll("*").forEach((n) => n.remove());
    }
    selectedItemsContainer.append(...[...selectedItemsHtmlNodes]);
  };

  const allProductsContainer = document.createElement("div");
  allProductsContainer.classList.add("products");
  const productsNode = generateProductsMarkup(products);
  allProductsContainer.append(...productsNode);
  document.getElementById("content").appendChild(allProductsContainer);
})();
