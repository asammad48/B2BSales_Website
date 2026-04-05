export type ReceiptLineItem = {
  productId?: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

export type ReceiptSnapshot = {
  orderNumber: string;
  createdAt: string;
  shopName?: string;
  instructions?: string;
  currencySymbol?: string;
  subtotal: number;
  total: number;
  items: ReceiptLineItem[];
};

const STORAGE_KEY = "client_receipt_history_v1";
const MAX_RECEIPTS = 40;

function readSnapshots(): ReceiptSnapshot[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((entry): entry is ReceiptSnapshot => {
      return (
        entry &&
        typeof entry.orderNumber === "string" &&
        Array.isArray(entry.items)
      );
    });
  } catch {
    return [];
  }
}

function writeSnapshots(snapshots: ReceiptSnapshot[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
  } catch {
    // Ignore storage write errors in privacy-restricted contexts.
  }
}

export function saveReceiptSnapshot(snapshot: ReceiptSnapshot) {
  const existing = readSnapshots().filter(
    (entry) => entry.orderNumber !== snapshot.orderNumber,
  );
  const updated = [snapshot, ...existing].slice(0, MAX_RECEIPTS);
  writeSnapshots(updated);
}

export function getReceiptSnapshot(orderNumber?: string | null) {
  if (!orderNumber) {
    return null;
  }

  return (
    readSnapshots().find((entry) => entry.orderNumber === orderNumber) ?? null
  );
}
