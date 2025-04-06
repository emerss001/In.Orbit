import { Dialog } from "./components/ui/dialog";
import CreateGoal from "./components/create-goal";
import Summary from "./components/summary";
import EmptyGoals from "./components/empty-goals";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

function App() {
    const { data } = useQuery({
        queryKey: ["summary"],
        queryFn: getSummary,
        staleTime: 1000 * 60, // 1 minute
    });

    console.log(data);

    return (
        <Dialog>
            {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

            <CreateGoal />
        </Dialog>
    );
}

export default App;
