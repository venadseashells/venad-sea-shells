
const SUPABASE_URL = "https://rnszcvkikxonqxcdlysi.supabase.co";

const SUPABASE_KEY = "sb_publishable_Iw_68NJGXWDV2nNyo5ByfQ_S4IE416K";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

let authMode = "login";
const products = [
  {
    id: 1,
    name: "Edampuri Pooja Sangu",
    category: "Edampuri Pooja"
  },
  {
    id: 2,
    name: "Valampuri Pooja Sangu",
    category: "Valampuri Pooja"
  },
  {
    id: 3,
    name: "Edampuri Pooja Polished",
    category: "Edampuri Polished"
  },
  {
    id: 4,
    name: "Ganapathi Sangu",
    category: "Ganapathi"
  },
  {
    id: 5,
    name: "Panchamukhi Sangu",
    category: "Panchamukhi"
  },
  {
    id: 6,
    name: "Gowri Sangu",
    category: "Gowri"
  },
  {
    id: 7,
    name: "Aiviral Sangu",
    category: "Aiviral"
  },
  {
    id: 8,
    name: "Manja Mulli",
    category: "Manja Mulli"
  },
  {
    id: 9,
    name: "Oothura ARS",
    category: "Oothura"
  },
  {
    id: 10,
    name: "Oothura AR",
    category: "Oothura"
  },
  {
    id: 11,
    name: "Oothura 6",
    category: "Oothura"
  },
  {
    id: 12,
    name: "Oothura 5",
    category: "Oothura"
  },
  {
    id: 13,
    name: "Oothura 4",
    category: "Oothura"
  },
  {
    id: 14,
    name: "Oothura 3",
    category: "Oothura"
  },
  {
    id: 15,
    name: "Oothura 2",
    category: "Oothura"
  },
  {
    id: 16,
    name: "Oothura 1",
    category: "Oothura"
  },
  {
    id: 17,
    name: "Oothura 0",
    category: "Oothura"
  },
  {
    id: 18,
    name: "Oothura Double Zero (00)",
    category: "Oothura"
  },
  {
    id: 19,
    name: "Oothura Triple Zero (000)",
    category: "Oothura"
  }
];

let selectedCategory = "All";
let cart = [];


/* CREATE CATEGORIES */

function loadCategories() {

  const categories = [
    "All",
    ...new Set(products.map(product => product.category))
  ];

  const container =
    document.getElementById("categories");

  container.innerHTML = categories.map(category => {

    const active =
      category === "All" ? "active" : "";

    return `
      <button
        class="chip ${active}"
        onclick="selectCategory('${category}')"
      >
        ${category}
      </button>
    `;

  }).join("");
}


/* SHOW PRODUCTS */

function renderProducts() {

  const searchText =
    document
      .getElementById("search")
      .value
      .toLowerCase();

  const filteredProducts =
    products.filter(product => {

      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchMatch =
        product.name
          .toLowerCase()
          .includes(searchText);

      return categoryMatch && searchMatch;

    });


  const container =
    document.getElementById("products");


  if (filteredProducts.length === 0) {

    container.innerHTML = `
      <p>No products found.</p>
    `;

    return;
  }


  container.innerHTML =
    filteredProducts.map(product => {

      return `
        <article class="product">

          <div class="product-img">
            🐚
          </div>

          <h3>
            ${product.name}
          </h3>

          <p>
            ${product.category}
          </p>

          <div class="price">
            Price on Request
          </div>

          <button
            class="btn primary full"
            onclick="addToCart(${product.id})"
          >
            Add to Cart
          </button>

        </article>
      `;

    }).join("");
}


/* CATEGORY SELECT */

function selectCategory(category) {

  selectedCategory = category;

  document
    .querySelectorAll(".chip")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.textContent.trim() === category
      );

    });

  renderProducts();
}


/* ADD TO CART */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;

  cart.push(product);

  updateCart();

  openCart();
}


/* UPDATE CART */

function updateCart() {

  document
    .getElementById("cartCount")
    .textContent = cart.length;


  const container =
    document.getElementById("cartItems");


  if (cart.length === 0) {

    container.innerHTML =
      "<p>Your cart is empty.</p>";

    document
      .getElementById("cartTotal")
      .textContent = "₹0";

    return;
  }


  container.innerHTML =
    cart.map((product, index) => {

      return `
        <div class="cart-row">

          <span>
            ${product.name}
          </span>

          <button
            onclick="removeFromCart(${index})"
          >
            Remove
          </button>

        </div>
      `;

    }).join("");


  document
    .getElementById("cartTotal")
    .textContent =
      "Price on Request";
}


/* REMOVE CART ITEM */

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


/* OPEN CART */

function openCart() {

  document
    .getElementById("cartModal")
    .classList.remove("hidden");

  updateCart();
}


/* CLOSE CART */

function closeCart() {

  document
    .getElementById("cartModal")
    .classList.add("hidden");
}


/* WHATSAPP ORDER */

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }


  const items =
    cart
      .map(product => product.name)
      .join(", ");


  const message =
    `Hello VENAD SEA SHELLS,

I am interested in these products:

${items}

Please send me the price and availability.`;


  const whatsappURL =
    "https://wa.me/917598513851?text=" +
    encodeURIComponent(message);


  window.open(
    whatsappURL,
    "_blank"
  );
}


/* START WEBSITE */

loadCategories();

renderProducts();

updateCart();
