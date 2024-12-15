export default function WWWRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* <AppHeader className="sticky top-0 z-50" /> */}
            {children}
        </div>
    );
}
