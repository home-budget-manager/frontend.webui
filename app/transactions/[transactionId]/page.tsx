interface TransactionDetailsPageProps {
    params: {
        transactionId: string;
    };
}

export default async function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
    const { transactionId } = await params;
    return (
        <div>
            <h1>Transaction {transactionId}</h1>
        </div>
    );
}