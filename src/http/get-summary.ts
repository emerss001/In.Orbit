import urlBase from "./urlBase";

type SummaryResponse = {
    completed: number;
    total: number;
    goalsPerDay: Record<
        string,
        {
            id: string;
            title: string;
            completedAt: string;
        }[]
    >;
};

export async function getSummary(): Promise<SummaryResponse> {
    const response = await fetch(`${urlBase}/sumary`);
    const data = await response.json();

    return data.sumary;
}
