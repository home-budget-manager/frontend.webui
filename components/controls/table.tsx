import styles from "./table.module.css";

export interface TableProps {
    columns: string[];
    rows: React.ReactNode[][];
    customClass?: string;
}

export default function Table({ columns, rows, customClass }: TableProps) {
    const effectiveClassName = styles.tableContainer + ' ' + (customClass ? customClass : "");
    return (
        <div className={effectiveClassName}>
            <table>
                <thead>
                    <tr className="border-b border-border">
                        {columns.map((c, i) => (
                            <th key={i}>
                                {c}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri}>
                            {row.map((cell, ci) => (
                                <td key={ci}>
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