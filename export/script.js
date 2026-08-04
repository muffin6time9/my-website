(() => {
  const products = [
    { name: 'זר פאוניה בזריחה', blurb: 'פאוניות ורודות, רנונקולוס ונענע גינה.', price: 48, onSale: true, salePrice: 36, img: 'images/product-1.jpg', categories: ['פרחים', 'משלוחי פרחים באשדוד', 'יום אהבה'], uploaded: true },
    { name: 'תערובת פרחי בר', blurb: 'פרחי שדה חופשיים, לפי מה שפורח השבוע.', price: 38, onSale: false, img: 'images/product-2.jpg', categories: ['פרחים', 'משלוחי פרחים באשדוד', 'דילים חמים'], uploaded: true },
    { name: 'זר ורדים בגוון טרקוטה', blurb: 'ורדי גינה בגוונים חמים, עם אקליפטוס.', price: 56, onSale: true, salePrice: 45, img: 'images/product-3.jpg', categories: ['פרחים', 'משלוחי פרחים באשדוד', 'יום אהבה', 'דילים חמים'], uploaded: true },
    { name: 'זר מרווה ואקליפטוס', blurb: 'זר ירוק ושקט, מתאים לכל יום.', price: 32, onSale: false, img: 'images/product-4.jpg', categories: ['פרחים', 'משלוחי פרחים באשדוד'] },
    { name: 'צנצנת חמניות זהובות', blurb: 'חמניות, שיבולים ופרחי בר צהובים.', price: 42, onSale: false, img: 'images/product-5.jpg', categories: ['פרחים', 'לפנק ביום הולדת'] },
    { name: 'זר רנונקולוס ורוד', blurb: 'רנונקולוס, אפונת ריח וורדי ספריי.', price: 50, onSale: true, salePrice: 39, img: 'images/product-6.jpg', categories: ['פרחים', 'זרי לידה ליולדת', 'משלוחי פרחים באשדוד'] },
  ];

  const galleryImages = [
    { caption: 'מיון גבעולים בבוקר מוקדם', ratio: '4/3', img: 'images/gallery-1.jpg' },
    { caption: 'עמדת העטיפה', ratio: '3/4', img: 'images/gallery-2.jpg' },
    { caption: 'המשלוח של השבוע', ratio: '4/3', img: 'images/gallery-3.jpg' },
    { caption: 'קופסת משלוח מוכנה', ratio: '4/3', img: 'images/gallery-4.jpg' },
    { caption: 'עבודה כנה, גם עם הפסולת', ratio: '3/4', img: 'images/gallery-5.jpg' },
    { caption: 'דוכן בשוק יום ראשון', ratio: '4/3', img: 'images/gallery-6.jpg' },
  ];

  const posts = [
    { tag: 'טיפים', title: 'איך לשמור על פאוניות טריות מעבר לשבוע הראשון', excerpt: 'מים קרים, חיתוך נקי כל יומיים, ומקום מרוחק משמש ישירה — שלושת הדברים שהכי משנים.' },
    { tag: 'מדריך', title: 'מדריך למתחילים: איך מרכיבים זר פרחי בר', excerpt: 'צריך פחות גבעולים ממה שנדמה, וצנצנת לרוב עדיפה על אגרטל.' },
    { tag: 'מהחנות', title: 'למה הזרים שלנו משתנים כל שבוע', excerpt: 'הפסקנו להבטיח פרחים ספציפיים כדי שנוכל להבטיח פרחים טריים יותר. הנה איך זה נראה בפועל.' },
  ];

  const heroCategories = [
    'פרחים', 'משלוחי פרחים באשדוד', 'עציצים וסחלבים', 'זרי כלה וקישוטי אוטו',
    'יום אהבה', 'לפנק ביום הולדת', 'זרי לידה ליולדת', 'דילים חמים', 'קקטוסים סקולנטים',
    'מארזי פרחי סבון', 'מוצרים נלווים', 'אירועים', 'גלנדי וזרי אבל',
  ];
  const footerCatsA = ['דילים חמים', 'זרי כלה וקישוט אוטו', 'לפנק ביום הולדת', 'עציצים וסחלבים', 'פרחים', 'קקטוסים סקולנטים'];
  const footerCatsB = ['אירועים', 'קישוט במה', 'קישוט שולחן', 'מארזים פרחי סבון', 'מוצרים נלווים', 'אגרטלים', 'דובונים', 'מארזי שוקולד', 'יינות', 'בלונים'];

  let cartCount = 0;
  let activeCategory = null;

  const $ = (id) => document.getElementById(id);

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
  }

  function renderCategoryPills() {
    $('category-pills').innerHTML = heroCategories.map((name) =>
      `<button type="button" class="tag tag-outline${name === activeCategory ? ' active' : ''}" data-cat="${escapeHtml(name)}">${escapeHtml(name)}</button>`
    ).join('');
  }

  function renderFooterCats() {
    $('footer-cats-a').innerHTML = footerCatsA.map((name) =>
      `<button type="button" data-cat="${escapeHtml(name)}" style="background:none;border:none;padding:0;text-align:right;font-size:14px;color:var(--color-text);cursor:pointer;">${escapeHtml(name)}</button>`
    ).join('');
    $('footer-cats-b').innerHTML = footerCatsB.map((name) =>
      `<button type="button" data-cat="${escapeHtml(name)}" style="background:none;border:none;padding:0;text-align:right;font-size:14px;color:var(--color-text);cursor:pointer;">${escapeHtml(name)}</button>`
    ).join('');
  }

  function productCard(p, idx) {
    const priceHtml = p.onSale
      ? `<span style="font-size:14px;text-decoration:line-through;color:var(--color-neutral-600);">₪${p.price}</span>
         <span style="font-family:var(--font-heading);font-size:20px;color:var(--color-accent-700);">₪${p.salePrice}</span>`
      : `<span style="font-family:var(--font-heading);font-size:20px;color:var(--color-accent-700);">₪${p.price}</span>`;
    return `
      <div class="reveal in-view">
        <div class="card elev-sm hover-lift" style="padding:0;overflow:hidden;position:relative;">
          <div class="washed${p.uploaded ? ' is-uploaded' : ''}" style="border-radius:32px 32px 0 0;overflow:hidden;position:relative;aspect-ratio:4/3;">
            <img class="washed-img" src="${p.img}" alt="${escapeHtml(p.name)}">
            ${p.onSale ? `<span class="tag tag-accent" style="position:absolute;top:12px;right:12px;box-shadow:var(--shadow-sm);">מבצע</span>` : ''}
            <label class="btn btn-icon" style="position:absolute;bottom:12px;left:12px;box-shadow:var(--shadow-sm);cursor:pointer;" title="העלאת תמונה משלכם">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/></svg>
              <input type="file" accept="image/*" data-upload="${idx}" style="display:none;">
            </label>
          </div>
          <div style="padding:20px;">
            <p class="card-title" style="margin:0 0 4px;">${escapeHtml(p.name)}</p>
            <p class="card-meta" style="margin:0 0 14px;">${escapeHtml(p.blurb)}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
              <span style="display:flex;align-items:baseline;gap:8px;">${priceHtml}</span>
              <button type="button" class="btn btn-secondary" data-add="${idx}">הוספה לסל</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function renderShop() {
    const filtered = activeCategory ? products.filter((p) => p.categories.includes(activeCategory)) : products;
    const statusEl = $('shop-status');
    if (activeCategory) {
      statusEl.innerHTML = `<span class="tag tag-accent-2">${escapeHtml(activeCategory)}</span>
        <button type="button" id="clear-category-inline" style="background:none;border:none;padding:0;font-size:14px;font-weight:600;color:var(--color-accent-700);cursor:pointer;text-decoration:underline;">נקה סינון · כל הזרים</button>`;
    } else {
      const saleCount = products.filter((p) => p.onSale).length;
      statusEl.innerHTML = `<span class="tag tag-accent">טרי השבוע</span>${saleCount ? `<span class="tag tag-accent-2">${saleCount} במבצע עכשיו</span>` : ''}`;
    }
    $('shop-heading').textContent = activeCategory ? `זרים בקטגוריית ${activeCategory}` : 'זרים שנקטפו הבוקר';
    $('shop-sub').textContent = activeCategory ? 'המבחר הזה מתעדכן לפי המלאי היומי.' : 'שישה עיצובים, מתחדשים כל יום. הזמינות משתנה לפי העונה, כך שהמבחר של היום לא בהכרח יהיה זהה למחר.';

    const emptyBox = $('shop-empty');
    if (activeCategory && filtered.length === 0) {
      emptyBox.style.display = 'block';
      $('shop-empty-text').textContent = `עוד לא העלינו זרים תחת "${activeCategory}" — בינתיים אפשר לצפות במבחר המלא.`;
    } else {
      emptyBox.style.display = 'none';
    }

    $('product-grid').innerHTML = filtered.map((p) => productCard(p, products.indexOf(p))).join('');
    bindAddToCartButtons();
    bindUploadInputs();
    renderCategoryPills();
  }

  function bindUploadInputs() {
    document.querySelectorAll('[data-upload]').forEach((input) => {
      input.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const idx = Number(input.getAttribute('data-upload'));
        const reader = new FileReader();
        reader.onload = () => {
          products[idx].img = reader.result;
          products[idx].uploaded = true;
          renderShop();
        };
        reader.readAsDataURL(file);
      });
    });
  }

  function bindAddToCartButtons() {
    document.querySelectorAll('[data-add]').forEach((btn) => {
      btn.addEventListener('click', () => {
        cartCount++;
        updateCartBadge();
        const original = btn.textContent;
        btn.textContent = 'נוסף ✓';
        setTimeout(() => { btn.textContent = original; }, 1300);
      });
    });
  }

  function updateCartBadge() {
    const badge = $('cart-badge');
    if (cartCount > 0) {
      badge.style.display = 'inline-flex';
      badge.textContent = cartCount;
      badge.classList.remove('cart-badge');
      void badge.offsetWidth;
      badge.classList.add('cart-badge');
    } else {
      badge.style.display = 'none';
    }
  }

  function selectCategory(name) {
    activeCategory = name;
    renderShop();
    document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
  }

  function renderGallery() {
    $('gallery-grid').innerHTML = galleryImages.map((g) => `
      <figure class="washed gallery-fig reveal in-view" style="margin:0;border-radius:28px;overflow:hidden;aspect-ratio:${g.ratio};">
        <img class="washed-img gallery-img" src="${g.img}" alt="${escapeHtml(g.caption)}">
      </figure>`).join('');
  }

  function renderBlog() {
    $('blog-grid').innerHTML = posts.map((post) => `
      <div class="card elev-sm blog-card reveal in-view" style="padding:13.2px;">
        <span class="tag tag-accent-2">${escapeHtml(post.tag)}</span>
        <p class="card-title" style="margin:14px 0 8px;">${escapeHtml(post.title)}</p>
        <p class="card-body" style="margin:0 0 16px;">${escapeHtml(post.excerpt)}</p>
        <a href="#blog" style="font-weight:600;">להמשך קריאה ←</a>
      </div>`).join('');
  }

  function initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('in-view', entry.isIntersecting);
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -320px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  function initContactForm() {
    $('contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = $('submit-btn');
      btn.textContent = 'נשלח — תודה!';
      setTimeout(() => { btn.textContent = 'שליחת הודעה'; }, 2200);
    });
  }

  function initClicks() {
    document.body.addEventListener('click', (e) => {
      const catBtn = e.target.closest('[data-cat]');
      if (catBtn) { selectCategory(catBtn.getAttribute('data-cat')); return; }
      if (e.target.id === 'clear-category-btn' || e.target.id === 'clear-category-inline') {
        activeCategory = null;
        renderShop();
        return;
      }
      if (e.target.closest('#cart-btn')) {
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCategoryPills();
    renderFooterCats();
    renderShop();
    renderGallery();
    renderBlog();
    initClicks();
    initContactForm();
    initReveal();
  });
})();
