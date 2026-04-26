export function DataGrid({ minWidth, children }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-navy/[0.05] bg-white shadow-sm">
      <div className="overflow-x-auto overflow-y-hidden">
        <div style={{ minWidth }}>{children}</div>
      </div>
    </div>
  );
}

export function DataGridHeader({ columnsTemplate, children }) {
  return (
    <div
      className="items-center gap-3 border-b border-navy/[0.05] bg-surface/70 px-5 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/40"
      style={{ display: "grid", gridTemplateColumns: columnsTemplate }}
    >
      {children}
    </div>
  );
}

export function DataGridRow({ columnsTemplate, children, className = "" }) {
  return (
    <div
      className={`items-center gap-3 border-b border-navy/[0.05] px-5 py-4 text-sm text-navy last:border-b-0 ${className}`}
      style={{ display: "grid", gridTemplateColumns: columnsTemplate }}
    >
      {children}
    </div>
  );
}
