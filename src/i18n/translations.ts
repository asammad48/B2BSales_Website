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
      badge: 'Top Picks', heroTitleLine1: 'Featured', heroTitleLine2: 'Products', heroSubtitle: 'Curated products selected for reliability, demand, and consistent performance.',
      section: { title: 'Featured Inventory', subtitle: 'Hand-selected high performance stock for your shop.' },
      empty: 'No featured products found for this shop.',
      why: { title: 'Why Featured?', description: 'Featured items are selected based on quality history, stock continuity, and market demand so your team can reorder with confidence.', cta: 'Selection criteria' },
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
      notFound: { title: 'Product Not Found' },
      backToCatalog: 'Back to Catalog', viewImage: 'View product image {{count}}', thumbnail: 'thumbnail {{count}}', verifiedBrand: 'Verified Brand',
      reviews: '4.9 (128 Reviews)', priceLocked: 'Price Locked', signInForRates: 'Please sign in as a partner to view wholesale rates.', loginToOrder: 'Login to Order',
      freeShipping: 'Free Express Shipping on orders over USD500', nextDay: 'Next Day', deliveryAvailable: 'Delivery Available', warrantyDays: '30 Days', warrantyIncluded: 'Warranty Included',
      tabs: { description: 'Description', specs: 'Specifications', shipping: 'Shipping & Returns' },
      noDescription: 'No detailed description available for this part.',
      bullets: { '1': 'Grade A+ Premium Quality', '2': 'Fully tested before dispatch', '3': 'Compatible with original housing', '4': 'Professional installation recommended' },
      specs: {
        partType: 'Part Type', component: 'Component', sku: 'SKU', compatibility: 'Compatibility', weight: 'Weight', material: 'Material', materialValue: 'OEM Standard', condition: 'Condition', conditionValue: 'Brand New',
      },
      shippingText: 'We offer worldwide shipping through DHL, FedEx, and UPS. Orders placed before 2 PM EST are shipped the same day.',
      returnPolicyTitle: 'Return Policy',
      returnPolicyText: 'Returns are accepted within 30 days for defective parts. Parts must be in original condition with all protective films intact.',
      related: 'Related Components',
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
      badge: 'Top Picks', heroTitleLine1: 'Featured', heroTitleLine2: 'Products', heroSubtitle: 'Curated products selected for reliability, demand, and consistent performance.',
      section: { title: 'Featured Inventory', subtitle: 'Hand-selected high performance stock for your shop.' },
      empty: 'No featured products found for this shop.',
      why: { title: 'Why Featured?', description: 'Featured items are selected based on quality history, stock continuity, and market demand so your team can reorder with confidence.', cta: 'Selection criteria' },
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
      notFound: { title: 'Product Not Found' },
      backToCatalog: 'Back to Catalog', viewImage: 'View product image {{count}}', thumbnail: 'thumbnail {{count}}', verifiedBrand: 'Verified Brand',
      reviews: '4.9 (128 Reviews)', priceLocked: 'Price Locked', signInForRates: 'Please sign in as a partner to view wholesale rates.', loginToOrder: 'Login to Order',
      freeShipping: 'Free Express Shipping on orders over USD500', nextDay: 'Next Day', deliveryAvailable: 'Delivery Available', warrantyDays: '30 Days', warrantyIncluded: 'Warranty Included',
      tabs: { description: 'Description', specs: 'Specifications', shipping: 'Shipping & Returns' },
      noDescription: 'No detailed description available for this part.',
      bullets: { '1': 'Grade A+ Premium Quality', '2': 'Fully tested before dispatch', '3': 'Compatible with original housing', '4': 'Professional installation recommended' },
      specs: {
        partType: 'Part Type', component: 'Component', sku: 'SKU', compatibility: 'Compatibility', weight: 'Weight', material: 'Material', materialValue: 'OEM Standard', condition: 'Condition', conditionValue: 'Brand New',
      },
      shippingText: 'We offer worldwide shipping through DHL, FedEx, and UPS. Orders placed before 2 PM EST are shipped the same day.',
      returnPolicyTitle: 'Return Policy',
      returnPolicyText: 'Returns are accepted within 30 days for defective parts. Parts must be in original condition with all protective films intact.',
      related: 'Related Components',
    },
    contact: {
      badge: 'Support', title: 'Get in Touch', subtitle: 'Have questions about a component or need technical support? Our expert team is ready to assist you.',
      success: { submitted: 'Your inquiry has been submitted successfully.' },
      errors: { submitFailed: 'Unable to submit your inquiry right now. Please try again shortly.' },
      hours: {
        title: 'Global Support Hours', weekdays: { label: 'Monday - Friday', value: '24 Hours' }, saturday: { label: 'Saturday', value: '10:00 - 16:00' }, sunday: { label: 'Sunday', value: 'Closed' },
      },
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
      badge: 'Top Picks', heroTitleLine1: 'Featured', heroTitleLine2: 'Products', heroSubtitle: 'Curated products selected for reliability, demand, and consistent performance.',
      section: { title: 'Featured Inventory', subtitle: 'Hand-selected high performance stock for your shop.' },
      empty: 'No featured products found for this shop.',
      why: { title: 'Why Featured?', description: 'Featured items are selected based on quality history, stock continuity, and market demand so your team can reorder with confidence.', cta: 'Selection criteria' },
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
      notFound: { title: 'Product Not Found' },
      backToCatalog: 'Back to Catalog', viewImage: 'View product image {{count}}', thumbnail: 'thumbnail {{count}}', verifiedBrand: 'Verified Brand',
      reviews: '4.9 (128 Reviews)', priceLocked: 'Price Locked', signInForRates: 'Please sign in as a partner to view wholesale rates.', loginToOrder: 'Login to Order',
      freeShipping: 'Free Express Shipping on orders over USD500', nextDay: 'Next Day', deliveryAvailable: 'Delivery Available', warrantyDays: '30 Days', warrantyIncluded: 'Warranty Included',
      tabs: { description: 'Description', specs: 'Specifications', shipping: 'Shipping & Returns' },
      noDescription: 'No detailed description available for this part.',
      bullets: { '1': 'Grade A+ Premium Quality', '2': 'Fully tested before dispatch', '3': 'Compatible with original housing', '4': 'Professional installation recommended' },
      specs: {
        partType: 'Part Type', component: 'Component', sku: 'SKU', compatibility: 'Compatibility', weight: 'Weight', material: 'Material', materialValue: 'OEM Standard', condition: 'Condition', conditionValue: 'Brand New',
      },
      shippingText: 'We offer worldwide shipping through DHL, FedEx, and UPS. Orders placed before 2 PM EST are shipped the same day.',
      returnPolicyTitle: 'Return Policy',
      returnPolicyText: 'Returns are accepted within 30 days for defective parts. Parts must be in original condition with all protective films intact.',
      related: 'Related Components',
    },
    contact: {
      badge: 'Support', title: 'Get in Touch', subtitle: 'Have questions about a component or need technical support? Our expert team is ready to assist you.',
      success: { submitted: 'Your inquiry has been submitted successfully.' },
      errors: { submitFailed: 'Unable to submit your inquiry right now. Please try again shortly.' },
      hours: {
        title: 'Global Support Hours', weekdays: { label: 'Monday - Friday', value: '24 Hours' }, saturday: { label: 'Saturday', value: '10:00 - 16:00' }, sunday: { label: 'Sunday', value: 'Closed' },
      },
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
