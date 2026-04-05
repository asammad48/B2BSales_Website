import { ReceiptSnapshot } from "@/lib/receiptHistory";

type PrintableReceiptButtonProps = {
  receipt: ReceiptSnapshot;
  className?: string;
  label?: string;
  brandName?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function PrintableReceiptButton({
  receipt,
  className,
  label = "Print Receipt",
  brandName = "StoreFront Wholesale",
}: PrintableReceiptButtonProps) {
  const onPrint = () => {
    const printWindow = window.open("", "_blank", "width=960,height=720");
    if (!printWindow) {
      return;
    }

    const currency = receipt.currencySymbol || "";
    const itemsMarkup =
      receipt.items.length > 0
        ? receipt.items
            .map(
              (item) => `
              <tr>
                <td>${escapeHtml(item.productName)}</td>
                <td style="text-align:right;">${item.quantity}</td>
                <td style="text-align:right;">${currency}${item.unitPrice.toFixed(2)}</td>
                <td style="text-align:right;font-weight:700;">${currency}${item.subtotal.toFixed(2)}</td>
              </tr>
            `,
            )
            .join("")
        : `
            <tr>
              <td colspan="4">No item-level details are available for this order.</td>
            </tr>
          `;

    const receiptHtml = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Receipt ${escapeHtml(receipt.orderNumber)}</title>
          <style>
            :root {
              --ink: #0f172a;
              --muted: #64748b;
              --line: #e2e8f0;
              --surface: #f8fafc;
              --accent: #2563eb;
            }
            * { box-sizing: border-box; }
            body {
              font-family: Inter, "Segoe UI", Arial, sans-serif;
              color: var(--ink);
              background: #eef2ff;
              padding: 22px;
              margin: 0;
            }
            .sheet {
              max-width: 900px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid var(--line);
              border-radius: 16px;
              padding: 24px;
              box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
            }
            .header { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:16px; }
            .brand { display:flex; align-items:center; gap:12px; }
            .brand-logo {
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: grid;
              place-items: center;
              background: linear-gradient(135deg, #1d4ed8, #3b82f6);
              box-shadow: 0 10px 20px rgba(37, 99, 235, 0.24);
            }
            .brand-logo svg { width: 26px; height: 26px; color: white; }
            .brand-name { font-size: 16px; font-weight: 800; margin: 0; letter-spacing: .01em; }
            .receipt-label {
              margin: 2px 0 0;
              color: var(--muted);
              font-size: 11px;
              font-weight: 700;
              letter-spacing: .08em;
              text-transform: uppercase;
            }
            .title { font-size:28px; font-weight:900; margin: 2px 0 4px; }
            .order-number { font-size:13px; color:var(--muted); margin:0; font-weight: 600; }
            .meta {
              font-size:12px;
              color:var(--muted);
              line-height:1.75;
              text-align:right;
              padding: 10px 14px;
              border: 1px solid var(--line);
              border-radius: 12px;
              background: var(--surface);
            }
            .section-title {
              margin:20px 0 10px;
              font-size:11px;
              letter-spacing:.1em;
              text-transform:uppercase;
              color:var(--muted);
              font-weight:800;
            }
            .instructions {
              border:1px solid var(--line);
              border-radius:12px;
              padding:12px 14px;
              font-size:13px;
              background: var(--surface);
              color: #1e293b;
            }
            table {
              width:100%;
              border-collapse:separate;
              border-spacing:0;
              border: 1px solid var(--line);
              border-radius: 12px;
              overflow: hidden;
            }
            th, td {
              border-bottom:1px solid var(--line);
              padding:11px 10px;
              font-size:13px;
            }
            tr:last-child td { border-bottom: none; }
            th {
              text-align:left;
              font-size:11px;
              color:var(--muted);
              text-transform:uppercase;
              letter-spacing:.09em;
              background: var(--surface);
              font-weight: 800;
            }
            .totals {
              margin-top:18px;
              width:320px;
              margin-left:auto;
              border: 1px solid var(--line);
              border-radius: 12px;
              padding: 10px 14px;
              background: #ffffff;
            }
            .totals-row {
              display:flex;
              justify-content:space-between;
              font-size:13px;
              padding:5px 0;
            }
            .totals-row.total {
              font-size:20px;
              font-weight:900;
              border-top:1px dashed #94a3b8;
              margin-top:8px;
              padding-top:10px;
              color: var(--accent);
            }
            .footer {
              margin-top:16px;
              padding-top: 12px;
              border-top: 1px solid var(--line);
              font-size:11px;
              color:var(--muted);
              display: flex;
              justify-content: space-between;
              gap: 12px;
            }
            @media print {
              body { background: white; padding: 0; }
              .sheet {
                border: none;
                border-radius: 0;
                box-shadow: none;
                max-width: none;
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="sheet">
            <div class="header">
              <div>
                <div class="brand">
                  <div class="brand-logo" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M4 8.5L12 4L20 8.5L12 13L4 8.5Z" fill="currentColor"/>
                      <path d="M4 12L12 16.5L20 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4 15.5L12 20L20 15.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p class="brand-name">${escapeHtml(brandName)}</p>
                    <p class="receipt-label">Official Receipt</p>
                  </div>
                </div>
                <h1 class="title">Order Receipt</h1>
                <p class="order-number">Order #${escapeHtml(receipt.orderNumber)}</p>
              </div>
              <div class="meta">
                <div>Date: ${new Date(receipt.createdAt).toLocaleString()}</div>
                <div>Pickup Shop: ${escapeHtml(receipt.shopName || "N/A")}</div>
              </div>
            </div>

            <div>
              <div class="section-title">Instructions</div>
              <div class="instructions">${escapeHtml(
                receipt.instructions?.trim() || "No additional instructions provided.",
              )}</div>
            </div>

            <div class="section-title">Products</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th style="text-align:right;">Qty</th>
                  <th style="text-align:right;">Unit Price</th>
                  <th style="text-align:right;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${itemsMarkup}
              </tbody>
            </table>

            <div class="totals">
              <div class="totals-row">
                <span>Subtotal</span>
                <span>${currency}${receipt.subtotal.toFixed(2)}</span>
              </div>
              <div class="totals-row total">
                <span>Total</span>
                <span>${currency}${receipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div class="footer">
              <span>Thank you for your order.</span>
              <span>Generated by ${escapeHtml(brandName)}</span>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  };

  return (
    <button type="button" onClick={onPrint} className={className}>
      {label}
    </button>
  );
}
