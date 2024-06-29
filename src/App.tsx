import { Button } from "@nextui-org/button";

import amHappy from "/assets/am-happy.gif";
import bearKisses from "/assets/bear-kiss-bear-kisses.gif";
import bubuBubbu from "/assets/bubu-bubbu.gif";
import bubuDuduFlower from "/assets/bubu-dudu-flower-gift.gif";
import toojiBubu from "/assets/tooji-bubududu.gif";
import peachGoma from "/assets/peach-goma.gif";
import tktBubu from "/assets/tkthao219-bubududu.gif";
import tktBubu2 from "/assets/tkthao219-bubududu (1).gif";
import canwebubu from "/assets/canwebubu.gif";
import hasherHappy from "/assets/hasher-happy-sticker.gif";

import { useEffect, useState } from "react";
import { MotionConfig, motion, useAnimationControls } from "framer-motion";

function getMod(num: number) {
    return Math.abs(num % 2);
}

const getRandomNumber = (min: number, max: number) => {
    return Math.round(Math.random() * (max - min) + min);
};

const NegativeState = [
    [toojiBubu, "Please🥺"],
    [tktBubu, "Whyy not??"],
];

const States = [
    [peachGoma, "Hi, Allysa Mariee🦋"],
    [bubuBubbu, "Good Eveningg!!"],
    [amHappy, "Ahmm... I love you!! 🌷"],
    [bubuDuduFlower, "Do you love me too?"],
    [tktBubu2, "Really?!"],
    [bearKisses, "Mwuaahh!!"],
    [canwebubu, "Can we watch Movie Together??"],
    [hasherHappy, "Yeeyyyy, Looking forward💕"],
];

export default function App() {
    const [pageState, setState] = useState(0);
    const [noCount, setNoCount] = useState(0);

    const NoBtnAnimation = useAnimationControls();
    const OkayBtnAnimation = useAnimationControls();

    useEffect(() => {
        if (noCount > 0) {
            NoBtnAnimation.start({
                x: getRandomNumber(-150, 150),
                y: getRandomNumber(-250, 200),
            });
            OkayBtnAnimation.start({
                scale: 1 + noCount * 0.1,
            });
        } else {
            NoBtnAnimation.set({
                x: 0,
                y: 0,
            });
            OkayBtnAnimation.set({
                scale: 1,
            });
        }
    }, [noCount]);

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="max-w-[250px] w-full flex flex-col text-2xl text-center">
                <img
                    className=""
                    src={
                        pageState >= 0
                            ? States[pageState][0]
                            : NegativeState[getMod(pageState)][0]
                    }
                    alt="happy"
                />
                <div className="border-[3px] border-b-0 p-5">
                    <span>
                        {pageState >= 0
                            ? States[pageState][1]
                            : NegativeState[getMod(pageState)][1]}
                    </span>
                </div>
                <br />
                <div>
                    {pageState >= 0 ? (
                        pageState > 2 ? (
                            pageState < 7 && (
                                <div className="flex justify-evenly">
                                    <Button
                                        onClick={() => {
                                            setState((prev) => prev * -1);
                                        }}
                                    >
                                        No
                                    </Button>
                                    <Button
                                        color="success"
                                        onClick={() => {
                                            setState((prev) => prev + 1);
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </div>
                            )
                        ) : (
                            <Button
                                onClick={() => {
                                    setState((prev) => prev + 1);
                                }}
                            >
                                Next
                            </Button>
                        )
                    ) : (
                        <div className="relative flex justify-evenly">
                            <MotionConfig
                                transition={{
                                    duration: 0.05,
                                    ease: "anticipate",
                                }}
                            >
                                <motion.div
                                    initial={{
                                        x: 0,
                                        y: 0,
                                    }}
                                    animate={NoBtnAnimation}
                                >
                                    <Button
                                        onTouchStart={() => {
                                            setNoCount((prev) => prev + 1);
                                        }}
                                    >
                                        No
                                    </Button>
                                </motion.div>
                                <motion.div
                                    initial={{
                                        scale: 1,
                                    }}
                                    animate={OkayBtnAnimation}
                                >
                                    <Button
                                        onClick={() => {
                                            setState((prev) => Math.abs(prev));
                                        }}
                                    >
                                        Yes
                                    </Button>
                                </motion.div>
                            </MotionConfig>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
