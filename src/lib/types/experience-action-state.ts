export type ExperienceActionState =
  | {
      userId: string;
      title: string;
      employmentType: string | null;
      company: string;
      location: string | null;
      locationType: string | null;
      startDate: Date;
      endDate: Date | null;
      updatedAt: Date;
    }
  | { errors?: Record<string, string[]> };
