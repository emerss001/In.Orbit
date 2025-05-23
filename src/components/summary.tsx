import { CheckCircle2, Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import InOrbitIcon from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import PendingGoals from "./pending-goals";
import { undoGoalCompletion } from "../http/undo-goal-completion";

dayjs.locale(ptBR);

const Summary = () => {
    const queryClient = useQueryClient();
    const { data } = useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
        staleTime: 1000 * 60, // 1 minute
    });

    if (!data) return null;

    const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
    const lastDayOfWeek = dayjs().endOf("week").format("D MMM");

    const completedPercentage = Math.round((data.completed * 100) / data.total);

    async function handleUndoGoal(goalId: string, createdAt: string) {
        await undoGoalCompletion(goalId, createdAt);
        queryClient.invalidateQueries({ queryKey: ["summary"] });
        queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    }

    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <InOrbitIcon />
                    <span className="text-lg font-semibold capitalize">
                        {firstDayOfWeek} - {lastDayOfWeek}
                    </span>
                </div>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="size-4" />
                        Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress value={8} max={15}>
                    <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou <span className="text-zinc-100">{data?.completed}</span> de{" "}
                        <span className="text-zinc-100">{data?.total}</span> metas essas semana.
                    </span>
                    <span>{completedPercentage}%</span>
                </div>
            </div>

            <Separator />

            <PendingGoals />

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>

                {Object.entries(data.goalsPerDay).map(([day, goals]) => {
                    const weekDay = dayjs(day).format("dddd");
                    const formattedDay = dayjs(day).format("D [de] MMMM");

                    return (
                        <div key={day} className="flex flex-col gap-4">
                            <h3 className="font-medium">
                                <span className="capitalize">{weekDay} </span>
                                <span className="text-zinc-400 text-xs">({formattedDay})</span>
                            </h3>

                            <ul className="flex flex-col gap-3">
                                {goals.map((goal) => {
                                    const time = dayjs(goal.completedAt).format("HH:mm");

                                    return (
                                        <li className="flex items-center gap-2">
                                            <CheckCircle2 className="siz-4 text-pink-500" />
                                            <span className="text-sm text-zinc-400">
                                                Você completou
                                                <span className="text-zinc-100"> "{goal.title}"</span> às{" "}
                                                <span className="text-zinc-100">{time}h</span>
                                            </span>

                                            <span
                                                className="text-xs text-zinc-500 underline cursor-pointer hover:text-zinc-300"
                                                onClick={() => handleUndoGoal(goal.id, goal.completedAt)}
                                            >
                                                Desfazer
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

//46:25

export default Summary;
