import urlBase from "./urlBase";

export async function undoGoalCompletion(goalId: string, completedAt: string) {
    await fetch(`${urlBase}/undo-goals-completions`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            goalId,
            completedAt,
        }),
    });
}
