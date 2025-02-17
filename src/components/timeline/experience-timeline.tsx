"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import { Experience } from "@/lib/interfaces/experience";
import { motion } from "motion/react";

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
      console.log("experience", {
        startDate: experience.startDate.getFullYear(),
        endDate: experience.endDate?.getFullYear(),
      });

      const startDate = new Date(experience.startDate);
      const endDate = experience.endDate
        ? new Date(experience.endDate)
        : new Date();
      return acc + (endDate.getFullYear() - startDate.getFullYear());
    }, 1);

  return (
    <div className="space-y-12 relative">
      <div className="flex flex-col justify-start">
        <p className="text-2xl font-bold">Experiencias laborales</p>
        <p className="text-sm">{totalYears} años de experiencia</p>
      </div>
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
      {[...experiences].map((experience, index) => (
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className={`flex ${
            index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
        >
          <Card
            className={`w-1/2 ${
              index % 2 === 0 ? "mr-8" : "ml-8"
            } timeline-card`}
          >
            <CardHeader className="relative">
              <div className="absolute top-0 right-0 -mt-2 -mr-2">
                <BriefcaseIcon className="w-8 h-8 text-primary timeline-icon" />
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
                {new Date(experience.startDate).toLocaleDateString()} -
                {experience.endDate
                  ? new Date(experience.endDate).toLocaleDateString()
                  : "Present"}
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
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
              {experience.multimedia && (
                <div className="mt-4 grid grid-cols-2 gap-2">
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
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
