export default function Widget({
    title,
    children,
    className = "",
}: {
    title: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-xl border border-border bg-card p-5 ${className}`}
            style={{ boxShadow: "var(--shadow-sm)" }}
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold tracking-tight">{title}</h2>
                <a href="#" className="text-xs font-medium text-primary hover:underline">
                    View all
                </a>
            </div>
            {children}
        </section>
    );
}
