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
      features: {
        qualityTitle: 'Verified Quality', qualityDesc: 'Every part undergoes a 20-point inspection process before shipping.',
        shippingTitle: 'Global Shipping', shippingDesc: 'Express delivery to over 150 countries with real-time tracking.',
        quotesTitle: 'Instant Quotes', quotesDesc: 'Dynamic wholesale pricing based on your order volume and loyalty.',
      },
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
      features: {
        qualityTitle: 'Geprüfte Qualität', qualityDesc: 'Jedes Teil durchläuft vor dem Versand einen 20-Punkte-Qualitätscheck.',
        shippingTitle: 'Weltweiter Versand', shippingDesc: 'Expresslieferung in über 150 Länder mit Echtzeit-Tracking.',
        quotesTitle: 'Sofortige Angebote', quotesDesc: 'Dynamische Großhandelspreise basierend auf Volumen und Loyalität.',
      },
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
      features: {
        qualityTitle: 'Qualité vérifiée', qualityDesc: 'Chaque pièce suit un contrôle en 20 points avant expédition.',
        shippingTitle: 'Livraison mondiale', shippingDesc: 'Livraison express dans plus de 150 pays avec suivi en temps réel.',
        quotesTitle: 'Devis instantanés', quotesDesc: 'Tarification grossiste dynamique selon le volume et la fidélité.',
      },
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
