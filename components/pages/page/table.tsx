import styles from "./table.module.css";

export default function Table({
    columns,
    rows,
}: {
    columns: string[];
    rows: React.ReactNode[][];
}) {
    return (
        <div className={styles.tableContainer}>
            <table>
                <thead>
                    <tr className="border-b border-border">
                        {columns.map((c, i) => (
                            <th key={c}>
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