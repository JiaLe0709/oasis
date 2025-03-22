import Image from "next/image";
import { useRouter } from "next/router";
import * as motion from "motion/react-client"

const gridItems = [
  {
    icon: 'Balance.png',
    title: "BMI Calculator",
    desc: "BMI measures body fat using weight and height to evaluate health risk levels.",
    path: "/app/bmi"
  },
  {
    icon: 'Teacup_Without _Handle.png',
    title: "Water Tracker",
    desc: "Water Tracker can ensure that a teenager's daily water intake is sufficient.",
    path: "/app/water_tracker"
  },
];

export default function AppGridLayout() {
  const router = useRouter();

  return (
    <div>
      <h3 className="flex items-center mt-8 mb-4 font-semibold text-2xl">
        <span className="flex-1">
          <div className="inline-block">
            <motion.div
              animate={{
                scale: [1, 1.25, 1.25, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["0%", "0%", "25%", "25%", "0%"],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              <Image src={'.././Wrench.png'} width={20} height={20} alt="Tools"></Image>
            </motion.div>
          </div>
          {"  "}Tools
        </span>
      </h3>
      <div className="space-y-4">
        {gridItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            // def white f8f9fb f4f4f5
            className="w-full rounded-lg p-4 bg-[#F4F4F5] dark:bg-[#101112] dark:hover:bg-[#1F2123] hover:bg-[#f2f4f7] text-black dark:text-white transition-transform hover:scale-105 cursor-pointer"
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
