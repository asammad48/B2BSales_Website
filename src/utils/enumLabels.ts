import { PricingMode, QualityType, TrackingType } from '@/api/generated/apiClient';
import { getTranslation, type SupportedLanguage } from '@/i18n/translations';

/**
 * Centralized display labels for backend-generated enum types.
 * This prevents enum drift and ensures consistent labeling across the application.
 */

function getLanguage(): SupportedLanguage {
  const language = localStorage.getItem('app_language') as SupportedLanguage | null;
  return language === 'de' || language === 'fr' ? language : 'en';
}

const tEnum = (key: string, fallback: string): string => {
  return getTranslation(getLanguage(), key) || getTranslation('en', key) || fallback;
};

export const pricingModeLabels: Record<PricingMode, string> = {
  Direct: tEnum('enum.pricingMode.direct', 'Direct Price'),
  PercentageBased: tEnum('enum.pricingMode.percentageBased', 'Percentage Based'),
};

export const qualityTypeLabels: Record<QualityType, string> = {
  Original: tEnum('enum.qualityType.original', 'Original'),
  Oem: tEnum('enum.qualityType.oem', 'OEM'),
  Compatible: tEnum('enum.qualityType.compatible', 'Compatible'),
  Deji: tEnum('enum.qualityType.deji', 'Deji'),
  Desconocido: tEnum('enum.qualityType.desconocido', 'Unknown'),
  OriginalDesmontaje: tEnum('enum.qualityType.originalDesmontaje', 'Original Dismantled'),
  ServicePack: tEnum('enum.qualityType.servicePack', 'Service Pack'),
};

export const trackingTypeLabels: Record<TrackingType, string> = {
  PorCantidad: tEnum('enum.trackingType.quantityBased', 'Quantity Based'),
  Serializado: tEnum('enum.trackingType.serialized', 'Serialized'),
};

/**
 * Helper to get a label safely, with a fallback to the raw value.
 */
export function getEnumLabel<T extends string>(value: T | undefined, mapping: Record<T, string>): string {
  if (!value) return getTranslation(getLanguage(), 'common.na') || 'N/A';
  return mapping[value] || value;
}
