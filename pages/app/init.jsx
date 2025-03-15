import Stepper, { Step } from "@/components/biteui/Stepper";
import SplitText from "@/components/biteui/SplitText";
import * as motion from "motion/react-client"
import Image from "next/image";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import oasisStorage from '@/lib/storage';
import Avatar from 'boring-avatars';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import DecryptedText from "@/components/biteui/depcText";
import { Button } from "@/components/ui/button";
//import "@/styles/shadcn.css"

const Init = () => {
  const router = useRouter()

  // Handle disable input the next and the step indicator
  const [step, setStep] = useState()
  const [name, setName] = useState('')
  const [gender, setGender] = useState(null)

  // disable button logic
  const [disableNext, setDisableNext] = useState(false)
  const [confirmed, setConfirm] = useState(false);
  const [confirmedText, setComfirmedText] = useState('Confirm')
  const [confirmToComplete, setConfirmToComplete] = useState(false);

  const createUser = async () => {
    try {
      await oasisStorage.set('username', name);
      await oasisStorage.set("gender", gender)
      toast.success('Profile saved successfully !')
      setConfirmToComplete(true)
      setComfirmedText('Confirmed')
      setConfirm(true)
      setConfirmToComplete(true)
      setDisableNext(false)
    } catch (error) {
      console.error(error)
      setConfirm(false)
      setComfirmedText('Confirm')
      toast.error('Profile unable to save !')
      setDisableNext(true)
    }
  }

  useEffect(() => {
    if (step == 2 && name?.length < 1) {
      setDisableNext(true)
    } else if (step == 3 && gender == null) {
      setDisableNext(true)
    } else if (step == 4 && confirmToComplete !== true) {
      setDisableNext(true)
    }
    else {
      setDisableNext(false)
    }
  }, [step, name, gender, confirmToComplete])

  return (

    <div className="flex justify-center items-center min-h-screen">
      <Toaster richColors position="top-center" />
      <Stepper
        onStepChange={(step) => {
          setStep(step);
        }}
        onFinalStepCompleted={() => { router.push('/app/home') }}
        initialStep={1}
        backButtonText="Previous"
        nextButtonText="Next"
        disableStepIndicators={disableNext}
      >
        <Step>
          <div className="flex items-center space-x-2">
            <SplitText
              text="Welcome to the Oasis !"
              className="text-xl font-semibold"
              delay={20}
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              easing="easeOutCubic"
              threshold={0.2}
              rootMargin="-50px"
            />
            <div className="inline-block">
              <Image src={'.././camel.png'} width={30} height={30} alt="camel"></Image>
            </div>
          </div>
          <br />
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Image src={'.././icon.png'} width={100} height={100} alt="oasis"></Image>
            </motion.div>
          </div>
          <br />
          <p>
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">Oasis</code> is a health tracking app specially designed for teenagers to help them maintain their healthy level. With the features like water intake tracking, BMI calculation and more.
          </p>
        </Step>
        <Step>
          <h2 className="text-xl">Setup Profile</h2>
          <br />
          <Avatar name={name} colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]} variant="beam" size={115} />
          <br />
          <h2>What is your name ?</h2>
          <br />
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name?"
            required
            variant="secondary"
          />
          <br />
        </Step>
        <Step>
          <h2>Please select your gender:</h2>
          <br />
          {gender ? (
            (gender == 'Boy') ? (
              <>
                <Image src={'.././boy.svg'} width={100} height={100} alt="boy" />
              </>
            ) : (
              <>
                <Image src={'.././girl.svg'} width={100} height={100} alt="girl" />
              </>
            )
          ) : (
            <>
              <Avatar name={name} colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]} variant="beam" size={115} />
            </>
          )}
          <br />
          <RadioGroup
            onValueChange={(value) => setGender(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Boy" id="r1" />
              <Label htmlFor="r1">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Girl" id="r2" />
              <Label htmlFor="r2">Girl</Label>
            </div>
          </RadioGroup>
          <br />
        </Step>
        <Step>
          <h2 className="text-xl">Final Step</h2>
          <p>Please check the details below and confirm if they are correct.</p>
          <br />
          <div className="border-2 border-gray-500 rounded-lg p-4  shadow-md dark:text-white text-black">
            <DecryptedText
              text={`Name: ${name}\nGender: ${gender}`}
              animateOn="view"
              revealDirection="center"
              speed={100}
            />
          </div>
          <br />
          <Button
            className={'duration-350 flex items-center justify-center rounded-full bg-[#00D8FF] py-1.5 px-3.5 font-medium tracking-tight text-black transition '}
            onClick={() => { createUser() }}
            disabled={confirmed}
          >
            {confirmedText}
          </Button>
        </Step>
      </Stepper>
    </div>
  );
};

export default Init;
