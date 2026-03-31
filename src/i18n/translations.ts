export type SupportedLanguage = 'en' | 'de' | 'fr';

type TranslationLeaf = string;
type TranslationTree = { [key: string]: TranslationLeaf | TranslationTree };

export const translations: Record<SupportedLanguage, TranslationTree> = {
  en: {
    nav: { products: 'Products', newArrivals: 'New Arrivals', qualityGuide: 'Quality Guide', myProfile: 'My Profile', logout: 'Logout', login: 'Login', cart: 'Cart' },
    footer: {
      description: 'The future of wholesale electronics. Premium parts, verified quality, and seamless logistics for modern repair businesses.',
      explore: 'Explore', allProducts: 'All Products', support: 'Support', myAccount: 'My Account', shippingPolicy: 'Shipping Policy', contactUs: 'Contact Us',
      rights: '© 2026 StoreFront Wholesale. All rights reserved.', privacy: 'Privacy', terms: 'Terms',
    },
    home: {
      badge: 'B2B Wholesale Marketplace', titlePrefix: 'Premium Parts for', titleAccent: 'Modern', titleSuffix: 'Devices.',
      subtitle: "Access the world's largest catalog of verified mobile spare parts. Locked wholesale pricing for registered businesses.",
      browseCatalog: 'Browse Catalog', partnerLogin: 'Partner Login', sectionTitle: 'New Arrivals', sectionSubtitle: 'The latest components for the newest devices.',
      viewAll: 'View All', noArrivals: 'No new arrivals available right now.', trustTitle: 'Trusted by 5,000+ Repair Centers',
      trustQuote: '"MobileParts has transformed our supply chain. The quality consistency is unmatched in the industry, and their support team is always there when we need them."',
      trustAuthor: 'David Chen', trustRole: 'CEO, TechFix Solutions',
      featuredSection: { title: 'Featured Products', subtitle: 'Hand-picked products with top demand and performance.', empty: 'No featured products available right now.' },
      features: {
        qualityTitle: 'Verified Quality', qualityDesc: 'Every part undergoes a 20-point inspection process before shipping.',
        shippingTitle: 'Global Shipping', shippingDesc: 'Express delivery to over 150 countries with real-time tracking.',
        quotesTitle: 'Instant Quotes', quotesDesc: 'Dynamic wholesale pricing based on your order volume and loyalty.',
      },
    },

    cart: {
      title: 'Shopping Cart', subtitle: 'Review items and continue to checkout.',
      empty: { title: 'Your cart is empty', description: 'Add products from the catalog to place your order.', browseProducts: 'Browse Products' },
      actions: { clearCart: 'Clear cart', continueShopping: 'Continue shopping', proceedToCheckout: 'Proceed to checkout' },
      item: { noSku: 'No SKU', inStock: 'In stock', outOfStock: 'Out of stock', remove: 'Remove item' },
      summary: { total: 'Total', mixed: 'Mixed' },
    },
    checkout: {
      title: 'Checkout', subtitle: 'Review your cart and place your client order.',
      validation: { emptyCart: 'Please add at least one product to cart before placing your order.', selectPickupShop: 'Please select a pickup shop before placing your order.' },
      errors: { submitFailed: 'Order submission failed. Please try again.' },
      success: { submitted: 'Order {{orderNumber}} submitted successfully.' },
      emptyCart: 'Your cart is empty.', browseProducts: 'Browse Products',
      summary: { title: 'Order summary', noSku: 'No SKU', qty: 'Qty {{count}}', total: 'Total', mixed: 'Mixed' },
      cards: { email: 'Email Us', emailSub: 'Response within 2 hours', call: 'Call Us', callSub: 'Mon-Fri, 9am - 6pm CET', visit: 'Visit Us' },
      form: {
        pickupShopLabel: 'Pickup shop',
        shop: { loading: 'Loading shops...', noneAvailable: 'No shops available', select: 'Select a shop' },
        notesLabel: 'Notes (optional)', notesPlaceholder: 'Add delivery notes or instructions',
      },
      actions: { backToCart: 'Back to cart', placeOrder: 'Place order', placingOrder: 'Placing order...' },
    },
    login: {
      title: 'Partner Portal', subtitle: 'Sign in to access wholesale pricing and inventory.',
      errors: { invalidCredentials: 'Invalid email or password. Please try again.' },
      cards: { email: 'Email Us', emailSub: 'Response within 2 hours', call: 'Call Us', callSub: 'Mon-Fri, 9am - 6pm CET', visit: 'Visit Us' },
      form: {
        emailLabel: 'Email Address', emailPlaceholder: 'name@company.com', passwordLabel: 'Password', passwordPlaceholder: '••••••••', forgotPassword: 'Forgot Password?',
      },
      actions: { signIn: 'Sign In' },
      cta: { noAccount: "Don't have a business account?", applyNow: 'Apply Now' },
      footer: { support: 'Support', privacy: 'Privacy', terms: 'Terms' },
    },
    listing: {
      title: 'Parts Catalog', subtitle: 'Browse our complete inventory of verified mobile components.',
      sort: { name: 'Name', price: 'Price', stock: 'Stock' },
      direction: { asc: 'Ascending', desc: 'Descending' },
      searchPlaceholder: 'Search by name, SKU, brand, or model...',
      filters: { category: 'Category', brand: 'Brand', model: 'Model', partType: 'Part Type' },
      empty: { title: 'No products found', description: "Try adjusting your search or filters to find what you're looking for." },
      common: { all: 'All', unknown: 'Unknown' },
    },
    featured: {
      badge: 'Top-Auswahl', heroTitleLine1: 'Empfohlene', heroTitleLine2: 'Produkte', heroSubtitle: 'Kuratiert nach Zuverlässigkeit, Nachfrage und konstanter Leistung.',
      section: { title: 'Empfohlener Bestand', subtitle: 'Ausgewählter Hochleistungsbestand für Ihr Geschäft.' },
      empty: 'Für dieses Geschäft wurden keine empfohlenen Produkte gefunden.',
      why: { title: 'Warum empfohlen?', description: 'Empfohlene Artikel werden anhand von Qualitätshistorie, Bestandskontinuität und Marktnachfrage ausgewählt, damit Ihr Team sicher nachbestellen kann.', cta: 'Auswahlkriterien' },
    },
    newArrivals: {
      alt: { heroImage: 'New Arrivals' },
      badge: 'Just Landed', titleLine1: 'New', titleLine2: 'Arrivals', subtitle: 'The latest cutting-edge components for the newest devices on the market. Fresh from our quality control labs.',
      section: { title: 'Latest Inventory', subtitle: 'Updated every 24 hours with verified stock.' },
      filters: { label: 'Filter by:', brand: 'Brand', model: 'Model' },
      empty: 'No newly arrived products found.',
      priority: { title: 'Priority Stocking', description: 'We prioritize stocking parts for flagship devices within 14 days of their global release. Stay ahead of the repair market with our early-access inventory.', cta: 'Learn about sourcing' },
      verified: { title: 'Verified Arrivals', description: 'Every new arrival goes through an extended 48-hour burn-in test to ensure compatibility with the latest firmware updates from manufacturers.', cta: 'Our Quality Standards' },
    },

    productDetail: {
      notFound: { title: 'Produkt nicht gefunden' },
      backToCatalog: 'Zurück zum Katalog', viewImage: 'Produktbild {{count}} anzeigen', thumbnail: 'Vorschau {{count}}', verifiedBrand: 'Verifizierte Marke',
      reviews: '4,9 (128 Bewertungen)', priceLocked: 'Preis gesperrt', signInForRates: 'Bitte melden Sie sich als Partner an, um Großhandelspreise zu sehen.', loginToOrder: 'Zum Bestellen anmelden',
      freeShipping: 'Kostenloser Expressversand ab USD500', nextDay: 'Nächster Tag', deliveryAvailable: 'Lieferung verfügbar', warrantyDays: '30 Tage', warrantyIncluded: 'Garantie inklusive',
      tabs: { description: 'Beschreibung', specs: 'Spezifikationen', shipping: 'Versand & Rückgabe' },
      noDescription: 'Für dieses Teil ist keine detaillierte Beschreibung verfügbar.',
      bullets: { '1': 'A+ Premium-Qualität', '2': 'Vollständig vor Versand getestet', '3': 'Kompatibel mit Originalgehäuse', '4': 'Professionelle Installation empfohlen' },
      specs: {
        partType: 'Teiletyp', component: 'Komponente', sku: 'SKU', compatibility: 'Kompatibilität', weight: 'Gewicht', material: 'Material', materialValue: 'OEM-Standard', condition: 'Zustand', conditionValue: 'Neu',
      },
      shippingText: 'Wir versenden weltweit mit DHL, FedEx und UPS. Bestellungen vor 14:00 Uhr EST werden am selben Tag versendet.',
      returnPolicyTitle: 'Rückgaberecht',
      returnPolicyText: 'Rückgaben defekter Teile werden innerhalb von 30 Tagen akzeptiert. Teile müssen im Originalzustand mit allen Schutzfolien sein.',
      related: 'Ähnliche Komponenten',
    },
    contact: {
      badge: 'Support', title: 'Get in Touch', subtitle: 'Have questions about a component or need technical support? Our expert team is ready to assist you.',
      success: { submitted: 'Your inquiry has been submitted successfully.' },
      errors: { submitFailed: 'Unable to submit your inquiry right now. Please try again shortly.' },
      hours: {
        title: 'Global Support Hours', weekdays: { label: 'Monday - Friday', value: '24 Hours' }, saturday: { label: 'Saturday', value: '10:00 - 16:00' }, sunday: { label: 'Sunday', value: 'Closed' },
      },
      cards: { email: 'Email Us', emailSub: 'Response within 2 hours', call: 'Call Us', callSub: 'Mon-Fri, 9am - 6pm CET', visit: 'Visit Us' },
      form: {
        fullName: 'Full Name', fullNamePlaceholder: 'John Doe', email: 'Email Address', emailPlaceholder: 'john@example.com', phone: 'Phone Number', phonePlaceholder: '+1 555 123 4567',
        subject: 'Subject', subjectPlaceholder: 'Select a subject', subjectTechnical: 'Technical Support', subjectOrder: 'Order Inquiry', subjectBulk: 'Bulk Pricing', subjectOther: 'Other',
        message: 'Message', messagePlaceholder: 'How can we help you?', sending: 'Sending...', send: 'Send Message',
      },
    },
    qualityGuide: {
      badge: 'Quality Standards', title: 'Quality Guide', subtitle: "Transparency is at the core of our business. We categorize every component using strict industry standards so you know exactly what you're buying.",
      advantages: 'Advantages', considerations: 'Considerations',
      grades: {
        original: {
          title: 'Service Pack / Original', description: "Direct from the manufacturer's official supply chain. These are the exact same components used in the original device assembly.",
          pros: { '1': '100% Original specifications', '2': 'Highest reliability', '3': 'Full manufacturer warranty support' },
          cons: { '1': 'Highest price point', '2': 'Limited availability for older models' },
        },
        refurbished: {
          title: 'Premium / Refurbished', description: 'Original components that have been professionally restored to like-new condition using high-grade materials.',
          pros: { '1': 'Original performance', '2': 'Eco-friendly choice', '3': 'Better value than Service Pack' },
          cons: { '1': 'May show microscopic signs of previous use', '2': 'Varying supply levels' },
        },
        hq: {
          title: 'High Quality (HQ) / AAA', description: 'Third-party components engineered to match original specifications as closely as possible. Rigorously tested for compatibility.',
          pros: { '1': 'Excellent price-to-performance ratio', '2': 'High availability', '3': 'Strict quality control' },
          cons: { '1': 'Minor differences in color or brightness', '2': 'Slightly higher power consumption' },
        },
      },
      testing: {
        title: 'Our Testing Protocol', subtitle: 'Every single part undergoes a 12-point inspection before shipping.',
        items: {
          '1': 'Visual Inspection', '2': 'Touch Sensitivity', '3': 'Color Accuracy', '4': 'Frame Fitment', '5': 'Power Consumption', '6': 'Heat Dissipation',
          '7': 'Connector Integrity', '8': 'Pixel Integrity', '9': 'Backlight Uniformity', '10': 'Flex Cable Stress', '11': 'IC Compatibility', '12': 'Final Burn-in',
        },
      },
    },
    shippingPolicy: {
      badge: 'Logistics', title: 'Shipping Policy', subtitle: 'Global logistics engineered for speed and reliability. We ensure your critical components arrive safely and on time.',
      cards: {
        global: { title: 'Global Coverage', description: 'We ship to over 150 countries worldwide using premium carriers like DHL, FedEx, and UPS.' },
        fast: { title: 'Fast Processing', description: 'Orders placed before 2:00 PM CET are processed and dispatched on the same business day.' },
        secure: { title: 'Secure Packaging', description: 'All components are packed in ESD-safe, anti-static materials to ensure zero damage during transit.' },
        tracking: { title: 'Real-time Tracking', description: 'Receive instant updates and precise tracking information as soon as your order leaves our facility.' },
      },
      delivery: {
        title: 'Delivery Estimates', region: 'Region', standard: 'Standard', express: 'Express',
        eu: { region: 'European Union', standard: '2-4 Business Days', express: 'Next Day' },
        na: { region: 'North America', standard: '5-7 Business Days', express: '2-3 Days' },
        apac: { region: 'Asia Pacific', standard: '7-10 Business Days', express: '3-5 Days' },
      },
      customs: { title: 'Customs & Duties', description: "For international orders, please note that customs duties, taxes, and import fees may apply depending on your country's regulations. These charges are the responsibility of the recipient. We provide all necessary documentation to ensure a smooth customs clearance process." },
    },
    privacyPolicy: {
      badge: 'Security', title: 'Privacy Policy', subtitle: 'Your privacy is our priority. We are committed to protecting your personal data and being transparent about how we use it.',
      sections: {
        dataCollection: { title: 'Data Collection', content: 'We collect information that you provide directly to us, such as when you create an account, place an order, or contact our support team. This may include your name, email address, shipping address, and payment information.' },
        dataUsage: { title: 'How We Use Your Information', content: 'Your data is used to process transactions, provide customer support, and improve our services. We may also use your information to send you updates about your orders or promotional offers if you have opted in.' },
        security: { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. All sensitive data is encrypted during transmission and storage.' },
        sharing: { title: 'Third-Party Sharing', content: 'We do not sell your personal information to third parties. We only share data with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.' },
        rights: { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You can manage your data through your account settings or by contacting our privacy officer.' },
      },
      lastUpdated: 'Last updated: March 13, 2026. If you have any questions regarding this policy, please contact our privacy team.',
      actions: { downloadPdf: 'Download PDF', contactSupport: 'Contact Support' },
    },
    terms: {
      badge: 'Legal Framework', title: 'Terms of Service', subtitle: 'Please read these terms carefully before using our platform. They define the legal relationship between you and our company.',
      sections: {
        acceptance: { title: 'Acceptance of Terms', content: 'By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.' },
        license: { title: 'Use License', content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.' },
        disclaimer: { title: 'Disclaimer', content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability." },
        limitations: { title: 'Limitations', content: 'In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.' },
        governing: { title: 'Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is headquartered, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.' },
      },
      notice: { title: 'Important Notice', content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect." },
    },

    product: {
      genericBrand: 'Generic', premiumSparePart: 'Premium Spare Part', shortDescription: 'High-quality replacement component verified for performance.',
      shortDescriptionLong: 'High-quality replacement component verified for performance and durability.', stockLabel: 'Stock: {{count}}',
      inStockLabel: 'In stock ({{count}})', outOfStock: 'Out of stock', loginForPrice: 'Login for price', guestPriceLocked: 'Price locked for guests',
      guestAccessLocked: 'Guest access locked', addToCart: 'Add to cart', orderingUnavailable: 'Ordering unavailable', productImage: 'Product image', universal: 'Universal',
    },
    common: { na: 'N/A' },
    notFound: {
      title: 'Lost in the Matrix?',
      description: 'The part or page you are looking for has been moved, removed, or never existed in this dimension.',
      cta: 'Return to Base',
    },
    enum: {
      pricingMode: { direct: 'Direct Price', percentageBased: 'Percentage Based' },
      qualityType: { original: 'Original', oem: 'OEM', highCopy: 'High Copy', refurbished: 'Refurbished' },
      trackingType: { quantityBased: 'Quantity Based', serialized: 'Serialized' },
    },
  },
  de: {
    nav: { products: 'Produkte', newArrivals: 'Neuheiten', qualityGuide: 'Qualitätsleitfaden', myProfile: 'Mein Profil', logout: 'Abmelden', login: 'Anmelden', cart: 'Warenkorb' },
    footer: {
      description: 'Die Zukunft der Großhandelselektronik. Premium-Teile, geprüfte Qualität und nahtlose Logistik für moderne Reparaturbetriebe.',
      explore: 'Entdecken', allProducts: 'Alle Produkte', support: 'Support', myAccount: 'Mein Konto', shippingPolicy: 'Versandrichtlinie', contactUs: 'Kontakt',
      rights: '© 2026 StoreFront Wholesale. Alle Rechte vorbehalten.', privacy: 'Datenschutz', terms: 'AGB',
    },
    home: {
      badge: 'B2B Großhandelsplattform', titlePrefix: 'Premium-Teile für', titleAccent: 'moderne', titleSuffix: 'Geräte.',
      subtitle: 'Greifen Sie auf den weltweit größten Katalog verifizierter Mobilteile zu. Exklusive Großhandelspreise für registrierte Unternehmen.',
      browseCatalog: 'Katalog ansehen', partnerLogin: 'Partner-Login', sectionTitle: 'Neuheiten', sectionSubtitle: 'Die neuesten Komponenten für aktuelle Geräte.',
      viewAll: 'Alle anzeigen', noArrivals: 'Aktuell sind keine Neuheiten verfügbar.', trustTitle: 'Vertrauen von über 5.000 Reparaturzentren',
      trustQuote: '"MobileParts hat unsere Lieferkette transformiert. Die gleichbleibende Qualität ist in der Branche einzigartig und das Support-Team ist immer für uns da."',
      trustAuthor: 'David Chen', trustRole: 'CEO, TechFix Solutions',
      featuredSection: { title: 'Featured Products', subtitle: 'Hand-picked products with top demand and performance.', empty: 'No featured products available right now.' },
      features: {
        qualityTitle: 'Geprüfte Qualität', qualityDesc: 'Jedes Teil durchläuft vor dem Versand einen 20-Punkte-Qualitätscheck.',
        shippingTitle: 'Weltweiter Versand', shippingDesc: 'Expresslieferung in über 150 Länder mit Echtzeit-Tracking.',
        quotesTitle: 'Sofortige Angebote', quotesDesc: 'Dynamische Großhandelspreise basierend auf Volumen und Loyalität.',
      },
    },

    cart: {
      title: 'Shopping Cart', subtitle: 'Review items and continue to checkout.',
      empty: { title: 'Your cart is empty', description: 'Add products from the catalog to place your order.', browseProducts: 'Browse Products' },
      actions: { clearCart: 'Clear cart', continueShopping: 'Continue shopping', proceedToCheckout: 'Proceed to checkout' },
      item: { noSku: 'No SKU', inStock: 'In stock', outOfStock: 'Out of stock', remove: 'Remove item' },
      summary: { total: 'Total', mixed: 'Mixed' },
    },
    checkout: {
      title: 'Checkout', subtitle: 'Review your cart and place your client order.',
      validation: { emptyCart: 'Please add at least one product to cart before placing your order.', selectPickupShop: 'Please select a pickup shop before placing your order.' },
      errors: { submitFailed: 'Order submission failed. Please try again.' },
      success: { submitted: 'Order {{orderNumber}} submitted successfully.' },
      emptyCart: 'Your cart is empty.', browseProducts: 'Browse Products',
      summary: { title: 'Order summary', noSku: 'No SKU', qty: 'Qty {{count}}', total: 'Total', mixed: 'Mixed' },
      form: {
        pickupShopLabel: 'Pickup shop',
        shop: { loading: 'Loading shops...', noneAvailable: 'No shops available', select: 'Select a shop' },
        notesLabel: 'Notes (optional)', notesPlaceholder: 'Add delivery notes or instructions',
      },
      actions: { backToCart: 'Back to cart', placeOrder: 'Place order', placingOrder: 'Placing order...' },
    },
    login: {
      title: 'Partner Portal', subtitle: 'Sign in to access wholesale pricing and inventory.',
      errors: { invalidCredentials: 'Invalid email or password. Please try again.' },
      form: {
        emailLabel: 'Email Address', emailPlaceholder: 'name@company.com', passwordLabel: 'Password', passwordPlaceholder: '••••••••', forgotPassword: 'Forgot Password?',
      },
      actions: { signIn: 'Sign In' },
      cta: { noAccount: "Don't have a business account?", applyNow: 'Apply Now' },
      footer: { support: 'Support', privacy: 'Privacy', terms: 'Terms' },
    },
    listing: {
      title: 'Parts Catalog', subtitle: 'Browse our complete inventory of verified mobile components.',
      sort: { name: 'Name', price: 'Price', stock: 'Stock' },
      direction: { asc: 'Ascending', desc: 'Descending' },
      searchPlaceholder: 'Search by name, SKU, brand, or model...',
      filters: { category: 'Category', brand: 'Brand', model: 'Model', partType: 'Part Type' },
      empty: { title: 'No products found', description: "Try adjusting your search or filters to find what you're looking for." },
      common: { all: 'All', unknown: 'Unknown' },
    },
    featured: {
      badge: 'Top-Auswahl', heroTitleLine1: 'Empfohlene', heroTitleLine2: 'Produkte', heroSubtitle: 'Kuratiert nach Zuverlässigkeit, Nachfrage und konstanter Leistung.',
      section: { title: 'Empfohlener Bestand', subtitle: 'Ausgewählter Hochleistungsbestand für Ihr Geschäft.' },
      empty: 'Für dieses Geschäft wurden keine empfohlenen Produkte gefunden.',
      why: { title: 'Warum empfohlen?', description: 'Empfohlene Artikel werden anhand von Qualitätshistorie, Bestandskontinuität und Marktnachfrage ausgewählt, damit Ihr Team sicher nachbestellen kann.', cta: 'Auswahlkriterien' },
    },
    newArrivals: {
      alt: { heroImage: 'New Arrivals' },
      badge: 'Just Landed', titleLine1: 'New', titleLine2: 'Arrivals', subtitle: 'The latest cutting-edge components for the newest devices on the market. Fresh from our quality control labs.',
      section: { title: 'Latest Inventory', subtitle: 'Updated every 24 hours with verified stock.' },
      filters: { label: 'Filter by:', brand: 'Brand', model: 'Model' },
      empty: 'No newly arrived products found.',
      priority: { title: 'Priority Stocking', description: 'We prioritize stocking parts for flagship devices within 14 days of their global release. Stay ahead of the repair market with our early-access inventory.', cta: 'Learn about sourcing' },
      verified: { title: 'Verified Arrivals', description: 'Every new arrival goes through an extended 48-hour burn-in test to ensure compatibility with the latest firmware updates from manufacturers.', cta: 'Our Quality Standards' },
    },

    productDetail: {
      notFound: { title: 'Produkt nicht gefunden' },
      backToCatalog: 'Zurück zum Katalog', viewImage: 'Produktbild {{count}} anzeigen', thumbnail: 'Vorschau {{count}}', verifiedBrand: 'Verifizierte Marke',
      reviews: '4,9 (128 Bewertungen)', priceLocked: 'Preis gesperrt', signInForRates: 'Bitte melden Sie sich als Partner an, um Großhandelspreise zu sehen.', loginToOrder: 'Zum Bestellen anmelden',
      freeShipping: 'Kostenloser Expressversand ab USD500', nextDay: 'Nächster Tag', deliveryAvailable: 'Lieferung verfügbar', warrantyDays: '30 Tage', warrantyIncluded: 'Garantie inklusive',
      tabs: { description: 'Beschreibung', specs: 'Spezifikationen', shipping: 'Versand & Rückgabe' },
      noDescription: 'Für dieses Teil ist keine detaillierte Beschreibung verfügbar.',
      bullets: { '1': 'A+ Premium-Qualität', '2': 'Vollständig vor Versand getestet', '3': 'Kompatibel mit Originalgehäuse', '4': 'Professionelle Installation empfohlen' },
      specs: {
        partType: 'Teiletyp', component: 'Komponente', sku: 'SKU', compatibility: 'Kompatibilität', weight: 'Gewicht', material: 'Material', materialValue: 'OEM-Standard', condition: 'Zustand', conditionValue: 'Neu',
      },
      shippingText: 'Wir versenden weltweit mit DHL, FedEx und UPS. Bestellungen vor 14:00 Uhr EST werden am selben Tag versendet.',
      returnPolicyTitle: 'Rückgaberecht',
      returnPolicyText: 'Rückgaben defekter Teile werden innerhalb von 30 Tagen akzeptiert. Teile müssen im Originalzustand mit allen Schutzfolien sein.',
      related: 'Ähnliche Komponenten',
    },
    contact: {
      badge: 'Support', title: 'Kontakt aufnehmen', subtitle: 'Fragen zu Komponenten oder technischer Unterstützung? Unser Expertenteam hilft Ihnen gerne.',
      success: { submitted: 'Ihre Anfrage wurde erfolgreich übermittelt.' },
      errors: { submitFailed: 'Ihre Anfrage konnte derzeit nicht gesendet werden. Bitte versuchen Sie es in Kürze erneut.' },
      hours: {
        title: 'Globale Supportzeiten', weekdays: { label: 'Montag - Freitag', value: '24 Stunden' }, saturday: { label: 'Samstag', value: '10:00 - 16:00' }, sunday: { label: 'Sonntag', value: 'Geschlossen' },
      },
      cards: { email: 'E-Mail', emailSub: 'Antwort innerhalb von 2 Stunden', call: 'Anrufen', callSub: 'Mo-Fr, 9:00 - 18:00 CET', visit: 'Besuchen Sie uns' },
      form: {
        fullName: 'Vollständiger Name', fullNamePlaceholder: 'Max Mustermann', email: 'E-Mail-Adresse', emailPlaceholder: 'max@beispiel.de', phone: 'Telefonnummer', phonePlaceholder: '+49 151 1234567',
        subject: 'Betreff', subjectPlaceholder: 'Betreff auswählen', subjectTechnical: 'Technischer Support', subjectOrder: 'Bestellanfrage', subjectBulk: 'Großhandelspreise', subjectOther: 'Sonstiges',
        message: 'Nachricht', messagePlaceholder: 'Wie können wir helfen?', sending: 'Wird gesendet...', send: 'Nachricht senden',
      },
    },
    qualityGuide: {
      badge: 'Qualitätsstandards', title: 'Qualitätsleitfaden', subtitle: 'Transparenz ist der Kern unseres Geschäfts. Wir kategorisieren jede Komponente nach strengen Industriestandards.',
      advantages: 'Vorteile', considerations: 'Hinweise',
      grades: {
        original: {
          title: 'Service Pack / Original', description: 'Direkt aus der offiziellen Lieferkette des Herstellers.',
          pros: { '1': '100 % Original-Spezifikationen', '2': 'Höchste Zuverlässigkeit', '3': 'Volle Herstellergarantie' },
          cons: { '1': 'Höchster Preis', '2': 'Begrenzte Verfügbarkeit älterer Modelle' },
        },
        refurbished: {
          title: 'Premium / Refurbished', description: 'Originalteile, professionell in neuwertigen Zustand aufbereitet.',
          pros: { '1': 'Originalleistung', '2': 'Umweltfreundliche Wahl', '3': 'Besseres Preis-Leistungs-Verhältnis' },
          cons: { '1': 'Mikroskopische Gebrauchsspuren möglich', '2': 'Schwankende Verfügbarkeit' },
        },
        hq: {
          title: 'Hohe Qualität (HQ) / AAA', description: 'Drittanbieter-Komponenten, die den Original-Spezifikationen möglichst nahekommen.',
          pros: { '1': 'Sehr gutes Preis-Leistungs-Verhältnis', '2': 'Hohe Verfügbarkeit', '3': 'Strenge Qualitätskontrolle' },
          cons: { '1': 'Leichte Unterschiede bei Farbe/Helligkeit', '2': 'Etwas höherer Energieverbrauch' },
        },
      },
      testing: {
        title: 'Unser Prüfprotokoll', subtitle: 'Jedes Teil durchläuft vor dem Versand eine 12-Punkte-Prüfung.',
        items: {
          '1': 'Sichtprüfung', '2': 'Touch-Empfindlichkeit', '3': 'Farbgenauigkeit', '4': 'Rahmenpassung', '5': 'Stromverbrauch', '6': 'Wärmeableitung',
          '7': 'Steckerintegrität', '8': 'Pixelintegrität', '9': 'Backlight-Gleichmäßigkeit', '10': 'Flexkabel-Belastung', '11': 'IC-Kompatibilität', '12': 'Abschließender Burn-in',
        },
      },
    },
    shippingPolicy: {
      badge: 'Logistics', title: 'Shipping Policy', subtitle: 'Global logistics engineered for speed and reliability. We ensure your critical components arrive safely and on time.',
      cards: {
        global: { title: 'Global Coverage', description: 'We ship to over 150 countries worldwide using premium carriers like DHL, FedEx, and UPS.' },
        fast: { title: 'Fast Processing', description: 'Orders placed before 2:00 PM CET are processed and dispatched on the same business day.' },
        secure: { title: 'Secure Packaging', description: 'All components are packed in ESD-safe, anti-static materials to ensure zero damage during transit.' },
        tracking: { title: 'Real-time Tracking', description: 'Receive instant updates and precise tracking information as soon as your order leaves our facility.' },
      },
      delivery: {
        title: 'Delivery Estimates', region: 'Region', standard: 'Standard', express: 'Express',
        eu: { region: 'European Union', standard: '2-4 Business Days', express: 'Next Day' },
        na: { region: 'North America', standard: '5-7 Business Days', express: '2-3 Days' },
        apac: { region: 'Asia Pacific', standard: '7-10 Business Days', express: '3-5 Days' },
      },
      customs: { title: 'Customs & Duties', description: "For international orders, please note that customs duties, taxes, and import fees may apply depending on your country's regulations. These charges are the responsibility of the recipient. We provide all necessary documentation to ensure a smooth customs clearance process." },
    },
    privacyPolicy: {
      badge: 'Security', title: 'Privacy Policy', subtitle: 'Your privacy is our priority. We are committed to protecting your personal data and being transparent about how we use it.',
      sections: {
        dataCollection: { title: 'Data Collection', content: 'We collect information that you provide directly to us, such as when you create an account, place an order, or contact our support team. This may include your name, email address, shipping address, and payment information.' },
        dataUsage: { title: 'How We Use Your Information', content: 'Your data is used to process transactions, provide customer support, and improve our services. We may also use your information to send you updates about your orders or promotional offers if you have opted in.' },
        security: { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. All sensitive data is encrypted during transmission and storage.' },
        sharing: { title: 'Third-Party Sharing', content: 'We do not sell your personal information to third parties. We only share data with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.' },
        rights: { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You can manage your data through your account settings or by contacting our privacy officer.' },
      },
      lastUpdated: 'Last updated: March 13, 2026. If you have any questions regarding this policy, please contact our privacy team.',
      actions: { downloadPdf: 'Download PDF', contactSupport: 'Contact Support' },
    },
    terms: {
      badge: 'Legal Framework', title: 'Terms of Service', subtitle: 'Please read these terms carefully before using our platform. They define the legal relationship between you and our company.',
      sections: {
        acceptance: { title: 'Acceptance of Terms', content: 'By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.' },
        license: { title: 'Use License', content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.' },
        disclaimer: { title: 'Disclaimer', content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability." },
        limitations: { title: 'Limitations', content: 'In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.' },
        governing: { title: 'Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is headquartered, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.' },
      },
      notice: { title: 'Important Notice', content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect." },
    },

    product: {
      genericBrand: 'Allgemein', premiumSparePart: 'Premium-Ersatzteil', shortDescription: 'Hochwertige Ersatzkomponente, geprüft auf Leistung.',
      shortDescriptionLong: 'Hochwertige Ersatzkomponente, geprüft auf Leistung und Langlebigkeit.', stockLabel: 'Bestand: {{count}}',
      inStockLabel: 'Auf Lager ({{count}})', outOfStock: 'Nicht auf Lager', loginForPrice: 'Preis nach Anmeldung', guestPriceLocked: 'Preis für Gäste gesperrt',
      guestAccessLocked: 'Gastzugriff gesperrt', addToCart: 'In den Warenkorb', orderingUnavailable: 'Bestellung nicht verfügbar', productImage: 'Produktbild', universal: 'Universal',
    },
    common: { na: 'k.A.' },
    notFound: {
      title: 'Im Matrix-Netz verloren?',
      description: 'Das gesuchte Teil oder die Seite wurde verschoben, entfernt oder hat in dieser Dimension nie existiert.',
      cta: 'Zur Startseite',
    },
    enum: {
      pricingMode: { direct: 'Direktpreis', percentageBased: 'Prozentbasiert' },
      qualityType: { original: 'Original', oem: 'OEM', highCopy: 'High Copy', refurbished: 'Generalüberholt' },
      trackingType: { quantityBased: 'Mengenbasiert', serialized: 'Serialisiert' },
    },
  },
  fr: {
    nav: { products: 'Produits', newArrivals: 'Nouveautés', qualityGuide: 'Guide qualité', myProfile: 'Mon profil', logout: 'Se déconnecter', login: 'Connexion', cart: 'Panier' },
    footer: {
      description: "L'avenir de l'électronique en gros. Pièces premium, qualité vérifiée et logistique fluide pour les ateliers modernes.",
      explore: 'Explorer', allProducts: 'Tous les produits', support: 'Support', myAccount: 'Mon compte', shippingPolicy: 'Politique de livraison', contactUs: 'Contactez-nous',
      rights: '© 2026 StoreFront Wholesale. Tous droits réservés.', privacy: 'Confidentialité', terms: 'Conditions',
    },
    home: {
      badge: 'Marketplace B2B de gros', titlePrefix: 'Pièces premium pour les', titleAccent: 'appareils', titleSuffix: 'modernes.',
      subtitle: 'Accédez au plus grand catalogue de pièces mobiles vérifiées. Tarifs grossiste réservés aux entreprises enregistrées.',
      browseCatalog: 'Parcourir le catalogue', partnerLogin: 'Connexion partenaire', sectionTitle: 'Nouveautés', sectionSubtitle: 'Les derniers composants pour les appareils les plus récents.',
      viewAll: 'Tout voir', noArrivals: 'Aucune nouveauté disponible pour le moment.', trustTitle: 'Approuvé par plus de 5 000 centres de réparation',
      trustQuote: "\"MobileParts a transformé notre chaîne d'approvisionnement. La constance de qualité est inégalée et leur équipe support répond toujours présente.\"",
      trustAuthor: 'David Chen', trustRole: 'PDG, TechFix Solutions',
      featuredSection: { title: 'Featured Products', subtitle: 'Hand-picked products with top demand and performance.', empty: 'No featured products available right now.' },
      features: {
        qualityTitle: 'Qualité vérifiée', qualityDesc: 'Chaque pièce suit un contrôle en 20 points avant expédition.',
        shippingTitle: 'Livraison mondiale', shippingDesc: 'Livraison express dans plus de 150 pays avec suivi en temps réel.',
        quotesTitle: 'Devis instantanés', quotesDesc: 'Tarification grossiste dynamique selon le volume et la fidélité.',
      },
    },

    cart: {
      title: 'Shopping Cart', subtitle: 'Review items and continue to checkout.',
      empty: { title: 'Your cart is empty', description: 'Add products from the catalog to place your order.', browseProducts: 'Browse Products' },
      actions: { clearCart: 'Clear cart', continueShopping: 'Continue shopping', proceedToCheckout: 'Proceed to checkout' },
      item: { noSku: 'No SKU', inStock: 'In stock', outOfStock: 'Out of stock', remove: 'Remove item' },
      summary: { total: 'Total', mixed: 'Mixed' },
    },
    checkout: {
      title: 'Checkout', subtitle: 'Review your cart and place your client order.',
      validation: { emptyCart: 'Please add at least one product to cart before placing your order.', selectPickupShop: 'Please select a pickup shop before placing your order.' },
      errors: { submitFailed: 'Order submission failed. Please try again.' },
      success: { submitted: 'Order {{orderNumber}} submitted successfully.' },
      emptyCart: 'Your cart is empty.', browseProducts: 'Browse Products',
      summary: { title: 'Order summary', noSku: 'No SKU', qty: 'Qty {{count}}', total: 'Total', mixed: 'Mixed' },
      form: {
        pickupShopLabel: 'Pickup shop',
        shop: { loading: 'Loading shops...', noneAvailable: 'No shops available', select: 'Select a shop' },
        notesLabel: 'Notes (optional)', notesPlaceholder: 'Add delivery notes or instructions',
      },
      actions: { backToCart: 'Back to cart', placeOrder: 'Place order', placingOrder: 'Placing order...' },
    },
    login: {
      title: 'Partner Portal', subtitle: 'Sign in to access wholesale pricing and inventory.',
      errors: { invalidCredentials: 'Invalid email or password. Please try again.' },
      form: {
        emailLabel: 'Email Address', emailPlaceholder: 'name@company.com', passwordLabel: 'Password', passwordPlaceholder: '••••••••', forgotPassword: 'Forgot Password?',
      },
      actions: { signIn: 'Sign In' },
      cta: { noAccount: "Don't have a business account?", applyNow: 'Apply Now' },
      footer: { support: 'Support', privacy: 'Privacy', terms: 'Terms' },
    },
    listing: {
      title: 'Parts Catalog', subtitle: 'Browse our complete inventory of verified mobile components.',
      sort: { name: 'Name', price: 'Price', stock: 'Stock' },
      direction: { asc: 'Ascending', desc: 'Descending' },
      searchPlaceholder: 'Search by name, SKU, brand, or model...',
      filters: { category: 'Category', brand: 'Brand', model: 'Model', partType: 'Part Type' },
      empty: { title: 'No products found', description: "Try adjusting your search or filters to find what you're looking for." },
      common: { all: 'All', unknown: 'Unknown' },
    },
    featured: {
      badge: 'Sélection premium', heroTitleLine1: 'Produits', heroTitleLine2: 'en vedette', heroSubtitle: 'Produits sélectionnés pour leur fiabilité, leur demande et leurs performances constantes.',
      section: { title: 'Stock en vedette', subtitle: 'Stock haute performance sélectionné pour votre atelier.' },
      empty: 'Aucun produit en vedette pour cette boutique.',
      why: { title: 'Pourquoi en vedette ?', description: 'Les articles en vedette sont sélectionnés selon l’historique qualité, la continuité des stocks et la demande du marché.', cta: 'Critères de sélection' },
    },
    newArrivals: {
      alt: { heroImage: 'New Arrivals' },
      badge: 'Just Landed', titleLine1: 'New', titleLine2: 'Arrivals', subtitle: 'The latest cutting-edge components for the newest devices on the market. Fresh from our quality control labs.',
      section: { title: 'Latest Inventory', subtitle: 'Updated every 24 hours with verified stock.' },
      filters: { label: 'Filter by:', brand: 'Brand', model: 'Model' },
      empty: 'No newly arrived products found.',
      priority: { title: 'Priority Stocking', description: 'We prioritize stocking parts for flagship devices within 14 days of their global release. Stay ahead of the repair market with our early-access inventory.', cta: 'Learn about sourcing' },
      verified: { title: 'Verified Arrivals', description: 'Every new arrival goes through an extended 48-hour burn-in test to ensure compatibility with the latest firmware updates from manufacturers.', cta: 'Our Quality Standards' },
    },

    productDetail: {
      notFound: { title: 'Produit introuvable' },
      backToCatalog: 'Retour au catalogue', viewImage: 'Voir l’image produit {{count}}', thumbnail: 'miniature {{count}}', verifiedBrand: 'Marque vérifiée',
      reviews: '4,9 (128 avis)', priceLocked: 'Prix verrouillé', signInForRates: 'Connectez-vous en tant que partenaire pour voir les tarifs grossistes.', loginToOrder: 'Se connecter pour commander',
      freeShipping: 'Livraison express gratuite dès 500 USD', nextDay: 'Jour suivant', deliveryAvailable: 'Livraison disponible', warrantyDays: '30 jours', warrantyIncluded: 'Garantie incluse',
      tabs: { description: 'Description', specs: 'Spécifications', shipping: 'Livraison & retours' },
      noDescription: 'Aucune description détaillée disponible pour cette pièce.',
      bullets: { '1': 'Qualité premium grade A+', '2': 'Entièrement testé avant expédition', '3': 'Compatible avec le châssis d’origine', '4': 'Installation professionnelle recommandée' },
      specs: {
        partType: 'Type de pièce', component: 'Composant', sku: 'SKU', compatibility: 'Compatibilité', weight: 'Poids', material: 'Matériau', materialValue: 'Standard OEM', condition: 'État', conditionValue: 'Neuf',
      },
      shippingText: 'Nous livrons dans le monde entier via DHL, FedEx et UPS. Les commandes passées avant 14h EST sont expédiées le jour même.',
      returnPolicyTitle: 'Politique de retour',
      returnPolicyText: 'Les retours sont acceptés sous 30 jours pour les pièces défectueuses, en état d’origine avec films de protection.',
      related: 'Composants similaires',
    },
    contact: {
      badge: 'Support', title: 'Contactez-nous', subtitle: 'Des questions sur une pièce ou besoin d’assistance technique ? Notre équipe est là pour vous aider.',
      success: { submitted: 'Votre demande a été envoyée avec succès.' },
      errors: { submitFailed: 'Impossible d’envoyer votre demande pour le moment. Veuillez réessayer bientôt.' },
      hours: {
        title: 'Horaires support mondial', weekdays: { label: 'Lundi - Vendredi', value: '24 heures' }, saturday: { label: 'Samedi', value: '10:00 - 16:00' }, sunday: { label: 'Dimanche', value: 'Fermé' },
      },
      cards: { email: 'E-mail', emailSub: 'Réponse sous 2 heures', call: 'Téléphone', callSub: 'Lun-Ven, 9h - 18h CET', visit: 'Visitez-nous' },
      form: {
        fullName: 'Nom complet', fullNamePlaceholder: 'Jean Dupont', email: 'Adresse e-mail', emailPlaceholder: 'jean@exemple.fr', phone: 'Numéro de téléphone', phonePlaceholder: '+33 6 12 34 56 78',
        subject: 'Sujet', subjectPlaceholder: 'Sélectionnez un sujet', subjectTechnical: 'Support technique', subjectOrder: 'Demande de commande', subjectBulk: 'Tarifs de gros', subjectOther: 'Autre',
        message: 'Message', messagePlaceholder: 'Comment pouvons-nous vous aider ?', sending: 'Envoi...', send: 'Envoyer le message',
      },
    },
    qualityGuide: {
      badge: 'Normes qualité', title: 'Guide qualité', subtitle: 'La transparence est au cœur de notre activité. Chaque composant est classé selon des normes strictes.',
      advantages: 'Avantages', considerations: 'Points à considérer',
      grades: {
        original: {
          title: 'Service Pack / Original', description: 'Issu directement de la chaîne d’approvisionnement officielle du fabricant.',
          pros: { '1': 'Spécifications 100 % d’origine', '2': 'Fiabilité maximale', '3': 'Garantie fabricant complète' },
          cons: { '1': 'Prix le plus élevé', '2': 'Disponibilité limitée pour anciens modèles' },
        },
        refurbished: {
          title: 'Premium / Reconditionné', description: 'Composants d’origine restaurés professionnellement à un état proche du neuf.',
          pros: { '1': 'Performance d’origine', '2': 'Choix écoresponsable', '3': 'Meilleur rapport qualité/prix' },
          cons: { '1': 'Micro-traces d’usage possibles', '2': 'Niveaux de stock variables' },
        },
        hq: {
          title: 'Haute qualité (HQ) / AAA', description: 'Composants tiers conçus pour se rapprocher au maximum des spécifications d’origine.',
          pros: { '1': 'Excellent rapport performance/prix', '2': 'Forte disponibilité', '3': 'Contrôle qualité strict' },
          cons: { '1': 'Légères différences de couleur/luminosité', '2': 'Consommation légèrement plus élevée' },
        },
      },
      testing: {
        title: 'Notre protocole de test', subtitle: 'Chaque pièce subit un contrôle en 12 points avant expédition.',
        items: {
          '1': 'Inspection visuelle', '2': 'Sensibilité tactile', '3': 'Précision des couleurs', '4': 'Ajustement du châssis', '5': 'Consommation électrique', '6': 'Dissipation thermique',
          '7': 'Intégrité des connecteurs', '8': 'Intégrité des pixels', '9': 'Uniformité du rétroéclairage', '10': 'Stress câble flex', '11': 'Compatibilité IC', '12': 'Burn-in final',
        },
      },
    },
    shippingPolicy: {
      badge: 'Logistics', title: 'Shipping Policy', subtitle: 'Global logistics engineered for speed and reliability. We ensure your critical components arrive safely and on time.',
      cards: {
        global: { title: 'Global Coverage', description: 'We ship to over 150 countries worldwide using premium carriers like DHL, FedEx, and UPS.' },
        fast: { title: 'Fast Processing', description: 'Orders placed before 2:00 PM CET are processed and dispatched on the same business day.' },
        secure: { title: 'Secure Packaging', description: 'All components are packed in ESD-safe, anti-static materials to ensure zero damage during transit.' },
        tracking: { title: 'Real-time Tracking', description: 'Receive instant updates and precise tracking information as soon as your order leaves our facility.' },
      },
      delivery: {
        title: 'Delivery Estimates', region: 'Region', standard: 'Standard', express: 'Express',
        eu: { region: 'European Union', standard: '2-4 Business Days', express: 'Next Day' },
        na: { region: 'North America', standard: '5-7 Business Days', express: '2-3 Days' },
        apac: { region: 'Asia Pacific', standard: '7-10 Business Days', express: '3-5 Days' },
      },
      customs: { title: 'Customs & Duties', description: "For international orders, please note that customs duties, taxes, and import fees may apply depending on your country's regulations. These charges are the responsibility of the recipient. We provide all necessary documentation to ensure a smooth customs clearance process." },
    },
    privacyPolicy: {
      badge: 'Security', title: 'Privacy Policy', subtitle: 'Your privacy is our priority. We are committed to protecting your personal data and being transparent about how we use it.',
      sections: {
        dataCollection: { title: 'Data Collection', content: 'We collect information that you provide directly to us, such as when you create an account, place an order, or contact our support team. This may include your name, email address, shipping address, and payment information.' },
        dataUsage: { title: 'How We Use Your Information', content: 'Your data is used to process transactions, provide customer support, and improve our services. We may also use your information to send you updates about your orders or promotional offers if you have opted in.' },
        security: { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or alteration. All sensitive data is encrypted during transmission and storage.' },
        sharing: { title: 'Third-Party Sharing', content: 'We do not sell your personal information to third parties. We only share data with trusted partners who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential.' },
        rights: { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information at any time. You can manage your data through your account settings or by contacting our privacy officer.' },
      },
      lastUpdated: 'Last updated: March 13, 2026. If you have any questions regarding this policy, please contact our privacy team.',
      actions: { downloadPdf: 'Download PDF', contactSupport: 'Contact Support' },
    },
    terms: {
      badge: 'Legal Framework', title: 'Terms of Service', subtitle: 'Please read these terms carefully before using our platform. They define the legal relationship between you and our company.',
      sections: {
        acceptance: { title: 'Acceptance of Terms', content: 'By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.' },
        license: { title: 'Use License', content: 'Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.' },
        disclaimer: { title: 'Disclaimer', content: "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability." },
        limitations: { title: 'Limitations', content: 'In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.' },
        governing: { title: 'Governing Law', content: 'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is headquartered, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.' },
      },
      notice: { title: 'Important Notice', content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect." },
    },

    product: {
      genericBrand: 'Générique', premiumSparePart: 'Pièce de rechange premium', shortDescription: 'Composant de remplacement de haute qualité vérifié pour la performance.',
      shortDescriptionLong: 'Composant de remplacement de haute qualité vérifié pour la performance et la durabilité.', stockLabel: 'Stock : {{count}}',
      inStockLabel: 'En stock ({{count}})', outOfStock: 'Rupture de stock', loginForPrice: 'Connectez-vous pour le prix', guestPriceLocked: 'Prix verrouillé pour invités',
      guestAccessLocked: 'Accès invité verrouillé', addToCart: 'Ajouter au panier', orderingUnavailable: 'Commande indisponible', productImage: 'Image du produit', universal: 'Universel',
    },
    common: { na: 'N/D' },
    notFound: {
      title: 'Perdu dans la matrice ?',
      description: "La pièce ou la page recherchée a été déplacée, supprimée, ou n'a jamais existé dans cette dimension.",
      cta: "Retour à l'accueil",
    },
    enum: {
      pricingMode: { direct: 'Prix direct', percentageBased: 'Basé sur un pourcentage' },
      qualityType: { original: 'Original', oem: 'OEM', highCopy: 'Haute copie', refurbished: 'Reconditionné' },
      trackingType: { quantityBased: 'Basé sur quantité', serialized: 'Sérialisé' },
    },
  },
};

export function getTranslation(language: SupportedLanguage, key: string): string | undefined {
  const segments = key.split('.');
  let current: TranslationLeaf | TranslationTree | undefined = translations[language];

  for (const segment of segments) {
    if (!current || typeof current === 'string') return undefined;
    current = current[segment];
  }

  return typeof current === 'string' ? current : undefined;
}

export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return Object.entries(vars).reduce((result, [name, value]) => result.split(`{{${name}}}`).join(String(value)), template);
}
