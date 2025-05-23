import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

const PendingGoals = () => {
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["pending-goals"],
        queryFn: getPendingGoals,
        staleTime: 1000 * 60, // 1 minute
    });

    if (!data) return null;

    async function handleCompleteGoal(goalId: string) {
        await createGoalCompletion(goalId);

        queryClient.invalidateQueries({ queryKey: ["summary"] });
        queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
    }

    return (
        <div className="flex flex-wrap gap-3">
            {data.map((goal) => {
                return (
                    <OutlineButton
                        onClick={() => handleCompleteGoal(goal.id)}
                        key={goal.id}
                        disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
                    >
                        <Plus className="size-4 text-zinc-400" />
                        {goal.title}
                    </OutlineButton>
                );
            })}
        </div>
    );
};

export default PendingGoals;
