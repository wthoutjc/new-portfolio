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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/ui/submit-button/submit-button";
import { Button } from "@/components/ui/button";

// Hooks y validación
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Esquema y acciones
import { userSkillSchema } from "@/lib/schemas/skill.schema";
import { Crud } from "@/lib/enums/crud.enum";
import {
  create as createUserSkill,
  update as updateUserSkill,
} from "@/lib/actions/user-skill.action";
import { toast } from "sonner";
import { UserSkill } from "@/lib/interfaces/skill";
import { TOAST_ERROR_STYLE } from "@/lib/constants/toast-defaults";
import { ActionState } from "@/lib/types/action.type";
import { Skill } from "@/modules/skills/interfaces/skills";
import { SkillSource } from "@/lib/enums/skill.enum";

// Icons
import { PlusIcon } from "lucide-react";

// Zustand
import { useUIStore } from "@/zustand/store";
import { AlertDialog } from "@/lib/interfaces/ui";
import { SkillsForm } from "./skills-form";
import { INITIAL_DIALOG } from "@/lib/slices/uiSlice";

interface Props {
  userSkill?: UserSkill;
  skills: Skill[];
  experiences: { id: string; title: string }[];
  educations: { id: string; title: string }[];
}

const initialValues: Partial<z.infer<typeof userSkillSchema>> = {
  skillId: "",
  source: SkillSource.SELF_TAUGHT,
  yearsOfExperience: 0,
  sourceId: null,
};

const UserSkillsForm = ({
  userSkill,
  skills,
  experiences,
  educations,
}: Props) => {
  const { setAlertDialog } = useUIStore();

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const mode = userSkill ? Crud.UPDATE : Crud.CREATE;
  const { id, ...rest } = userSkill || {};

  const defaultValues: Partial<z.infer<typeof userSkillSchema>> = {
    ...initialValues,
    ...rest,
  };

  const [state, formAction] = useActionState<ActionState<UserSkill>, FormData>(
    mode === Crud.CREATE ? createUserSkill : updateUserSkill,
    undefined
  );

  const form = useForm<z.infer<typeof userSkillSchema>>({
    resolver: zodResolver(userSkillSchema),
    defaultValues,
  });

  const selectedSource = form.watch("source");

  const openAlertDialog = () => {
    const alertDialog: AlertDialog = {
      open: true,
      title: "Agregar Habilidad",
      description:
        "Ingrese la información para agregar una nueva habilidad a su perfil.",
      children: <SkillsForm />,
      callback: () => setAlertDialog(INITIAL_DIALOG),
    };

    setAlertDialog(alertDialog);
  };

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
        `Habilidad ${
          mode === Crud.CREATE ? "creada" : "actualizada"
        } correctamente`
      );
      router.push("/system/skills");
    }
  }, [state, router, mode]);

  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE ? (
          <>
            <CardTitle>Agregar Habilidad</CardTitle>
            <CardDescription>
              Ingrese la información para agregar una nueva habilidad a su
              perfil.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Actualizar Habilidad</CardTitle>
            <CardDescription>
              Actualice la información de la habilidad en su perfil.
            </CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <Button type="button" variant="outline" onClick={openAlertDialog}>
              <PlusIcon className="w-4 h-4" />
              Agregar Habilidad
            </Button>

            <FormField
              control={form.control}
              name="skillId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Habilidad <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!state}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una habilidad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skills.map((skill) => (
                        <SelectItem key={skill.id} value={skill.id}>
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearsOfExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Años de experiencia <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={!!state}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Fuente <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!!state}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una fuente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(SkillSource).map((source) => (
                        <SelectItem key={source} value={source}>
                          {source === SkillSource.EXPERIENCE
                            ? "Experiencia"
                            : source === SkillSource.EDUCATION
                            ? "Educación"
                            : "Autodidacta"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedSource !== SkillSource.SELF_TAUGHT && (
              <FormField
                control={form.control}
                name="sourceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {selectedSource === SkillSource.EXPERIENCE
                        ? "Experiencia"
                        : "Educación"}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                      disabled={!!state}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`Seleccione una ${
                              selectedSource === SkillSource.EXPERIENCE
                                ? "experiencia"
                                : "educación"
                            }`}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(selectedSource === SkillSource.EXPERIENCE
                          ? experiences
                          : educations
                        ).map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-start">
              <SubmitButton text="Guardar" />
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-gray-500">
          <i>
            Los campos marcados con <span className="text-red-500">*</span> son
            obligatorios.
          </i>
        </p>
      </CardFooter>
    </Card>
  );
};

export { UserSkillsForm };
