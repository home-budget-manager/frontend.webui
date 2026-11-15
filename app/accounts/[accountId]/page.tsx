interface AccountDetailsPageProps {
    params: {
        accountId: string;
    };
}

export default async function AccountDetailsPage({ params }: AccountDetailsPageProps) {
    const { accountId } = await params;
    return (
        <div>
            <h1>Account {accountId}</h1>
        </div>
    );
}