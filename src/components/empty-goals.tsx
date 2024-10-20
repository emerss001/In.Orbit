import { Plus } from "lucide-react";
import logo from "../assets/in-orbit-logo.svg";
import letsStart from "../assets/rocket-launch-illustration.svg";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";

const EmptyGoals = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <img src={logo} alt="Logo do in.orbit" />
            <img src={letsStart} alt="in.orbit" />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
                Você ainda não cadastrou nenhuma meta, vamos cadastrar uma agora mesmo?
            </p>

            <DialogTrigger asChild>
                <Button>
                    <Plus className="size-4" />
                    Cadastrar meta
                </Button>
            </DialogTrigger>
        </div>
    );
};

export default EmptyGoals;
