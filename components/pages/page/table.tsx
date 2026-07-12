export default function Table({
    columns,
    rows,
}: {
    columns: string[];
    rows: React.ReactNode[][];
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b border-border">
                        {columns.map((c, i) => (
                            <th
                                key={c}
                                className={`pb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${i === columns.length - 1 ? "text-right" : "text-left"
                                    }`}
                            >
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-border/60 last:border-0">
                            {row.map((cell, ci) => (
                                <td
                                    key={ci}
                                    className={`py-3 pr-4 last:pr-0 ${ci === row.length - 1 ? "text-right" : ""
                                        }`}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}