document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const wishlist = [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const cartCountContainer = document.querySelector('.cart-count');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistCountContainer = document.querySelector('.wishlist-count');

    document.querySelectorAll('.add_to_cart a').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productElement = button.closest('.single_product');
            const productName = productElement.querySelector('.product_name a').textContent;
            const productPrice = parseFloat(productElement.querySelector('.current_price').textContent.replace('Rs. ', ''));
            const productImage = productElement.querySelector('.primary_img img').src;
            addToCart(productName, productPrice, productImage);
        });
    });

    document.querySelectorAll('.wishlist a').forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productElement = button.closest('.single_product');
            const productName = productElement.querySelector('.product_name a').textContent;
            const productPrice = parseFloat(productElement.querySelector('.current_price').textContent.replace('Rs. ', ''));
            const productImage = productElement.querySelector('.primary_img img').src;
            addToWishlist(productName, productPrice, productImage);
        });
    });

    function addToCart(name, price, image) {
        const existingProduct = cart.find(item => item.name === name);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, image, quantity: 1 });
        }
        updateCart();
    }

    function addToWishlist(name, price, image) {
        const existingProduct = wishlist.find(item => item.name === name);
        if (!existingProduct) {
            wishlist.push({ name, price, image });
        }
        updateWishlist();
    }

    function removeFromCart(name) {
        const productIndex = cart.findIndex(item => item.name === name);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }
        updateCart();
    }

    function removeFromWishlist(name) {
        const productIndex = wishlist.findIndex(item => item.name === name);
        if (productIndex !== -1) {
            wishlist.splice(productIndex, 1);
        }
        updateWishlist();
    }

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let itemCount = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="cart_item">
                    <div class="cart_img">
                        <a href="#"><img src="${item.image}" alt="${item.name}"></a>
                    </div>
                    <div class="cart_info">
                        <a href="#">${item.name}</a>
                        <p>Rs. ${item.price} x ${item.quantity} = Rs. ${itemTotal}</p>
                    </div>
                    <div class="cart_remove">
                        <a href="#" class="remove-item" data-name="${item.name}"><i class="fa fa-times"></i></a>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(listItem);
        });
        cartTotalContainer.textContent = `Rs. ${total}`;
        cartCountContainer.textContent = itemCount;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                const productName = button.getAttribute('data-name');
                removeFromCart(productName);
            });
        });
    }

    function updateWishlist() {
        wishlistItemsContainer.innerHTML = '';
        let itemCount = 0;
        wishlist.forEach(item => {
            itemCount += 1;
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="wishlist_item">
                    <div class="cart_img">
                        <a href="#"><img src="${item.image}" alt="${item.name}"></a>
                    </div>
                    <div class="cart_info">
                        <a href="#">${item.name}</a>
                        <p>Rs. ${item.price}</p>
                    </div>
                    <div class="cart_remove">
                        <a href="#" class="remove-wishlist-item" data-name="${item.name}"><i class="fa fa-times"></i></a>
                    </div>
                </div>
            `;
            wishlistItemsContainer.appendChild(listItem);
        });
        wishlistCountContainer.textContent = itemCount;

        document.querySelectorAll('.remove-wishlist-item').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                const productName = button.getAttribute('data-name');
                removeFromWishlist(productName);
            });
        });
    }
});