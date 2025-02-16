"use client";
import { startTransition, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Componentes UI
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button/submit-button";

// Hooks y validación
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema y acciones
import { skillsSchema } from "@/lib/schemas/skill.schema";
import { Crud } from "@/lib/enums/crud.enum";
import {
  create as createSkill,
  update as updateSkill,
} from "@/lib/actions/skill.action";
import { toast } from "sonner";
import { Skill } from "@/lib/interfaces/skill";
import { TOAST_ERROR_STYLE } from "@/lib/constants/toast-defaults";
import { ActionState } from "@/lib/types/action.type";

interface Props {
  skill?: Skill;
}

const initialValues: Partial<z.infer<typeof skillsSchema>> = {
  name: "",
  description: "",
  icon: "",
};

const SkillsForm = ({ skill }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const mode = skill ? Crud.UPDATE : Crud.CREATE;
  const { id, ...rest } = skill || {};

  const defaultValues: Partial<z.infer<typeof skillsSchema>> = {
    ...initialValues,
    ...rest,
  };
  const [state, formAction] = useActionState<ActionState<Skill>, FormData>(
    mode === Crud.CREATE ? createSkill : updateSkill,
    undefined
  );
  const form = useForm<z.infer<typeof skillsSchema>>({
    resolver: zodResolver(skillsSchema),
    defaultValues,
  });
  const onSubmit = form.handleSubmit((data) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", user.id ?? "");

    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value?.toString() ?? "")
    );

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state?.errors) {
      toast.error(JSON.stringify(state.errors), TOAST_ERROR_STYLE);
    }

    if (state?.data) {
      toast.success(
        `Skill ${mode === Crud.CREATE ? "creado" : "actualizado"} correctamente`
      );
      router.push("/system/skills");
    }
  }, [state, router, mode]);
  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE ? (
          <>
            <CardTitle>Crear Skill</CardTitle>
            <CardDescription>
              Ingrese la información para crear un nuevo skill.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Actualizar Skill</CardTitle>
            <CardDescription>
              Actualice la información del skill.
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-red-500"></span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled={!!state} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={!!state}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icono</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      disabled={!!state}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start">
              <SubmitButton text="Guardar" />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-gray-500">
          <i>
            Los campos marcados con <span className="text-red-500"></span> son
            obligatorios.
          </i>
        </p>
      </CardFooter>
    </Card>
  );
};
export { SkillsForm };
