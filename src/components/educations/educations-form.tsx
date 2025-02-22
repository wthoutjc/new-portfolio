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
import { Button } from "../ui/button";
import { FileUpload } from "../ui/file-upload/file-upload";
import { MultimediaCarousel } from "../ui/multimedia-carousel/multimedia-carousel";

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
  remove as removeEducation,
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

// Icons
import { Trash } from "lucide-react";

interface Props {
  education?: Education;
}

const initialValues: Partial<z.infer<typeof educationsSchema>> = {
  title: "",
  institution: "",
  educationType: "",
  startDate: new Date(),
  endDate: null,
  currentlyStudying: false,
  description: null,
  multimedia: null,
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
  const [stateRemove, formActionRemove] = useActionState<
    ActionState<Education>,
    FormData
  >(removeEducation, undefined);

  const form = useForm<z.infer<typeof educationsSchema>>({
    resolver: zodResolver(educationsSchema),
    defaultValues,
  });

  const currentlyStudying = form.watch("currentlyStudying");

  const handleRemove = () => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", user.id ?? "");

    startTransition(() => {
      formActionRemove(formData);
    });
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (!user) return;

    const formData = new FormData();
    formData.append("id", id ?? "");
    formData.append("userId", user.id ?? "");

    // Manejar multimedia por separado
    const { multimedia, ...rest } = data;

    // Agregar el resto de los datos
    Object.entries(rest).forEach(([key, value]) =>
      formData.append(key, value?.toString() ?? "")
    );

    // Verificar si hay cambios en multimedia
    const hasMultimediaChanges =
      mode === Crud.CREATE ||
      JSON.stringify(multimedia) !== JSON.stringify(education?.multimedia);

    // Verificar si se están eliminando todos los archivos
    const isDeletingAllFiles =
      education?.multimedia &&
      education.multimedia.length > 0 &&
      (!multimedia || multimedia.length === 0);

    // Agregar los archivos y sus metadatos
    if (isDeletingAllFiles) {
      // Si se están eliminando todos los archivos, enviar null explícitamente
      formData.append("multimedia", "null");
    } else if (multimedia?.length && hasMultimediaChanges) {
      // Agregar el array de multimedia como JSON string
      formData.append("multimedia", JSON.stringify(multimedia));

      // Agregar los archivos físicos solo si son nuevos (tienen URL temporal)
      for (const file of multimedia) {
        if (file.url.startsWith("blob:") || file.url.includes("objecturl")) {
          const response = await fetch(file.url);
          const blob = await response.blob();
          formData.append(
            "files",
            new File([blob], file.name, { type: file.type })
          );
        }
      }
    } else {
      // Si no hay cambios, mantener la multimedia existente
      formData.append(
        "multimedia",
        JSON.stringify(education?.multimedia || null)
      );
    }

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    const generalState = state || stateRemove;

    if (generalState?.errors) {
      toast.error(JSON.stringify(generalState.errors), TOAST_ERROR_STYLE);
    }

    if (generalState?.data) {
      toast.success(
        `Education ${
          stateRemove ? "deleted" : mode === Crud.CREATE ? "created" : "updated"
        } correctly`,
        TOAST_SUCCESS_STYLE
      );
      router.push("/system/educations");
    }
  }, [state, stateRemove, router, mode]);

  useEffect(() => {
    if (currentlyStudying) form.setValue("endDate", null);
  }, [currentlyStudying, form]);

  return (
    <Card className="m-3 mt-1 p-3 pt-1">
      <CardHeader>
        {mode === Crud.CREATE ? (
          <>
            <CardTitle>Register Education</CardTitle>
            <CardDescription>
              Please complete the following form to register your education.
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Update Education</CardTitle>
            <CardDescription>
              Below is the information of the selected education.
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
                      Title <span className="text-red-500">*</span>
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
                      Education Type <span className="text-red-500">*</span>
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
                    Institution <span className="text-red-500">*</span>
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
                    <FormLabel>Currently studying</FormLabel>
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
                      Start Date <span className="text-red-500">*</span>
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
                        End Date <span className="text-red-500">*</span>
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
                  <FormLabel>Description</FormLabel>
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
              name="multimedia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivos multimedia</FormLabel>
                  {field.value && field.value.length > 0 && (
                    <MultimediaCarousel files={field.value} />
                  )}
                  <FormControl>
                    <FileUpload
                      onChange={(files) => field.onChange(files)}
                      value={field.value}
                      disabled={!!state}
                      maxFiles={5}
                      accept={{
                        "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                        "application/pdf": [".pdf"],
                        "application/msword": [".doc"],
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                          [".docx"],
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex justify-between">
              <div className="flex justify-start">
                <SubmitButton text="Save" />
              </div>

              {education && (
                <div className="flex justify-start">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleRemove}
                  >
                    Delete <Trash className="w-4 h-4" />
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
            The fields marked with <span className="text-red-500">*</span> are
            required.
          </i>
        </p>
      </CardFooter>
    </Card>
  );
};

export { EducationsForm };
