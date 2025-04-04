import BackBtn from "@/components/Home/backBtn";
import Image from "next/image";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const HealthyTips = () => {
    return (
        <>
            <div className="container max-w-md mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold flex items-center justify-center">
                    <div className="mr-8">
                        <BackBtn />
                    </div>
                    <div className="inline-block">
                        <Image src={'.././Gem_Stone.png'} width={30} height={30} alt="healthy"></Image>
                    </div>
                    <span className="ml-2">Healthy tips</span>
                </h1>
                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />

                <div className="flex items-center justify-center">
                    <div className="inline-block">
                        <Image alt='HealthyTips' src='./../Zzz.png' width={30} height={30} className='mr-2 ' />
                    </div>
                    <span className='text-xl font-bold inline-block' id="ht-1">Getting Enough of Sleep</span>
                </div>
                <br />
                <PhotoProvider>
                    <PhotoView src="./../sleep.png">
                        <div className="flex justify-center  ">
                            <Image
                                alt="HealthyTips"
                                className="rounded-lg"
                                height="85"
                                src="./../sleep.png"
                                width="350"
                            />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <br />
                <ul className="list-none md:list-disc text-[15px] space-y-2">
                    <li className="">Sleep is essential for good health. It helps the body repair and maintaining our healthy immune system.</li>
                    <li className="">Suggested to avoid screens 1 hour before bed and sleep atleast 7-9 hours.</li>
                    <li className="">The room should be dark, quiet and comfortable in order to have quality sleep.</li>
                </ul>
                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />

                <div className="flex items-center justify-center">
                    <div className="inline-block">
                        <Image alt='HealthyTips' src='./../Laptop.png' width={30} height={30} className='mr-2 ' />
                    </div>
                    <span className='text-xl font-bold inline-block' id="ht-2">
                        Right amount of screen time
                    </span>
                </div>
                <br />
                <PhotoProvider>
                    <PhotoView src="./../st.png">
                        <div className="flex justify-center  ">
                            <Image
                                alt="HealthyTips"
                                className="rounded-lg"
                                height="85"
                                src="./../st.png"
                                width="350"
                            />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <br />
                <ul className="list-none md:list-disc text-[15px] space-y-2">
                    <li className="">Limit screen time to 1–2 hours at a time.</li>
                    <li className="">Keep screen about 50–70 cm from your eyes.</li>
                    <li className="">Avoid using screens in dark rooms.</li>
                </ul>
                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />

                <div className="flex items-center justify-center">
                    <div className="inline-block">
                        <Image alt='HealthyTips' src='./../Carrot.png' width={30} height={30} className='mr-2 ' />
                    </div>
                    <span className='text-xl font-bold inline-block' id="ht-3">
                        Eat Fruits & Vegetables
                    </span>
                </div>
                <br />
                <PhotoProvider>
                    <PhotoView src="./../efv.png">
                        <div className="flex justify-center  ">
                            <Image
                                alt="HealthyTips"
                                className="rounded-lg"
                                height="85"
                                src="./../efv.png"
                                width="350"
                            />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <br />
                <ul className="list-none md:list-disc text-[15px] space-y-2">
                    <li className="">Eating the right amount of vegetables and fruits can prevents chronic diseases.</li>
                    <li className="">For Instance, fruits are rich in vitamins like vitamin C, which can keep skin healthy.</li>
                </ul>
                <hr className="border-t my-4 border-gray-600 border-dashed overflow-visible relative" />

                <div className="flex items-center justify-center">
                    <div className="inline-block">
                        <Image alt='HealthyTips' src='./../Teacup_Without _Handle.png' width={30} height={30} className='mr-2 ' />
                    </div>
                    <span className='text-xl font-bold inline-block' id="ht-4">
                        Always Stay Hydrated
                    </span>
                </div>
                <br />
                <PhotoProvider>
                    <PhotoView src="./../hydrated.png">
                        <div className="flex justify-center  ">
                            <Image
                                alt="HealthyTips"
                                className="rounded-lg"
                                height="85"
                                src="./../hydrated.png"
                                width="350"
                            />
                        </div>
                    </PhotoView>
                </PhotoProvider>
                <br />
                <ul className="list-none md:list-disc text-[15px] space-y-2">
                    <li className="">Staying hydrated helps maintain proper body temperature, prevents overheating.</li>
                    <li className="">When hot weather, our body will sweats to cool down, leading to water loss. So we should always stay hydrated.</li>
                </ul>
            </div>
        </>
    )
}

export default HealthyTips;