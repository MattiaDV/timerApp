import { useEffect, useState } from "react"
import type { lapProps } from "../types/lapProps";

export default function Home() {
    const [isRunning, setIsRunning] = useState(false);

    const [counter, setCounter] = useState(0);
    const [min, setMin] = useState(0);
    const [ore, setOre] = useState(0);
    const [laps, setLaps] = useState<lapProps[]>([]);

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

    function lapSetter() {
        if (isRunning) {
            const lap = {ore: ore, min: min, sec: counter};
            setLaps(prev => [
                ...prev,
                lap
            ]);
        }
    }

    return (
        <>
            <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-950 px-4 py-10 gap-8">

                {/* Clock */}
                <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
                <svg className="absolute top-0 left-0" width="220" height="220" viewBox="0 0 220 220">
                    <circle cx="110" cy="110" r="104" fill="none" stroke="#e4e4e7" strokeWidth="4" />
                    <circle
                    cx="110" cy="110" r="104" fill="none"
                    stroke={isTimer ? "#7F77DD" : "#378ADD"}
                    strokeWidth="4" strokeLinecap="round"
                    strokeDasharray="653.45"
                    strokeDashoffset={653.45 - (653.45 * ((counter) / 60))}
                    transform="rotate(-90 110 110)"
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                    />
                </svg>
                <div className="flex flex-col items-center justify-center w-[200px] h-[200px] rounded-full border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                    <span className="font-mono text-4xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
                    {ore < 10 ? "0" + ore : ore}:{min < 10 ? "0" + min : min}:{counter < 10 ? "0" + counter : counter}
                    </span>
                    <span className="text-xs text-zinc-400 mt-1">{output}</span>
                </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-xl">

                {/* Start / Stop / Reset */}
                <div className="flex flex-col gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest mb-1">Controllo</span>
                    <button
                    onClick={() => setIsRunning(true)}
                    className={`rounded-xl py-2.5 text-sm font-medium transition-all ${isRunning ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >Start</button>
                    <button
                    onClick={() => setIsRunning(false)}
                    className={`rounded-xl py-2.5 text-sm font-medium transition-all ${!isRunning ? "bg-red-50 text-red-700 border border-red-200" : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >Stop</button>
                    <button
                    onClick={() => resetAll()}
                    className="rounded-xl py-2.5 text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                    >Reset</button>
                </div>

                {/* Speed */}
                <div className="flex flex-col gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest mb-1">Velocità</span>
                    <div className="flex gap-2">
                    {[{ label: "0.5×", val: 2000 }, { label: "1×", val: 1000 }, { label: "2×", val: 500 }].map(({ label, val }) => (
                        <button
                        key={val}
                        onClick={() => setSpeed(val)}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition-all ${speed === val ? "bg-blue-50 text-blue-700 border border-blue-200" : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                        >{label}</button>
                    ))}
                    </div>
                </div>

                {/* Timer + Lap */}
                <div className="flex flex-col gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest mb-1">Timer & Giri</span>
                    <input
                    type="number"
                    placeholder="Minuti..."
                    value={timer}
                    onChange={(e) => setTimer(Number(e.target.value))}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button
                    onClick={startTimer}
                    className={`rounded-xl py-2.5 text-sm font-medium transition-all ${isTimer ? "bg-violet-50 text-violet-700 border border-violet-200" : "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"}`}
                    >Avvia timer</button>
                    <button
                    onClick={lapSetter}
                    className="rounded-xl py-2.5 text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                    >Giro</button>
                </div>
                </div>

                {/* Laps */}
                {laps.length > 0 && (
                <div className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4">
                    <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-widest">Giri</span>
                    <button
                        onClick={() => setLaps([])}
                        className="text-xs text-zinc-400 hover:text-red-500 transition-colors"
                    >Cancella</button>
                    </div>
                    <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                    {laps.map((lap, i) => (
                        <li key={i} className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-800 rounded-xl px-3 py-2">
                        <span className="text-xs text-zinc-400">#{i + 1}</span>
                        <span className="font-mono text-sm text-zinc-800 dark:text-zinc-200">
                            {lap.ore < 10 ? "0" + lap.ore : lap.ore}:
                            {lap.min < 10 ? "0" + lap.min : lap.min}:
                            {lap.sec < 10 ? "0" + lap.sec : lap.sec}
                        </span>
                        </li>
                    ))}
                    </ul>
                </div>
                )}

            </div>
            </>
    )
}