"use client";
import { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Auth
import { useSession } from "next-auth/react";

// Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { AppCalendar } from "@/components/ui/app-calendar/app-calendar";
import { SubmitButton } from "../ui/submit-button/submit-button";
import { Button } from "../ui/button";

// Interfaces
import { Skill } from "@/modules/skills/interfaces/skills";
import { Experience } from "@/lib/interfaces/experience";
import { Crud } from "@/lib/enums/crud.enum";

// Hooks
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod
import { z } from "zod";

// Schemas
import { experiencesSchema } from "@/lib/schemas/experiences.schema";
import {
  EmploymentType,
  LocationType,
} from "@/modules/experiences/enums/experiences.enum";

// Actions
import { create, update, remove } from "@/lib/actions/experiences.action";
import {
  TOAST_ERROR_STYLE,
  TOAST_SUCCESS_STYLE,
} from "@/lib/constants/toast-defaults";

// Sonner
import { toast } from "sonner";

// Icons
import { Trash, X } from "lucide-react";

// Types
import { ActionState } from "@/lib/types/action.type";

interface Props {
  skills: Skill[];
  experience?: Experience;
}

const initialValues: Partial<z.infer<typeof experiencesSchema>> = {
  title: "",
  company: "",
  startDate: new Date(),
  currentlyWorking: false,
  experienceSkills: [],
};

const ExperiencesForm = ({ experience, skills }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const mode = experience ? Crud.UPDATE : Crud.CREATE;
  const { id, ...rest } = experience || {};

  const [state, formAction] = useActionState<ActionState<Experience>, FormData>(
    mode === Crud.CREATE ? create<Experience> : update<Experience>,
    undefined
  );

  const [stateRemove, formActionRemove] = useActionState<
    ActionState<Experience>,
    FormData
  >(remove<Experience>, undefined);

  const defaultValues: Partial<z.infer<typeof experiencesSchema>> = {
    ...initialValues,
    ...rest,
  };

  const form = useForm<z.infer<typeof experiencesSchema>>({
    resolver: zodResolver(experiencesSchema),
    defaultValues,
  });

  const currentlyWorking = form.watch("currentlyWorking");

  const onSubmit = form.handleSubmit((data) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", user.id ?? "");

    // Manejar las habilidades por separado
    const { experienceSkills, ...rest } = data;

    // Agregar el resto de los datos
    Object.entries(rest).forEach(([key, value]) =>
      formData.append(key, value?.toString() ?? "")
    );

    // Agregar las habilidades como JSON
    formData.append("experienceSkills", JSON.stringify(experienceSkills || []));

    startTransition(() => {
      formAction(formData);
    });
  });

  const handleRemove = () => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", user.id ?? "");

    startTransition(() => {
      formActionRemove(formData);
    });
  };

  useEffect(() => {
    const generalState = state || stateRemove;

    if (generalState?.errors)
      toast.error(JSON.stringify(generalState.errors), TOAST_ERROR_STYLE);

    if (generalState?.data) {
      const message = `Experiencia ${
        stateRemove
          ? "eliminada"
          : mode === Crud.CREATE
          ? "registrada"
          : "actualizada"
      } correctamente`;

      toast.success(message, TOAST_SUCCESS_STYLE);
      return router.push("/system");
    }
  }, [state, stateRemove, router, mode]);

  useEffect(() => {
    if (currentlyWorking) form.setValue("endDate", null);
  }, [currentlyWorking, form]);

  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE && (
          <>
            <CardTitle>Registrar una experiencia</CardTitle>
            <CardDescription>
              Por favor, complete el siguiente formulario para crear una
              experiencia.
            </CardDescription>
          </>
        )}

        {mode === Crud.UPDATE && (
          <>
            <CardTitle>Actualizar una experiencia</CardTitle>
            <CardDescription>
              A continuación, se muestra la información de la experiencia
              seleccionada.
            </CardDescription>
          </>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="flex w-full space-x-2">
              {/* Experiences.title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Cargo <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={!!state} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experiences.employmentType */}
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Tipo de empleo <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}
                        disabled={!!state}
                      >
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo de empleo" />
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>

                        <SelectContent>
                          {Object.values(EmploymentType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex md:flex-col flex-row w-full">
              {/* Experiences.company  */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Empresa <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled={!!state} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experiences.currentlyWorking */}
              <FormField
                control={form.control}
                name="currentlyWorking"
                render={({ field }) => (
                  <FormItem className="w-full mt-2">
                    <FormControl>
                      <Checkbox
                        id="currentlyWorking"
                        className="mr-2"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!!state}
                      />
                    </FormControl>

                    <FormLabel>
                      <span className="text-red-500">*</span> ¿Actualmente
                      trabaja en esta empresa?
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full space-x-2">
              {/* Experiences.location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ubicación</FormLabel>
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

              {/* Experiences.locationType */}
              <FormField
                control={form.control}
                name="locationType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tipo de ubicación</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value ?? undefined}
                        disabled={!!state}
                      >
                        <FormItem>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo de ubicación" />
                            </SelectTrigger>
                          </FormControl>
                        </FormItem>

                        <SelectContent>
                          {Object.values(LocationType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex w-full space-x-2">
              {/* Campo para Fecha de Inicio */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Fecha de Inicio <span className="text-red-500">*</span>
                    </FormLabel>
                    <AppCalendar
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={!!state}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experiences.endDate */}
              {!currentlyWorking && (
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Fecha de Fin <span className="text-red-500">*</span>
                      </FormLabel>
                      <AppCalendar
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={!!state}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Experiences.description  */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
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

            {/* Experiences.experienceSkills */}
            <FormField
              control={form.control}
              name="experienceSkills"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Habilidades</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(skillId) => {
                        const currentSkills = field.value || [];
                        if (
                          !currentSkills.some(
                            (skill) => skill.skillId === skillId
                          )
                        ) {
                          field.onChange([
                            ...currentSkills,
                            { skillId, experienceId: id || "" },
                          ]);
                        }
                      }}
                      value=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione habilidades" />
                      </SelectTrigger>
                      <SelectContent>
                        {skills
                          .filter((skill) => {
                            const currentSkills = field.value || [];
                            return !currentSkills.some(
                              (expSkill) => expSkill.skillId === skill.id
                            );
                          })
                          .map((skill) => (
                            <SelectItem key={skill.id} value={skill.id}>
                              {skill.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value?.map((expSkill) => {
                      const skill = skills.find(
                        (s) => s.id === expSkill.skillId
                      );
                      return (
                        <div
                          key={expSkill.skillId}
                          className="flex items-center gap-2 rounded-md bg-secondary px-3 py-1"
                        >
                          <span className="text-sm">{skill?.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              field.onChange(
                                field.value?.filter(
                                  (s) => s.skillId !== expSkill.skillId
                                )
                              );
                            }}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between">
              <div className="flex justify-start">
                <SubmitButton text="Guardar" disabled={!!state} />
              </div>

              {experience && (
                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleRemove}
                  >
                    Eliminar <Trash className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col">
        <p className="text-sm text-gray-500 mb-3">
          <i>
            Los campos marcados con <span className="text-red-500">*</span> son
            obligatorios.
          </i>
        </p>

        <p className="text-sm text-gray-500">
          Registro de experiencias | Portafolio de Juan Camilo Ramírez Rativa
        </p>
      </CardFooter>
    </Card>
  );
};

export { ExperiencesForm };
