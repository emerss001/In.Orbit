import urlBase from "./urlBase";

interface CreateGoalRequest {
    title: string;
    desiredWeeklyFrequency: number;
}

export async function createGoal({ title, desiredWeeklyFrequency }: CreateGoalRequest) {
    await fetch(`${urlBase}/goals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            desiredWeeklyFrequency,
        }),
    });
}
