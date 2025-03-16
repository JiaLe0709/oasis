import Image from "next/image";
import { useRouter } from "next/router";

const gridItems = [
  {
    icon: 'Balance.png',
    title: "BMI Calculator",
    desc: "BMI measures body fat using weight and height to evaluate health risk levels.",
    path: "/app/bmi"
  },
];

export default function AppGridLayout() {
  const router = useRouter();

  return (
    <div>
      <h3 className="flex items-center mt-8 mb-4 font-semibold text-2xl">
        <span className="flex-1">
          <div className="inline-block">
            <Image src={'.././Wrench.png'} width={20} height={20} alt="Tools"></Image>
          </div>
          {" "}Tools
        </span>
      </h3>
      <div className="space-y-4">
        {gridItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className="w-full rounded-lg p-4 bg-[#F8F9FB] dark:bg-[#101112] dark:hover:bg-[#1F2123] hover:bg-[#F4F4F5] text-black dark:text-white transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <Image src={`.././${item.icon}`} width={30} height={30} alt={item.title} />
              <div className="flex flex-col w-full">
                <span className="text-xl font-semibold">{item.title}</span>
                <p className="text-sm leading-relaxed w-full">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
