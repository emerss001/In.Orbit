import { CheckCircle2, Plus } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import InOrbitIcon from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { OutlineButton } from "./ui/outline-button";

const Summary = () => {
    return (
        <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <InOrbitIcon />
                    <span>5 a 10 de Agosto</span>
                </div>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <Plus className="size-4" />
                        Cadastrar meta
                    </Button>
                </DialogTrigger>
            </div>

            <div className="flex flex-col gap-3">
                <Progress value={8} max={15}>
                    <ProgressIndicator style={{ width: "50%" }} />
                </Progress>

                <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>
                        Você completou <span className="text-zinc-100">8</span> de{" "}
                        <span className="text-zinc-100">15</span> metas essas semana.
                    </span>
                    <span>58%</span>
                </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-3">
                <OutlineButton>
                    <Plus className="size-4 text-zinc-400" />
                    Meditar
                </OutlineButton>

                <OutlineButton>
                    <Plus className="size-4 text-zinc-400" />
                    Nadar
                </OutlineButton>

                <OutlineButton>
                    <Plus className="size-4 text-zinc-400" />
                    Me exercitar
                </OutlineButton>

                <OutlineButton>
                    <Plus className="size-4 text-zinc-400" />
                    Alimentar bem
                </OutlineButton>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-medium">Sua semana</h2>

                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">
                        Domingo <span className="text-zinc-400 text-xs">(10 de Agosto)</span>
                    </h3>

                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="siz-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou
                                <span className="text-zinc-100"> "Acordar cedo"</span> às{" "}
                                <span className="text-zinc-100">08:30</span>
                            </span>

                            <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-zinc-300">
                                Desfazer
                            </span>
                        </li>

                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="siz-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou
                                <span className="text-zinc-100"> "Meditar"</span> às{" "}
                                <span className="text-zinc-100">09:50</span>
                            </span>

                            <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-zinc-300">
                                Desfazer
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-medium">
                        Segunda-Feira <span className="text-zinc-400 text-xs">(11 de Agosto)</span>
                    </h3>

                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 className="siz-4 text-pink-500" />
                            <span className="text-sm text-zinc-400">
                                Você completou
                                <span className="text-zinc-100"> "Acordar cedo"</span> às{" "}
                                <span className="text-zinc-100">08:30</span>
                            </span>

                            <span className="text-xs text-zinc-500 underline cursor-pointer hover:text-zinc-300">
                                Desfazer
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Summary;
