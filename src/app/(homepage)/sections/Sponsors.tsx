import Skillcetera from '@/app/(homepage)/images/sponsors/Skillcetera.png';
import TEDx from '@/app/(homepage)/images/sponsors/TEDx.png';
import DecorEvents from '@/app/(homepage)/images/sponsors/DecorEvents.jpg';
import FPTCooking from '@/app/(homepage)/images/sponsors/FPTCooking.jpg';
import GreenCross from '@/app/(homepage)/images/sponsors/GreenCross.png';
import Koikeya from '@/app/(homepage)/images/sponsors/Koikeya.jpg';
import MrBrown from '@/app/(homepage)/images/sponsors/MrBrown.png';
import PP from '@/app/(homepage)/images/sponsors/P&P.jpg';
import sapuwa from '@/app/(homepage)/images/sponsors/sapuwa.png';
import levents from '@/app/(homepage)/images/sponsors/levents.png';
import glowparty from '@/app/(homepage)/images/sponsors/glowparty.png';
import dol from '@/app/(homepage)/images/sponsors/dol.png';

import Image from 'next/image';

export default function Sponsors() {
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">A TEDx event sponsored by</h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={Skillcetera}
                        alt="Transistor"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={TEDx}
                        alt="Reform"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={DecorEvents}
                        alt="Tuple"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={FPTCooking}
                        alt="SavvyCal"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={GreenCross}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={Koikeya}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={MrBrown}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={PP}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={sapuwa}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={levents}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={glowparty}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                    <Image
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src={dol}
                        alt="Statamic"
                        width={158}
                        height={48}
                    />
                </div>
            </div>
        </section>
    );
}
