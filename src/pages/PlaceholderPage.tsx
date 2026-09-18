export default function PlaceholderPage({ title }: { title: string }) {
    return (
        <div className="p-8 h-full flex flex-col items-center justify-center text-muted-foreground">
            <div className="bg-secondary/30 border border-border rounded-xl p-12 text-center max-w-lg w-full">
                <h2 className="text-2xl font-semibold text-foreground mb-4">{title}</h2>
                <p className="text-sm">This page is under construction for the Phase 1 Demo.</p>
            </div>
        </div>
    );
}
