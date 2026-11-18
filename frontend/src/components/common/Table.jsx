import React from 'react';

export default function Table({
  columns = [],
  data = [],
  keyField = 'id',
  onRowClick,
  emptyMessage = 'No records found matching current criteria.',
  className = '',
}) {
  return (
    <div className={`w-full overflow-x-auto border border-border-subtle rounded-md bg-surface-white ${className}`}>
      <table className="w-full text-left border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-border-subtle bg-surface-subtle/80 text-muted font-medium text-xs">
            {columns.map((col, idx) => (
              <th
                key={col.key || idx}
                className={`py-2.5 px-4 font-semibold tracking-wider uppercase text-[11px] ${
                  col.align === 'right'
                    ? 'text-right'
                    : col.align === 'center'
                    ? 'text-center'
                    : 'text-left'
                } ${col.headerClassName || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle/60">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-muted text-xs font-normal"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={row[keyField] || rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={`transition-colors duration-100 ${
                  onRowClick
                    ? 'cursor-pointer hover:bg-blue-50/40'
                    : 'hover:bg-surface-soft/40'
                }`}
              >
                {columns.map((col, colIndex) => {
                  const val = row[col.accessor || col.key];
                  return (
                    <td
                      key={col.key || colIndex}
                      className={`py-3 px-4 ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      } ${col.cellClassName || ''}`}
                    >
                      {col.render ? col.render(val, row, rowIndex) : val}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

