
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  });


  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));


  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-cart-btn')) return;
      card.classList.toggle('flipped');
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('flipped'); }
    });
  });


  const PRODUCTS = {
    orange:     {name:'Orange — Sunrise Squeeze', price:120},
    watermelon: {name:'Watermelon — Red Hydrate', price:110},
    strawberry: {name:'Strawberry — Garden Sweet', price:140},
    pineapple:  {name:'Pineapple — Tropical Snap', price:130},
    immunity:   {name:'Immunity Trio Pack', price:349},
    hydrate:    {name:'Hydrate & Reset Pack', price:329},
  };
  let cart = {};

  function addToCart(id){
    cart[id] = (cart[id] || 0) + 1;
    renderCart();
    updateCartCount();
    showToast('Added ' + PRODUCTS[id].name + ' to cart');
    const bubble = document.getElementById('cartCount');
    bubble.style.transform = 'scale(1.4)';
    setTimeout(()=> bubble.style.transform = 'scale(1)', 200);
  }
  function changeQty(id, delta){
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
    updateCartCount();
  }
  function updateCartCount(){
    const total = Object.values(cart).reduce((a,b)=>a+b,0);
    const el = document.getElementById('cartCount');
    el.textContent = total;
    el.classList.toggle('show', total > 0);
  }
  function renderCart(){
    const wrap = document.getElementById('cartItems');
    const ids = Object.keys(cart);
    if (ids.length === 0){
      wrap.innerHTML = '<div class="cart-empty">Your cart is empty.<br>Add a flavor to get started.</div>';
    } else {
      wrap.innerHTML = ids.map(id => {
        const p = PRODUCTS[id];
        const qty = cart[id];
        return `<div class="cart-item">
          <div class="cart-item-info">
            <div class="cart-item-name">${p.name}</div>
            <div class="cart-item-price">₹${p.price} each</div>
          </div>
          <div class="qty-stepper">
            <button onclick="changeQty('${id}', -1)" aria-label="Decrease">−</button>
            <span>${qty}</span>
            <button onclick="changeQty('${id}', 1)" aria-label="Increase">+</button>
          </div>
        </div>`;
      }).join('');
    }
    const subtotal = ids.reduce((sum,id)=> sum + PRODUCTS[id].price * cart[id], 0);
    document.getElementById('cartSubtotal').textContent = '₹' + subtotal;
  }

  document.querySelectorAll('.add-cart-btn, .bundle-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.id);
    });
  });

  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  function openCart(){ cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); }
  function closeCart(){ cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if (Object.keys(cart).length === 0){
      showToast('Your cart is empty');
      return;
    }
    showToast('🍊 Order poured! (demo checkout — no payment taken)');
    cart = {};
    renderCart();
    updateCartCount();
    setTimeout(closeCart, 900);
  });


  let toastTimer;
  function showToast(msg){
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
  }


  const statEls = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, {threshold:0.5});
  statEls.forEach(el => observer.observe(el));

  renderCart();
