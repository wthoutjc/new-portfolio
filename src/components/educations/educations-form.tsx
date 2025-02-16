"use client";
import { startTransition, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { AppCalendar } from "@/components/ui/app-calendar/app-calendar";
import { SubmitButton } from "../ui/submit-button/submit-button";

// Hooks y validación
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schemas y acciones
import { educationsSchema } from "@/lib/schemas/education.schema";
import { Crud } from "@/lib/enums/crud.enum";
import {
  create as createEducation,
  update as updateEducation,
} from "@/lib/actions/education.action";

// Interfaces y tipos
import { Education } from "@/lib/interfaces/education";
import { ActionState } from "@/lib/types/action.type";
import { EducationType } from "@/modules/educations/enums/educations.enum";

// Toast
import { toast } from "sonner";
import {
  TOAST_ERROR_STYLE,
  TOAST_SUCCESS_STYLE,
} from "@/lib/constants/toast-defaults";

interface Props {
  education?: Education;
}

const initialValues: Partial<z.infer<typeof educationsSchema>> = {
  title: "",
  institution: "",
  educationType: "",
  startDate: new Date(),
  currentlyStudying: false,
  description: "",
};

const EducationsForm = ({ education }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const mode = education ? Crud.UPDATE : Crud.CREATE;
  const { id, ...rest } = education || {};

  const defaultValues: Partial<z.infer<typeof educationsSchema>> = {
    ...initialValues,
    ...rest,
  };

  const [state, formAction] = useActionState<ActionState<Education>, FormData>(
    mode === Crud.CREATE ? createEducation : updateEducation,
    undefined
  );

  const form = useForm<z.infer<typeof educationsSchema>>({
    resolver: zodResolver(educationsSchema),
    defaultValues,
  });

  const currentlyStudying = form.watch("currentlyStudying");

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
        `Educación ${
          mode === Crud.CREATE ? "registrada" : "actualizada"
        } correctamente`,
        TOAST_SUCCESS_STYLE
      );
      router.push("/system/educations");
    }
  }, [state, router, mode]);

  useEffect(() => {
    if (currentlyStudying) form.setValue("endDate", null);
  }, [currentlyStudying, form]);

  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE ? (
          <>
            <CardTitle>Registrar Educación</CardTitle>
            <CardDescription>
              Por favor, complete el siguiente formulario para registrar su
              educación.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Actualizar Educación</CardTitle>
            <CardDescription>
              A continuación, se muestra la información de la educación
              seleccionada.
            </CardDescription>
          </>
        )}
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="flex w-full space-x-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Título <span className="text-red-500">*</span>
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
                name="educationType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Tipo de Educación <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!!state}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(EducationType).map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Institución <span className="text-red-500">*</span>
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
              name="currentlyStudying"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!!state}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Actualmente cursando</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex w-full space-x-2">
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

              {!currentlyStudying && (
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

            <div className="flex justify-start">
              <SubmitButton text="Guardar" />
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
      </CardFooter>
    </Card>
  );
};

export { EducationsForm };
