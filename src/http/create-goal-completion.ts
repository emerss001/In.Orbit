export async function createGoalCompletion(goalId: string) {
    await fetch("http://localhost:4545/goals-completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            goalId,
        }),
    });
}
