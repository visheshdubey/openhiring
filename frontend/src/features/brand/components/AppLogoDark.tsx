import Image from "next/image";
import Link from "next/link";
import { Routes } from "@/lib/configs";

type Props = {};

const AppLogo = (props: Props) => {
    return (
        <Link href={Routes.home} className="flex items-center gap-2 ">
            <Image src={"/assets/openhiring-logo-dark.png"} alt="Openhiring" width={120} height={46} />
        </Link>
    );
};

export default AppLogo;
