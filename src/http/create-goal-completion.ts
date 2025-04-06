import urlBase from "./urlBase";

export async function createGoalCompletion(goalId: string) {
    await fetch(`${urlBase}/goals-completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            goalId,
        }),
    });
}
