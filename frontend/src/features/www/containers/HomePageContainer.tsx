import AppLogoDark from "@/features/brand/components/AppLogoDark";
import { BackgroundParticles } from "../components/BackgroundParticles";
import { Features } from "../components/Features";
import { HeroVideo } from "../components/HeroVideoDialog";
import Link from "next/link";
import { TextGenerateEffect } from "@/lib/shadcn/components/ui/text-generate-effect";
import { buttonVariants } from "@/lib/shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";

type Props = {};

const HomePageContainer = (props: Props) => {
    return (
        <main className="bg-black relative">
            <BackgroundParticles />
            <div className="flex z-10 relative flex-col h-fit bg-gradient-to-b from-purple-800/60 via-violet-800/20 to-violet-800/0">
                <div className="max-w-screen-lg w-full mx-auto">
                    <nav className="flex items-center justify-between py-4 px-4">
                        <AppLogoDark />

                        <Link
                            href="/jobs"
                            className={cn(buttonVariants({ variant: "ghost" }), "border border-neutral-300 text-neutral-300")}
                        >
                            Get Started
                        </Link>
                    </nav>

                    <section className="flex flex-col items-center gap-4  mt-24 px-4">
                        <TextGenerateEffect words={`Find AI curated tech jobs from Hackernews`} />

                        <p className="lg:text-lg lg:text-center leading-relaxed max-w-screen-md text-white/60 lg:text-white/90 tracking-tight">
                            Openhiring is a platform that helps you find the best tech jobs from Hackernews. We use AI to curate the best
                            jobs from Hackernews and recommend them to you.
                        </p>

                        <Link
                            href="/jobs"
                            className={cn(
                                buttonVariants({ variant: "default" }),
                                "w-48 mr-auto md:mr-0 bg-white text-black h-11 mt-6 hover:bg-white/90",
                            )}
                        >
                            Get Started
                        </Link>

                        <HeroVideo className="mt-16 rounded-lg max-w-screen-[1024px-48px]" />
                    </section>

                    <section className="flex flex-col items-center gap-4 mt-24 px-4">
                        <h2 className="text-4xl font-bold text-white tracking-tight">How it works</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 lg:mt-16 w-full">
                            <div className="flex gap-4 flex-col p-6">
                                <span className="text-4xl font-bold text-white/40 tracking-tight">1</span>
                                <span className="mt-4 text-xl text-white/90 font-semibold tracking-tight">
                                    Get Started by creating your account
                                </span>
                                <span className="text-white/40 tracking-tight">
                                    Sign up for free and start finding the best tech jobs from Hackernews.
                                </span>
                            </div>
                            <div className="flex gap-4 flex-col p-6 md:border-x border-white/10">
                                <span className="text-4xl font-bold text-white/40 tracking-tight">2</span>
                                <span className="mt-4 text-xl text-white/90 font-semibold tracking-tight">
                                    Filter & Browse through thousands of jobs
                                </span>
                                <span className="text-white/40 tracking-tight">
                                    Filter through thousands of jobs and find the best one for you.
                                </span>
                            </div>
                            <div className="flex gap-4 flex-col p-6">
                                <span className="text-4xl font-bold text-white/40 tracking-tight">3</span>
                                <span className="mt-4 text-xl text-white/90 font-semibold tracking-tight">
                                    Get recommended jobs based on your skills
                                </span>
                                <span className="text-white/40 tracking-tight">
                                    We use AI to recommend jobs based on your skills and interests.
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col items-center gap-4 mt-24 lg:mt-56 px-4">
                        <h2 className="text-4xl font-bold text-white tracking-tight">Features</h2>
                        <Features className="mt-10 lg:mt-16" />
                    </section>

                    <section className="flex flex-col items-center gap-4 mt-56 px-4">
                        <h2 className="text-4xl lg:text-5xl text-center font-bold text-white tracking-tight">
                            Bless your career with AI shortlisted jobs
                        </h2>
                        <Link href="/jobs" className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-48 h-11 mt-6")}>
                            Try Now
                        </Link>
                    </section>

                    <footer className="flex rounded-t-3xl py-12 items-center justify-between bg-purple-400/10 backdrop-blur-lg gap-4 mt-56 px-4">
                        <AppLogoDark />

                        <Link
                            href="mailto:visheshdubey.work@gmail.com"
                            className={cn(buttonVariants({ variant: "link" }), "text-white/50")}
                        >
                            Contact
                        </Link>
                    </footer>
                </div>
            </div>
        </main>
    );
};

export default HomePageContainer;
