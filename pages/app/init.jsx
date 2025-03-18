import Stepper, { Step } from "@/components/biteui/Stepper";
import SplitText from "@/components/biteui/SplitText";
import * as motion from "motion/react-client"
import Image from "next/image";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react";
//import { Toaster, toast } from "sonner";
import oasisStorage from '@/lib/storage';
import Avatar from 'boring-avatars';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
//import DecryptedText from "@/components/biteui/depcText";
//import { Button } from "@/components/ui/button";
//import "@/styles/shadcn.css"

const Init = () => {
  const router = useRouter()

  // Handle disable input the next and the step indicator
  const [step, setStep] = useState()
  const [name, setName] = useState('')
  const [gender, setGender] = useState(null)

  // disable button logic
  const [disableNext, setDisableNext] = useState(false)
  //const [confirmed, setConfirm] = useState(false);
  //const [confirmedText, setComfirmedText] = useState('Confirm')
  //const [confirmToComplete, setConfirmToComplete] = useState(false);
  const [disabledPrevBtn, setDisablePrevBtn] = useState(false);

  // confirmed name 
  const [confirmedName, setConfirmedName] = useState()

  /** 
  const createUser = async () => {
    try {
      await oasisStorage.set("username", name)
      await oasisStorage.set("gender", gender)
      toast.success('Profile saved successfully !')
      //setConfirmToComplete(true)
      setComfirmedText('Confirmed')
      setDisablePrevBtn(true)
      setConfirm(true)
      router.push('/app/home')
      //setDisableNext(false)
    } catch (error) {
      console.error(error)
      setConfirm(false)
      setComfirmedText('Confirm')
      toast.error('Profile unable to save !')
      setDisableNext(true)
    }
  }
  */
  useEffect(() => {
    if (step == 2 && name?.length < 1) {
      setDisableNext(true)
    } else if (step == 3 && gender == null) {
      setDisableNext(true)
    } //else if (step == 4) {
    //setDisableNext(true)
    //}
    else {
      setDisableNext(false)
    }
  }, [step, name, gender])

  useEffect(() => {
    const timer = setTimeout(() => {
      //oasisStorage.set('username', name)
      setConfirmedName(name);
    }, 500);

    return () => clearTimeout(timer)
  }, [name])

  /** 
  useEffect(() => {
    const genderData = '-'
    if (gender != null) {
      if (gender == '') {
        oasisStorage.set("gender", genderData)
      } else {
        oasisStorage.set("gender", gender)
      }
    }
  }, [gender])
  */

  return (

    <div className="flex justify-center items-center min-h-screen">
      {/*<Toaster richColors position="top-center" />*/}
      <Stepper
        disablePrevBtn={disabledPrevBtn}
        onStepChange={(step) => {
          setStep(step);
        }}
        onFinalStepCompleted={() => {
          oasisStorage.set("username", name)
          oasisStorage.set("gender", gender)
          //toast.success('Profile saved successfully !')
          //setConfirmToComplete(true)
          //setComfirmedText('Confirmed')
          //setDisablePrevBtn(true)
          //setConfirm(true)
          router.push('/app/home?event=success')
        }}
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
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-lime-300">Oasis</code> is a health tracking app specially designed for teenagers to help them maintain their healthy level. With the features like water intake tracking, BMI calculation and more.
          </p>
        </Step>
        <Step>
          <h2 className="text-xl font-semibold">Setup Profile</h2>
          <br />
          <Avatar
            name={confirmedName}
            //colors={["#d2fae2", "#e6f8b1", "#f6d5ad", "#f6b794", "#e59da0"]}
            colors={["#e6f8b1", "#BBF451", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
            //colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
            variant="beam"
            size={115} />
          <br />
          <h2>What is your <span className="text-lime-300">name</span> ?</h2>
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
          <h2>Please select your <span className="text-lime-300">gender</span>:</h2>
          <br />
          <div className="flex justify-center">
            {gender ? (
              (gender == 'Boy') ? (
                <>
                  <Image src={'.././boy.png'} width={120} height={120} alt="boy" />
                </>
              ) : (
                <>
                  <Image src={'.././girl.png'} width={120} height={120} alt="girl" />
                </>
              )
            ) : (
              <>
                <Avatar
                  name={name}
                  colors={["#e6f8b1", "#BBF451", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                  //colors={["#D2D996", "#BFC772", "#FF5F71", "#FF8BA6", "#FF8AA5"]}
                  variant="beam"
                  size={120} />
              </>
            )}
          </div>
          <br />
          <RadioGroup
            onValueChange={(value) => setGender(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem checked={gender === "Boy"} value="Boy" id="r1" />
              <Label htmlFor="r1">Boy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem checked={gender === "Girl"} value="Girl" id="r2" />
              <Label htmlFor="r2">Girl</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem checked={gender === ""} value={''} id="r3" />
              <Label htmlFor="r2">Rather not to say.</Label>
            </div>
          </RadioGroup>
          <br />
        </Step>
        <Step>
          <h2 className="text-xl font-semibold">All done !</h2>
          <p>Please <span className="text-lime-300">check</span> the details below and <span className="text-lime-300">confirm</span> if they are correct.</p>
          <br />
          <div className="border-2 border-lime-300 rounded-lg p-4  shadow-md dark:text-white text-black">
            Name: {name}
            <br />
            Gender: {gender || '-'}
          </div>
          <br />
          {/*<Button
            className={'duration-350 flex items-center justify-center rounded-full bg-[#bef264] py-1.5 px-3.5 font-medium tracking-tight text-black transition '}
            onClick={() => { createUser() }}
            disabled={confirmed}
          >
            {confirmedText}
          </Button>*/}
        </Step>
      </Stepper>
    </div>
  );
};

export default Init;
