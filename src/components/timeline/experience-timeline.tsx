"use client";
import Image from "next/image";
import { motion } from "motion/react";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Interfaces
import { Experience } from "@/lib/interfaces/experience";

// Icons
import {
  ChevronsUp,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "lucide-react";

// Dayjs
import dayjs from "dayjs";
import "dayjs/locale/es";

// Set locale
dayjs.locale("es");

interface TimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: TimelineProps) {
  const totalYears = [...experiences]
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .reduce((acc, experience) => {
      const startDate = new Date(experience.startDate);
      const endDate = experience.endDate
        ? new Date(experience.endDate)
        : new Date();
      return acc + (endDate.getFullYear() - startDate.getFullYear());
    }, 1);

  return (
    <>
      <div className="flex flex-col justify-start mb-8 md:mb-2">
        <p className="text-2xl font-bold">Professional Experience</p>
        <div className="flex items-center gap-1">
          <ChevronsUp color="#2ecc71" className="w-4 h-4" />
          <p className="text-sm">{totalYears} years of experience</p>
        </div>
      </div>
      <div className="space-y-8 relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex flex-col md:flex-row ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <Card className="w-full md:w-[calc(50%-1rem)] mb-4 md:mb-0">
              <CardHeader className="relative">
                <div className="absolute top-0 right-0 -mt-2 -mr-2">
                  <BriefcaseIcon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-primary">
                  {experience.title}
                </CardTitle>
                <div className="text-sm flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1" />
                  {experience.company}
                </div>
                <div className="text-sm flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {dayjs(experience.startDate).format("MMMM [de] YYYY")} -{" "}
                  {experience.endDate
                    ? dayjs(experience.endDate).format("MMMM [de] YYYY")
                    : "Presente"}{" "}
                  ·{" "}
                  {(() => {
                    const startDate = dayjs(experience.startDate);
                    const endDate = experience.endDate
                      ? dayjs(experience.endDate)
                      : dayjs();
                    const months = endDate.diff(startDate, "month");
                    const years = Math.floor(months / 12);
                    const remainingMonths = months % 12;

                    if (years === 0) {
                      return `${remainingMonths} ${
                        remainingMonths === 1 ? "mes" : "meses"
                      }`;
                    }
                    return `${years} ${years === 1 ? "año" : "años"}${
                      remainingMonths > 0
                        ? ` ${remainingMonths} ${
                            remainingMonths === 1 ? "mes" : "meses"
                          }`
                        : ""
                    }`;
                  })()}
                </div>
                {experience.location && (
                  <div className="text-sm flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {experience.location}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground line-clamp-4 text-ellipsis overflow-hidden">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.experienceSkills.map(({ skill }) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="text-xs sm:text-sm mb-2"
                    >
                      {skill.name}
                    </Badge>
                  ))}
                </div>
                {experience.multimedia && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(
                      experience.multimedia as Record<string, string>
                    ).map(([key, url]) => (
                      <Image
                        key={key}
                        src={url || "/placeholder.svg"}
                        alt={`${experience.title} - ${key}`}
                        className="rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="hidden md:flex w-8 md:w-1/2 items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
