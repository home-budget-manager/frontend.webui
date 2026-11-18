enum OperationType {
    Income = "Income",
    Expense = "Expense",
    Transfer = "Transfer"
}

interface TransactionDetailsPageProps {
    operationType: OperationType;
}

export default async function NewOperation({ params }: { params: Promise<TransactionDetailsPageProps> }) {
    const { operationType } = await params;
    return (
        <div>
            <h1>Creating transaction of type '{operationType}'</h1>
        </div>
    );
}