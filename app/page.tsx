import { Button } from "@/components/ui/button";
import SparklesIcon from "@/libs/assets/icons/sparkle-icon";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 justify-between items-center h-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center flex-1 ">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 bg-green-200  rounded-3xl w-fit px-4 py-1 mb-8">
            <SparklesIcon />
            <p>NEW: AI-Powered Seat Optimization</p>
          </div>
          <div className="mb-8">
            <h1 className="mb-4 text-5xl font-bold leading-[60px]">Stop overpaying for your
              SaaS stack.</h1>
            <p className="text-gray-secondary text-md">Credex helps finance teams slash SaaS costs by identifying wasted spend.</p>
          </div>
          <div>
            <Link href="/audit">
              <Button className="h-14 w-40 rounded-sm">Start Your Audit</Button></Link>
          </div>
        </div>
        <div>
          <Image src="/assets/images/heroImage.png" alt="hero Image" width={600} height={600} />
        </div>
      </div>
    </div>
  );
}
