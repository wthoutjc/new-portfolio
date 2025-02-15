"use client";

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Form } from "../ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// Interfaces
import { Skill } from "@/modules/skills/interfaces/skills";
import { Crud } from "@/lib/enums/crud.enum";

// Hooks
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod
import { z } from "zod";

// Schemas
import { experiencesSchema } from "@/lib/schemas/experiences.schema";

interface Props {
  skills: Skill[];
  mode: Crud;
}

const defaultValues: z.infer<typeof experiencesSchema> = {
  title: "",
};

const ExperiencesForm = ({ mode }: Props) => {
  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof experiencesSchema>) => {
    console.log(data);
  };

  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE && (
          <CardTitle>Registrar una experiencia</CardTitle>
        )}

        {mode === Crud.CREATE && (
          <CardDescription>
            Por favor, complete el siguiente formulario para crear una
            experiencia.
          </CardDescription>
        )}

        {mode === Crud.UPDATE && (
          <CardDescription>
            A continuación, se muestra la información de la experiencia
            seleccionada.
          </CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Título <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export { ExperiencesForm };
