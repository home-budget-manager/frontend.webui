interface UnderConstructionPageProps {
    params: {
        id: string;
    };
}

export default async function UnderConstructionPage({ params }: UnderConstructionPageProps) {
    const { id } = await params
    return (
        <div>
            <h1>Under Construction</h1>
            <p>This page with ID {id} is currently under construction.</p>
        </div>
    );
}