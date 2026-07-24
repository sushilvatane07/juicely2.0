# Juicely 🍊

Cold-pressed, real-fruit juice — reimagined as a small e-commerce storefront. Built as a static, front-end-only site: no build step, no dependencies to install, just open it in a browser.

## Live preview

Open `index.html` in any browser, or serve the folder locally:

```bash
# from inside the project folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Features

- **Four flavor cards that flip** — tap/click a product card to reveal a "Juice Facts" label (serving size, sugar content, price) styled like a real nutrition panel.
- **Wellness Packs** — two bundled combos with a discounted price and a "you save ₹X" badge.
- **Working cart** — add items, adjust quantity, see a live subtotal, and "checkout" (a demo flow — no real payment is taken, no backend involved).
- **Animated stat counters** that count up when scrolled into view.
- **Dedicated subpages** for About, FAQ, Privacy Policy, and Terms & Conditions — real pages you navigate to, not modals or popups.
- **Fully responsive** — mobile nav, single-column product grid on small screens, `prefers-reduced-motion` support.
- Custom flat SVG fruit icons (orange, watermelon, strawberry, pineapple) — no external image assets required.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript. No frameworks, no npm install, no build tools.

- **Fonts:** [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) (headings), [Inter](https://fonts.google.com/specimen/Inter) (body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (prices & facts) — loaded via Google Fonts.

## File structure

```
juicely/
├── pages ├── about.html       # Full About page
          ├── faq.html         # FAQ page
          ├── privacy.html      # Privacy policy page
          └── terms.html        # Terms & conditions page
├── index.html      # Home page — hero, products, packs, stats, about teaser
├── style.css         # All shared styling (design tokens live in :root)
├── script.js         # Nav, cart logic, product flip, stat counters, toasts
└── README.md
```

All pages share the same nav, cart drawer, and footer, so the cart works the same way no matter which page you're on.

## Customizing

**Prices & products** — edit the `PRODUCTS` object at the top of `script.js`:

```js
const PRODUCTS = {
  orange: { name: 'Orange — Sunrise Squeeze', price: 120 },
  // ...
};
```

Make sure any change here also matches the price shown on that product's card in `index.html`.

**Colors & fonts** — all design tokens (`--cream`, `--hero-blue`, `--pink`, `--gold`, fonts, etc.) are defined once at the top of `style.css` under `:root`.

**Cart persistence** — the cart currently lives in memory only (`let cart = {}` in `script.js`) and resets on page reload. There's no backend, so nothing is actually charged or stored.

## Known limitations (it's a demo)

- No real payment processing — "Checkout" just shows a confirmation toast.
- Cart state isn't saved between page loads or across pages.
- Content on About/FAQ/Privacy/Terms is placeholder text — swap in real policies before taking real orders.

## Author

Sushil Vatane
