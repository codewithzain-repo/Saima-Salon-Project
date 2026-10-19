document.addEventListener('DOMContentLoaded', () => {
    const c = window.SALON_CONFIG || {};
    document.querySelectorAll('[data-name]').forEach(e => e.textContent = c.name || 'Saima’s Salon'); document.querySelectorAll('[data-tagline]').forEach(e => e.textContent = c.tagline || ''); document.querySelectorAll('[data-address]').forEach(e => e.textContent = c.address || ''); document.querySelectorAll('[data-phone]').forEach(e => { e.textContent = c.phoneDisplay || ''; if (e.tagName === 'A') e.href = 'tel:' + (c.phoneLink || '') }); document.querySelectorAll('[data-phone-link]').forEach(e => e.href = 'tel:' + (c.phoneLink || '')); document.querySelectorAll('[data-wa]').forEach(e => e.href = 'https://wa.me/' + (c.whatsapp || '923001555831')); document.querySelectorAll('[data-maps]').forEach(e => e.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(c.address || '')); document.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
    const toggle = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
    // Mark the current page in the shared navigation.
    if (nav) {
        const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
        const navPage = currentPage === 'service-detail.html' ? 'services.html' : currentPage;
        nav.querySelectorAll('a[href]').forEach(a => {
            const targetPage = (a.getAttribute('href').split('/').pop() || 'index.html').toLowerCase();
            if (targetPage === navPage) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }
        });
    }
    if (toggle && nav) {
        toggle.addEventListener('click', () => { const opened = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(opened)); toggle.textContent = opened ? '×' : '☰'; });
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.textContent = '☰'; }));
    }

    // Reveal content gently as it enters the viewport (with reduced-motion support in CSS).
    const revealTargets = document.querySelectorAll('.hero-grid > *, .page-hero .container > *, .section-heading, .service-card, .feature, .gallery-item, .faq-item, .contact-item, .form-card, .panel, .policy > *');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        revealTargets.forEach((el, index) => { el.classList.add('scroll-reveal'); el.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`); revealObserver.observe(el); });
    }

    // Gallery category filters and image lightbox.
    const galleryFilters = document.querySelector('[data-gallery-filters]');
    const galleryItems = [...document.querySelectorAll('[data-gallery-item]')];
    if (galleryFilters && galleryItems.length) {
        galleryFilters.addEventListener('click', event => {
            const button = event.target.closest('button[data-filter]');
            if (!button || !galleryFilters.contains(button)) return;
            const category = button.dataset.filter;
            galleryFilters.querySelectorAll('[data-filter]').forEach(filterButton => {
                const active = filterButton === button;
                filterButton.classList.toggle('active', active);
                filterButton.setAttribute('aria-pressed', String(active));
            });
            galleryItems.forEach(item => {
                const show = category === 'all' || item.dataset.category === category;
                item.hidden = !show;
            });
        });
        galleryFilters.querySelectorAll('button[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    }
    const lightbox = document.querySelector('.lightbox');
    if (lightbox && galleryItems.length) {
        const lightboxImage = lightbox.querySelector('img');
        const caption = lightbox.querySelector('.lightbox-caption');
        let lightboxItems = [], lightboxIndex = 0, previousFocus = null;
        const showLightboxImage = index => {
            if (!lightboxItems.length) return;
            lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
            const item = lightboxItems[lightboxIndex];
            const image = item.querySelector('img');
            lightboxImage.src = image.currentSrc || image.src;
            lightboxImage.alt = image.alt;
            caption.textContent = item.dataset.caption || item.querySelector('span')?.textContent || image.alt;
        };
        const openLightbox = item => {
            lightboxItems = galleryItems.filter(g => !g.hidden);
            lightboxIndex = lightboxItems.indexOf(item);
            previousFocus = document.activeElement;
            showLightboxImage(lightboxIndex);
            lightbox.hidden = false;
            document.body.style.overflow = 'hidden';
            lightbox.querySelector('.close')?.focus();
        };
        const closeLightbox = () => {
            lightbox.hidden = true;
            document.body.style.overflow = '';
            if (previousFocus && previousFocus.focus) previousFocus.focus();
        };
        galleryItems.forEach(item => item.addEventListener('click', () => openLightbox(item)));
        lightbox.querySelector('.close')?.addEventListener('click', closeLightbox);
        lightbox.querySelector('.prev')?.addEventListener('click', () => showLightboxImage(lightboxIndex - 1));
        lightbox.querySelector('.next')?.addEventListener('click', () => showLightboxImage(lightboxIndex + 1));
        lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
        document.addEventListener('keydown', event => {
            if (lightbox.hidden) return;
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') showLightboxImage(lightboxIndex - 1);
            if (event.key === 'ArrowRight') showLightboxImage(lightboxIndex + 1);
        });
    }
    const catalog = [
        { id: 'hydra', name: 'Hydra Facial with 3D Light Treatment', category: 'Skin & Facial', price: 8000, duration: '1 hr', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', tagline: 'A refreshing, hydration-focused facial experience.', included: ['Skin consultation', 'Deep cleansing', 'Hydration-focused treatment', 'Finishing skincare'] },
        { id: 'herbal', name: 'Herbal Glowing Facial', category: 'Skin & Facial', price: 2000, duration: '1 hr', image: 'https://plus.unsplash.com/premium_photo-1663011276992-6e52adb20dd3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D', tagline: 'A gentle facial experience for refreshed-looking skin.', included: ['Skin consultation', 'Cleansing', 'Facial treatment', 'Finishing care'] },
        { id: 'diamond', name: 'Diamond Facial', category: 'Skin & Facial', price: 5000, duration: '50 min', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80', tagline: 'A polished facial experience focused on a radiant look.', included: ['Skin consultation', 'Cleansing', 'Facial treatment', 'Moisturising finish'] },
        { id: 'blowdry', name: 'Blow Dry Hair Setting', category: 'Hair', price: 1500, duration: '1 hr', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80', tagline: 'Smooth, styled hair for everyday wear or a special occasion.', included: ['Hair preparation', 'Blow-dry styling', 'Finishing touches'] },
        { id: 'acrylic', name: 'Acrylic Nail Extensions', category: 'Nails', price: 7000, duration: '1 hr 15 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80', tagline: 'Sculpted nail extensions with a neat finish.', included: ['Nail consultation', 'Preparation and shaping', 'Extension application', 'Finishing detail'] },
        { id: 'bridal', name: 'Bridal Makeup Consultation', category: 'Bridal', price: 1500, duration: '30 min', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', tagline: 'Discuss your event, preferred look, and makeup package options.', included: ['Look discussion', 'Event and timing review', 'Package and availability discussion'] },
        { id: 'sombre-long', name: 'Sombre Hair Colour — Long Hair', category: 'Hair Colour', price: 11000, duration: '3 hrs', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80', tagline: 'Sun-kissed dimension, hand-painted for depth.', included: ['Colour consultation', 'Sectioning and foils/painting', 'Development and wash', 'Blow-dry finish'] },
        { id: 'haircut', name: 'Haircut & Styling', category: 'Hair', price: 2500, duration: '45 min', image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=80', tagline: 'A cut and finish planned around your preferred style.', included: ['Style consultation', 'Haircut', 'Styling finish'] },
        { id: 'hair-treatment', name: 'Hair Nourishment Treatment', category: 'Hair', price: 3500, duration: '1 hr', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80', tagline: 'A care-focused treatment for softer-feeling hair.', included: ['Hair assessment', 'Treatment application', 'Rinse and finishing care'] },
        { id: 'party-makeup', name: 'Party Makeup', category: 'Makeup', price: 7000, duration: '1 hr 30 min', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80', tagline: 'An occasion-ready makeup look tailored to your preference.', included: ['Look consultation', 'Base preparation', 'Makeup application', 'Finishing touches'] },
        { id: 'engagement-makeup', name: 'Engagement Makeup', category: 'Makeup', price: 15000, duration: '2 hrs', image: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=900&q=80', tagline: 'A polished look for your special celebration.', included: ['Look consultation', 'Skin preparation', 'Makeup application', 'Finishing touches'] },
        { id: 'bridal-makeup', name: 'Bridal Makeup', category: 'Bridal', price: 35000, duration: '3 hrs', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80', tagline: 'Plan your bridal look and discuss available packages.', included: ['Bridal look consultation', 'Event details discussion', 'Package and timing discussion'] },
        { id: 'manicure', name: 'Manicure', category: 'Nails', price: 1800, duration: '45 min', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80', tagline: 'A tidy, care-focused treatment for hands and nails.', included: ['Nail shaping', 'Cuticle care', 'Hand care', 'Finishing'] },
        { id: 'pedicure', name: 'Pedicure', category: 'Nails', price: 2500, duration: '1 hr', image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80', tagline: 'A relaxing foot and nail care session.', included: ['Foot soak', 'Nail shaping', 'Foot care', 'Finishing'] },
        { id: 'waxing', name: 'Waxing Services', category: 'Personal Care', price: 1500, duration: 'Varies', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=900&q=80', tagline: 'Ask the salon about available areas and current pricing.', included: ['Service and skin suitability discussion', 'Preparation', 'Waxing service', 'Aftercare guidance'] },
        { id: 'eyebrow', name: 'Eyebrow Shaping', category: 'Personal Care', price: 500, duration: '15 min', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80', tagline: 'Shape and tidy brows according to your preference.', included: ['Shape discussion', 'Brow shaping', 'Finishing check'] },
        { id: 'skin-cleanup', name: 'Skin Cleanup', category: 'Skin & Facial', price: 1500, duration: '30 min', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', tagline: 'A basic skin-cleaning session; ask about suitability for your skin.', included: ['Skin consultation', 'Cleansing', 'Cleanup treatment', 'Moisturising finish'] }
    ];
    const money = n => `Rs. ${Number(n || 0).toLocaleString('en-PK')}`; let selected = []; try { selected = JSON.parse(localStorage.getItem('saimaBooking') || '[]').filter(id => catalog.some(x => x.id === id)) } catch (e) { selected = [] }
    const save = () => { try { localStorage.setItem('saimaBooking', JSON.stringify(selected)) } catch (e) { } }; const total = () => selected.reduce((sum, id) => sum + (catalog.find(x => x.id === id)?.price || 0), 0); const itemMarkup = (s, drawer = false) => `<div class="${drawer ? 'drawer-item' : 'checkout-item'}"><img src="${s.image}" alt=""><div><h3>${s.name}</h3><p>${s.duration}${drawer ? ' · ' : ' · '}${money(s.price)}</p>${drawer ? '' : `<button class="remove-service" type="button" data-remove="${s.id}">Remove</button>`}</div>${drawer ? '' : `<strong>${money(s.price)}</strong>`}</div>`;
    const backdrop = document.createElement('div'); backdrop.className = 'booking-drawer-backdrop hidden'; backdrop.dataset.drawerBackdrop = ''; document.body.append(backdrop); const drawer = document.createElement('aside'); drawer.className = 'booking-drawer'; drawer.setAttribute('aria-label', 'Your booking'); drawer.innerHTML = `<div class="drawer-head"><h2>Your Booking <span data-drawer-count>0</span></h2><button class="drawer-close" type="button" aria-label="Close booking">×</button></div><div class="drawer-items" data-drawer-items></div><div class="drawer-footer"><div class="checkout-total"><span>Estimated total</span><strong data-drawer-total>Rs. 0</strong></div><a class="button" href="book-appointment.html" data-continue-booking>Continue to Booking →</a><p class="note">No online payment. The salon will confirm availability.</p></div>`; document.body.append(drawer);
    const openDrawer = () => { drawer.classList.add('open'); backdrop.classList.remove('hidden'); document.body.style.overflow = 'hidden'; drawer.querySelector('.drawer-close').focus() }; const closeDrawer = () => { drawer.classList.remove('open'); backdrop.classList.add('hidden'); document.body.style.overflow = '' };
    const render = () => {
        document.querySelectorAll('[data-booking-count]').forEach(e => e.textContent = selected.length); drawer.querySelector('[data-drawer-count]').textContent = selected.length; drawer.querySelector('[data-drawer-total]').textContent = money(total()); drawer.querySelector('[data-drawer-items]').innerHTML = selected.length ? selected.map(id => { let s = catalog.find(x => x.id === id); return `<div class="drawer-item"><img src="${s.image}" alt=""><div><h3>${s.name}</h3><p>${money(s.price)}</p><button class="remove-service" data-remove="${s.id}" type="button">Remove</button></div></div>` }).join('') : `<div class="drawer-empty"><strong>Your booking is empty.</strong><p>Browse services and tap Add to Booking to begin.</p><a href="services.html" class="text-link">Browse services →</a></div>`;
        const checkout = document.querySelector('[data-checkout-items]'); if (checkout) { checkout.innerHTML = selected.length ? selected.map(id => itemMarkup(catalog.find(x => x.id === id))).join('') : `<p class="muted">No services selected yet. <a href="services.html">Browse services</a> and add your favourites.</p>`; document.querySelectorAll('[data-checkout-total]').forEach(e => e.textContent = money(total())); document.querySelectorAll('[data-checkout-total-side]').forEach(e => e.textContent = money(total())); const count = document.querySelector('[data-checkout-count]'); if (count) count.textContent = selected.length; }
        document.querySelectorAll('[data-add-service]').forEach(b => { const on = selected.includes(b.dataset.addService); b.classList.toggle('added', on); b.textContent = on ? 'Added ✓' : 'Add to Booking +' }); save();
    };
    const add = id => { if (!selected.includes(id)) selected.push(id); render() }; document.addEventListener('click', e => { const addBtn = e.target.closest('[data-add-service]'); if (addBtn) { add(addBtn.dataset.addService); if (!addBtn.closest('.search-panel')) openDrawer(); else drawSearch(); return } const remove = e.target.closest('[data-remove]'); if (remove) { selected = selected.filter(id => id !== remove.dataset.remove); render(); if (remove.closest('.search-panel')) drawSearch(); return } if (e.target.closest('[data-booking-open]')) { openDrawer(); return } if (e.target.closest('[data-search-open]')) { openSearch(); return } });
    drawer.querySelector('.drawer-close').addEventListener('click', closeDrawer); backdrop.addEventListener('click', closeDrawer); document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); closeSearch() } }); drawer.querySelector('[data-continue-booking]').addEventListener('click', () => { try { sessionStorage.setItem('saimaCheckoutStarted', '1') } catch (e) { } });
    // Search modal with related and recommended services
    const searchBg = document.createElement('div'); searchBg.className = 'search-backdrop hidden'; searchBg.dataset.searchBackdrop = ''; document.body.append(searchBg); const search = document.createElement('section'); search.className = 'search-panel hidden'; search.setAttribute('role', 'dialog'); search.setAttribute('aria-label', 'Search salon services'); search.innerHTML = `<div class="search-top"><input type="search" placeholder="Search services, e.g. facial, hair, nails…" aria-label="Search services" data-search-input><button class="drawer-close" type="button" data-search-close aria-label="Close search">×</button></div><div data-search-output></div>`; document.body.append(search); const output = search.querySelector('[data-search-output]'), searchInput = search.querySelector('[data-search-input]');
    const searchCard = s => `<div class="search-result search-result-clickable" data-search-service-id="${s.id}"><a class="search-result-image-link" href="service-detail.html?id=${s.id}" aria-label="View ${s.name} details"><img src="${s.image}" alt="${s.name}"></a><div><h3><a class="search-result-title-link" href="service-detail.html?id=${s.id}">${s.name}</a></h3><p>${s.category} · ${s.duration}</p><strong>${money(s.price)}</strong></div><div class="search-result-actions"><a class="search-detail-link" href="service-detail.html?id=${s.id}">Details</a>${selected.includes(s.id) ? `<button type="button" class="search-add remove-search" data-remove="${s.id}">Remove</button>` : `<button type="button" class="search-add" data-add-service="${s.id}">Add +</button>`}</div></div>`;
    const drawSearch = () => { const q = searchInput.value.trim().toLowerCase(); const matches = catalog.filter(s => (s.name + ' ' + s.category + ' ' + s.duration).toLowerCase().includes(q)); let pool = catalog.filter(s => !matches.some(m => m.id === s.id)); if (pool.length < 3) pool = [...catalog]; const recommendations = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(3, pool.length)); output.innerHTML = `<div class="search-section-title">${q ? 'Search results' : 'Popular services'}</div>${matches.length ? matches.map(searchCard).join('') : '<p class="search-empty">No exact matches. Try “facial”, “hair”, “nails” or “bridal”.</p>'}<div class="search-recommendations"><div class="search-section-title">You may also like</div>${recommendations.length ? recommendations.map(searchCard).join('') : '<p class="search-empty">Browse all services to discover more.</p>'}</div>` }; const openSearch = () => { search.classList.remove('hidden'); searchBg.classList.remove('hidden'); searchInput.value = ''; drawSearch(); document.body.style.overflow = 'hidden'; searchInput.focus() }; const closeSearch = () => { search.classList.add('hidden'); searchBg.classList.add('hidden'); if (!drawer.classList.contains('open')) document.body.style.overflow = '' }; search.addEventListener('click', e => { const result = e.target.closest('[data-search-service-id]'); if (!result || e.target.closest('a, button, input')) return; window.location.href = `service-detail.html?id=${result.dataset.searchServiceId}`; }); searchInput.addEventListener('input', drawSearch); search.querySelector('[data-search-close]').addEventListener('click', closeSearch); searchBg.addEventListener('click', closeSearch);
    const sf = document.querySelector('[data-service-filters]'); if (sf) sf.addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b) return; sf.querySelectorAll('.filter-btn').forEach(x => x.classList.toggle('active', x === b)); document.querySelectorAll('[data-service-card]').forEach(x => x.hidden = !(b.dataset.filter === 'all' || x.dataset.category === b.dataset.filter)) });
    // Add service detail links and render the complete catalogue on the services page.
    const serviceGrid = document.querySelector('.booking-service-grid');
    if (serviceGrid) {
        const existingIds = new Set([...serviceGrid.querySelectorAll('[data-service-id]')].map(el => el.dataset.serviceId));
        catalog.filter(service => !existingIds.has(service.id)).forEach(service => {
            const card = document.createElement('article'); card.className = 'service-card'; card.dataset.serviceCard = ''; card.dataset.serviceId = service.id; card.dataset.category = service.category.toLowerCase().includes('skin') ? 'skin' : service.category.toLowerCase().includes('hair') ? 'hair' : service.category.toLowerCase().includes('nail') ? 'nails' : service.category.toLowerCase().includes('bridal') ? 'bridal' : service.category.toLowerCase().includes('makeup') ? 'makeup' : 'personal';
            card.innerHTML = `<a class="service-image-link" href="service-detail.html?id=${service.id}"><img src="${service.image}" alt="${service.name}" loading="lazy"></a><div class="service-content"><span class="eyebrow">${service.category.toUpperCase()}</span><h3><a class="service-title-link" href="service-detail.html?id=${service.id}">${service.name}</a></h3><p>${service.tagline || 'Contact the salon for details.'}</p><div class="service-meta"><span>◷ ${service.duration}</span><strong>${money(service.price)}</strong></div><div class="service-card-actions"><a class="text-link" href="service-detail.html?id=${service.id}">View details ↗</a><button class="button add-booking" data-add-service="${service.id}" type="button">${selected.includes(service.id) ? 'Added ✓' : 'Add to Booking +'}</button></div></div>`;
            serviceGrid.append(card);
        });
        serviceGrid.querySelectorAll('[data-service-id]').forEach(card => {
            const service = catalog.find(item => item.id === card.dataset.serviceId); if (!service) return;
            const heading = card.querySelector('h3'); if (heading && !heading.querySelector('a')) heading.innerHTML = `<a class="service-title-link" href="service-detail.html?id=${service.id}">${service.name}</a>`;
            if (!card.querySelector('.service-detail-link')) { const content = card.querySelector('.service-content'); if (content) { const link = document.createElement('a'); link.className = 'text-link service-detail-link'; link.href = `service-detail.html?id=${service.id}`; link.textContent = 'View details ↗'; content.insertBefore(link, content.querySelector('[data-add-service]')); } }
        });
    }
    // Homepage Explore our services category cards open a representative service detail page.
    if ((location.pathname.split('/').pop() || 'index.html').toLowerCase() === 'index.html') {
        const categoryServices = { hair: 'blowdry', skin: 'hydra', makeup: 'party-makeup' };
        document.querySelectorAll('main .section .service-grid > .service-card[data-category]').forEach(card => {
            const id = categoryServices[card.dataset.category];
            if (!id) return;
            card.dataset.homeServiceId = id;
            card.classList.add('service-card-clickable');
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'link');
            card.setAttribute('aria-label', `Explore ${catalog.find(item => item.id === id).name}`);
            const url = `service-detail.html?id=${id}`;
            const img = card.querySelector(':scope > img');
            if (img && !img.closest('a')) { const a = document.createElement('a'); a.className = 'service-image-link'; a.href = url; img.parentNode.insertBefore(a, img); a.appendChild(img); }
            const h = card.querySelector('h3');
            if (h && !h.querySelector('a')) h.innerHTML = `<a class="service-title-link" href="${url}">${h.textContent}</a>`;
            const oldLink = card.querySelector('a.text-link');
            if (oldLink) { oldLink.href = url; oldLink.textContent = 'Explore service ↗'; }
            card.addEventListener('click', event => { if (event.target.closest('a, button')) return; window.location.href = url; });
            card.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target === card) { event.preventDefault(); window.location.href = url; } });
        });
    }

    // Make every catalogue service card clickable, including its image and whitespace, while preserving buttons and links.
    document.querySelectorAll('.booking-service-grid [data-service-id]').forEach(card => {
        const id = card.dataset.serviceId;
        if (!catalog.some(item => item.id === id)) return;
        const image = card.querySelector(':scope > img');
        if (image && !image.closest('a')) {
            const link = document.createElement('a'); link.className = 'service-image-link'; link.href = `service-detail.html?id=${id}`;
            image.parentNode.insertBefore(link, image); link.appendChild(image);
        }
        card.classList.add('service-card-clickable');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'link');
        card.setAttribute('aria-label', `View ${catalog.find(item => item.id === id).name} details`);
        const goToDetail = () => { window.location.href = `service-detail.html?id=${id}`; };
        card.addEventListener('click', event => { if (event.target.closest('a, button, input, select, textarea, [data-add-service], [data-remove]')) return; goToDetail(); });
        card.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target === card) { event.preventDefault(); goToDetail(); } });
    });

    // Individual product-style service details and randomized related suggestions.
    const detailRoot = document.querySelector('[data-service-detail]');
    if (detailRoot) {
        const id = new URLSearchParams(location.search).get('id'); const service = catalog.find(item => item.id === id);
        if (!service) { detailRoot.innerHTML = `<div class="container"><h1>Service not found</h1><p>Please browse the full services menu.</p><a class="button" href="services.html">← All services</a></div>`; }
        else {
            document.title = `${service.name} | Saima’s Salon`;
            const whatsAppText = `Hi Saima’s Salon, I would like to enquire about: ${service.name}. Please confirm current availability and price.`;
            detailRoot.innerHTML = `<div class="container"><div class="breadcrumb"><a href="index.html">Home</a> / <a href="services.html">Services</a> / ${service.name}</div><div class="detail-layout"><div class="detail-image"><img src="${service.image}" alt="${service.name}"></div><div class="detail-copy"><span class="eyebrow">${service.category}</span><h1>${service.name}</h1><p class="detail-tagline">${service.tagline || 'A salon service tailored to your preferences.'}</p><div class="detail-price">${money(service.price)}</div><p class="detail-duration">◷ ${service.duration}</p><h2>What’s included</h2><ul class="included-list">${(service.included || ['Consultation', 'Service preparation', 'Finishing touches']).map(item => `<li>${item}</li>`).join('')}</ul><div class="detail-actions"><button class="button" data-add-service="${service.id}" type="button">${selected.includes(service.id) ? 'Added ✓' : 'Add to Booking +'}</button><a class="button outline" href="https://wa.me/${c.whatsapp || '923001555831'}?text=${encodeURIComponent(whatsAppText)}" target="_blank" rel="noopener">☎ Book on WhatsApp</a></div><p class="note">No online payment. Add this service to your booking and pick a preferred time, or message the salon on WhatsApp. Prices and service availability should be confirmed with the salon.</p><a class="text-link" href="services.html">← All services</a></div></div><section class="related-services"><div class="section-heading"><span class="eyebrow">You may also like</span><h2>Explore something else.</h2></div><div class="service-grid" data-related-services></div></section></div>`;
            const related = catalog.filter(item => item.id !== service.id).sort(() => Math.random() - 0.5).slice(0, 4);
            detailRoot.querySelector('[data-related-services]').innerHTML = related.map(item => `<article class="service-card"><a class="service-image-link" href="service-detail.html?id=${item.id}"><img src="${item.image}" alt="${item.name}" loading="lazy"></a><div class="service-content"><span class="eyebrow">${item.category}</span><h3><a class="service-title-link" href="service-detail.html?id=${item.id}">${item.name}</a></h3><p>${item.tagline || 'Ask us for more details.'}</p><div class="service-meta"><span>◷ ${item.duration}</span><strong>${money(item.price)}</strong></div><div class="service-card-actions"><a class="text-link" href="service-detail.html?id=${item.id}">View details ↗</a><button class="button add-booking" type="button" data-add-service="${item.id}">${selected.includes(item.id) ? 'Added ✓' : 'Add to Booking +'}</button></div></div></article>`).join('');
        }
    }
    // Before/after image comparison slider (drag or use keyboard).
    document.querySelectorAll('[data-before-after]').forEach(slider => { const range = slider.querySelector('input[type="range"]'); const update = () => slider.style.setProperty('--compare', `${range.value}%`); range?.addEventListener('input', update); update(); });
    // Favourite services persist in this browser only.
    document.querySelectorAll('[data-favourite-service]').forEach(button => { const key = 'saimaFavourites'; let favs = []; try { favs = JSON.parse(localStorage.getItem(key) || '[]') } catch (e) { }; const id = button.dataset.favouriteService; const set = () => { const active = favs.includes(id); button.classList.toggle('is-favourite', active); button.setAttribute('aria-pressed', String(active)); button.textContent = active ? '♥ Saved' : '♡ Save' }; set(); button.addEventListener('click', () => { favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id]; try { localStorage.setItem(key, JSON.stringify(favs)) } catch (e) { } set() }) });
    // Social links use sample platform URLs until the salon's own profile URLs are added to config.js.
    document.querySelectorAll('[data-social]').forEach(link => { const url = c.socials && c.socials[link.dataset.social]; if (url && /^https:\/\//i.test(url)) { link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.removeAttribute('aria-disabled'); link.removeAttribute('title'); } else { link.href = '#'; link.removeAttribute('title'); } });
    // Back-to-top and scroll progress.
    const progress = document.querySelector('[data-scroll-progress]'); const topButton = document.querySelector('[data-back-to-top]'); const updateScrollUI = () => { const max = document.documentElement.scrollHeight - window.innerHeight; if (progress) progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`; if (topButton) topButton.classList.toggle('visible', window.scrollY > 500); }; window.addEventListener('scroll', updateScrollUI, { passive: true }); updateScrollUI(); topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.querySelectorAll('[data-faq-question]').forEach(b => b.addEventListener('click', () => { const a = document.getElementById(b.getAttribute('aria-controls')), open = b.getAttribute('aria-expanded') === 'true'; b.setAttribute('aria-expanded', String(!open)); b.querySelector('[data-icon]').textContent = open ? '+' : '−'; if (a) a.hidden = open }));
    const checkoutForm = document.querySelector('[data-checkout-form]'); if (checkoutForm) { const date = checkoutForm.elements.date, now = new Date(); date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`; render(); checkoutForm.addEventListener('submit', async e => { e.preventDefault(); checkoutForm.querySelectorAll('[data-error-for]').forEach(x => x.textContent = ''); let data = new FormData(checkoutForm), valid = true;['name', 'phone', 'date', 'time'].forEach(k => { let input = checkoutForm.elements[k], v = String(data.get(k) || '').trim(), err = !v ? 'This field is required.' : ''; if (k === 'phone' && v && !/^[+]?\d[\d\s()-]{7,19}$/.test(v)) err = 'Enter a valid phone number.'; if (k === 'date' && v < date.min) err = 'Choose today or a future date.'; checkoutForm.querySelector(`[data-error-for="${k}"]`).textContent = err; if (err) valid = false }); let status = checkoutForm.querySelector('[data-form-status]'); if (!valid) { status.textContent = 'Please correct the highlighted fields.'; return } if (!selected.length) { status.textContent = 'Please add at least one service before submitting.'; return } const booking = { salon: c.name || 'Saima’s Salon', customer: { name: data.get('name'), phone: data.get('phone'), date: data.get('date'), time: data.get('time'), notes: data.get('notes') || '' }, services: selected.map(id => { let s = catalog.find(x => x.id === id); return { name: s.name, price: s.price, duration: s.duration } }), estimatedTotal: total(), currency: 'PKR', submittedAt: new Date().toISOString() }; const configuredEndpoint = (c.bookingEndpoint || '').trim(); const keyMatch = configuredEndpoint.match(/\/submit\/([^/?#]+)/i); const accessKey = (c.bookingAccessKey || (keyMatch ? keyMatch[1] : '')).trim(); const endpoint = 'https://api.web3forms.com/submit'; if (accessKey) { try { const web3Payload = { access_key: accessKey, subject: `New booking request - ${booking.salon}`, from_name: booking.salon, name: booking.customer.name, phone: booking.customer.phone, preferred_date: booking.customer.date, preferred_time: booking.customer.time, notes: booking.customer.notes || 'None', services: booking.services.map(s => `${s.name} | ${s.duration} | ${s.price ? `PKR ${Number(s.price).toLocaleString('en-PK')}` : 'Price on request'}`).join('\\n'), estimated_total: booking.estimatedTotal ? `PKR ${Number(booking.estimatedTotal).toLocaleString('en-PK')}` : 'Price on request', currency: booking.currency, submitted_at: booking.submittedAt }; const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(web3Payload) }); const result = await response.json(); if (!response.ok || result.success !== true) throw new Error(result.message || 'Submission failed'); window.location.href = c.redirectUrl || 'thank-you.html'; return; } catch (err) { console.error('Booking submission failed:', err); status.textContent = 'Could not submit right now. Please check the Web3Forms access key, form activation, and internet connection, then try again.'; status.style.color = '#a21d35' } } else { status.textContent = 'Email submission is not configured. Add the Web3Forms access key in config.js before publishing.'; status.style.color = '#a21d35'; console.log('Booking payload preview:', booking) } }) }
    // Legacy booking form remains a WhatsApp fallback on older page markup
    const oldForm = document.querySelector('[data-booking-form]'); if (oldForm) { oldForm.addEventListener('submit', e => { e.preventDefault(); const d = new FormData(oldForm), msg = `Appointment request for ${c.name || 'Saima’s Salon'}\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nService: ${d.get('service')}\nDate: ${d.get('date')}\nTime: ${d.get('time')}\nNotes: ${d.get('message') || ''}`; window.open('https://wa.me/' + (c.whatsapp || '923001555831') + '?text=' + encodeURIComponent(msg), '_blank', 'noopener,noreferrer') }) }
    render();
});