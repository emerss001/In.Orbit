import { Plus } from "lucide-react";
import logo from "./assets/in-orbit-logo.svg";
import letsStart from "./assets/rocket-launch-illustration.svg";

function App() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="Logo do in.orbit" />
            <img src={letsStart} alt="in.orbit" />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta, vamos cadastrar uma agora mesmo?
            </p>

            <button
                className="px-4 py-2.5 rounded-lg bg-violet-500 text-violet-50 flex items-center gap-2 text-sm font-medium tracking-tight hover:bg-violet-600"
                type="button"
            >
                <Plus className="size-4" />
                Cadastrar meta
            </button>
        </div>
    );
}

export default App;
