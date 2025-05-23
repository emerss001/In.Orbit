import { RadioGroup, RadioGroupItem, RadioGroupIndicator } from "./ui/radio-group";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
    title: z.string().min(1, "Informe o nome da atividade"),
    desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

const CreateGoal = () => {
    const queryClient = useQueryClient();

    const { register, control, handleSubmit, formState, reset } = useForm<z.infer<typeof createGoalForm>>({
        resolver: zodResolver(createGoalForm),
    });

    async function handleCreateGoal(data: z.infer<typeof createGoalForm>) {
        await createGoal({
            title: data.title,
            desiredWeeklyFrequency: data.desiredWeeklyFrequency,
        });

        reset();

        queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
        queryClient.invalidateQueries({ queryKey: ["summary"] });

        // Fecha o diálogo após salvar
        const dialog = document.querySelector("[data-state='open']");
        if (dialog) {
            (dialog as HTMLElement).click(); // Simula o clique no botão de fechar
        }
    }

    return (
        <DialogContent>
            <div className="flex flex-col gap-6 h-full">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <DialogTitle>Cadastrar meta</DialogTitle>
                        <DialogClose>
                            <X className="size-5 text-zinc-600" />
                        </DialogClose>
                    </div>
                    <DialogDescription>
                        Adicione atividades que te fazem bem e que você quer continuar praticando toda semana.
                    </DialogDescription>
                </div>

                <form onSubmit={handleSubmit(handleCreateGoal)} className="flex flex-col justify-between">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Qual a atividade?</Label>
                            <Input
                                id="title"
                                autoFocus
                                placeholder="Exercitar, ler, meditar, etc..."
                                {...register("title")}
                            />

                            {formState.errors.title && (
                                <p className="text-red-400 text-sm">{formState.errors.title.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Quantas vezes na semana?</Label>
                            <Controller
                                control={control}
                                name="desiredWeeklyFrequency"
                                defaultValue={3}
                                render={({ field }) => {
                                    return (
                                        <RadioGroup onValueChange={field.onChange} value={String(field.value)}>
                                            <RadioGroupItem value="1">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    1x na semana
                                                </span>
                                                <span className="text-lg leading-none">🥱</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="2">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    2x na semana
                                                </span>
                                                <span className="text-lg leading-none">😐</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="3">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    3x na semana
                                                </span>
                                                <span className="text-lg leading-none">😎</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="4">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    4x na semana
                                                </span>
                                                <span className="text-lg leading-none">😜</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="5">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    5x na semana
                                                </span>
                                                <span className="text-lg leading-none">🤩</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="6">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    6x na semana
                                                </span>
                                                <span className="text-lg leading-none">🤯</span>
                                            </RadioGroupItem>

                                            <RadioGroupItem value="7">
                                                <RadioGroupIndicator />
                                                <span className="text-zinc-300 text-sm font-medium leading-none">
                                                    Todos os dias da semana
                                                </span>
                                                <span className="text-lg leading-none">🔥</span>
                                            </RadioGroupItem>
                                        </RadioGroup>
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-6">
                        <DialogClose asChild>
                            <Button type="button" className="flex-1" variant="secondary">
                                Fechar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="flex-1">
                            Salvar
                        </Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    );
};

export default CreateGoal;
