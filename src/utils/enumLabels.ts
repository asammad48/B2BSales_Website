import { PricingMode, QualityType, TrackingType } from '@/api/generated/apiClient';

/**
 * Centralized display labels for backend-generated enum types.
 * This prevents enum drift and ensures consistent labeling across the application.
 */

export const pricingModeLabels: Record<PricingMode, string> = {
  Direct: 'Direct Price',
  PercentageBased: 'Percentage Based',
};

export const qualityTypeLabels: Record<QualityType, string> = {
  Original: 'Original',
  OEM: 'OEM',
  HighCopy: 'High Copy',
  Refurbished: 'Refurbished',
};

export const trackingTypeLabels: Record<TrackingType, string> = {
  QuantityBased: 'Quantity Based',
  Serialized: 'Serialized',
};

/**
 * Helper to get a label safely, with a fallback to the raw value.
 */
export function getEnumLabel<T extends string>(value: T | undefined, mapping: Record<T, string>): string {
  if (!value) return 'N/A';
  return mapping[value] || value;
}
