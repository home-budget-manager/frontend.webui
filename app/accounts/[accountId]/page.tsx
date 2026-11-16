interface AccountDetailsPageProps {
    accountId: string;
}

export default async function AccountDetailsPage({ params }: { params: Promise<AccountDetailsPageProps> }) {
    const { accountId } = await params;
    return (
        <div>
            <h1>Account {accountId}</h1>
        </div>
    );
}