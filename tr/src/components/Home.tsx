import { useEffect, useState } from "react"

export default function Home() {
    const [isRunning, setIsRunning] = useState(false);

    const [counter, setCounter] = useState(0);
    const [min, setMin] = useState(0);
    const [ore, setOre] = useState(0);

    const [isTimer, setIsTimer] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isTimerExist, setIsTimerExist] = useState(false);

    const [output, setOutput] = useState("");

    const [speed, setSpeed] = useState(1000);

    useEffect(() => {
        if (!isTimer || !isRunning) return;
        
        if (speed == 500) {
            setOutput("Timer in corso a velocità X2");
        } else if (speed == 1000) {
            setOutput("Timer in corso a velocità X1");
        } else {
            setOutput("Timer in corso a velocità X0.5");
        }

        if (!isTimerExist) {
            if (timer >= 60) {
                setOre(Math.floor(timer/60))
                setMin(timer%60);
                setCounter(0);
            } else {
                setMin(timer);
                setCounter(0);
            }
            setIsTimerExist(true);
        }

        if (speed == 500) {
            setOutput("Timer in corso a velocità X2");
        } else if (speed == 1000) {
            setOutput("Timer in corso a velocità X1");
        } else {
            setOutput("Timer in corso a velocità X0.5");
        }

        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev > 0) return prev - 1;

                setMin(prevMin => {
                    if (prevMin > 0) return prevMin - 1;

                    setOre(prevOre => {
                        if (prevOre > 0) return prevOre - 1;

                        if (prevOre == 0 && prevMin == 0 && prev == 0) {
                            setIsRunning(false);
                            resetAll();
                            return 0;
                        }

                        clearInterval(interval);
                        return 0;
                    })

                    return 59;
                })

                return 59;
            })
        }, speed);

        return () => clearInterval(interval);
    }, [isTimer, speed, isRunning]);

    useEffect(() => {
        if (!isRunning) {
            setOutput("Stoppato!");
            return;
        };

        if (isTimer) {
            return;
        }

        if (speed == 500) {
            setOutput("Timer in corso a velocità X2");
        } else if (speed == 1000) {
            setOutput("Timer in corso a velocità X1");
        } else {
            setOutput("Timer in corso a velocità X0.5");
        }

        const interval = setInterval(() => {
            setCounter(prev => {
                if (prev < 59) return prev + 1;

                setMin(prevMin => {
                    if (prevMin < 59) return prevMin + 1;

                    setOre(prevOre => {
                        if (prevOre < 99) return prevOre + 1;

                        if (prevOre == 99 && prevMin == 59 && prev == 59) {
                            setIsRunning(false);
                            resetAll();
                            return 0;
                        }

                        clearInterval(interval);
                        return 0;
                    })

                    return 0;
                })

                return 0;
            })
        }, speed);

        return () => clearInterval(interval);
    }, [isRunning, speed, isTimer]);

    function resetAll() {
        setCounter(0);
        setMin(0);
        setOre(0);
        setSpeed(1000);
        setIsTimer(false);
        setIsRunning(false);
        setOutput("Timer azzerato");
        setIsTimerExist(false);
    }

    function startTimer() {
        setIsTimer(true);
        setIsRunning(true);
    }

    return (
        <>
            <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                <h1 className="p-[20px] text-[50px]">{ore < 10 ? "0" + ore : ore}:{min < 10 ? "0" + min : min}:{counter < 10 ? "0" + counter : counter}</h1>
                <p className="text-[12px] mt-[-20px] mb-[20px]">{output}</p>
                <div className="flex flex-wrap w-[100%] justify-center items-center">
                    <div className="flex flex-col">
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${isRunning ? "bg-red-600" : "bg-black"}`}  onClick={() => setIsRunning(true)}>START</button>
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${!isRunning ? "bg-red-600" : "bg-black"}`} onClick={() => setIsRunning(false)}>STOP</button>
                        <button className="w-[200px] bg-black text-white p-[10px] m-[10px] border border-none rounded-[10px]" onClick={() => resetAll()}>RESET</button>
                    </div>
                    <div className="flex flex-col">
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${speed === 2000 ? "bg-blue-600" : "bg-black"}`} onClick={() => setSpeed(2000)}>0.5x</button>
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${speed === 1000 ? "bg-blue-600" : "bg-black"}`} onClick={() => setSpeed(1000)}>1x</button>
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${speed === 500 ? "bg-blue-600" : "bg-black"}`} onClick={() => setSpeed(500)}>2x</button>
                    </div>
                    <div className="flex flex-col">
                        <input type="number" placeholder="Inserire min" value={timer} className="w-[200px] border border-black rounded-[10px] p-[10px] m-[10px]" onChange={(e) => setTimer(Number(e.target.value))}></input>
                        <button className={`w-[200px] p-[10px] m-[10px] rounded-[10px] text-white ${isTimer ? "bg-purple-600" : "bg-black"}`}  onClick={startTimer}>RUN TIMER</button>
                    </div>
                </div>
            </div>
        </>
    )
}