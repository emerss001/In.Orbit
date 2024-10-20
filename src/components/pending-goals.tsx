import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";

const PendingGoals = () => {
    const { data } = useQuery({
        queryKey: ["pending-goals"],
        queryFn: getPendingGoals,
        staleTime: 1000 * 60, // 1 minute
    });

    if (!data) return null;
    console.log(data);

    return (
        <div className="flex flex-wrap gap-3">
            {data.map((goal) => {
                return (
                    <OutlineButton key={goal.id} disabled={goal.completionCount >= goal.desiredWeeklyFrequency}>
                        <Plus className="size-4 text-zinc-400" />
                        {goal.title}
                    </OutlineButton>
                );
            })}
        </div>
    );
};

export default PendingGoals;
