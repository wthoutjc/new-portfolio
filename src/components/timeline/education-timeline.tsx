"use client";
import type { Educations } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookOpenIcon, GraduationCapIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

interface EducationTimelineProps {
  educations: Educations[];
}

export default function EducationTimeline({
  educations,
}: EducationTimelineProps) {
  return (
    <div className="space-y-8 relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary"></div>
      {educations.map((education, index) => (
        <motion.div
          key={education.id}
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
                <GraduationCapIcon className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold text-primary">
                {education.title}
              </CardTitle>
              <div className="text-sm flex items-center">
                <BookOpenIcon className="w-4 h-4 mr-1" />
                {education.institution}
              </div>
              <div className="text-sm flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                {new Date(education.startDate).getFullYear()} -
                {education.endDate
                  ? new Date(education.endDate).getFullYear()
                  : "Present"}
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{education.educationType}</Badge>
              {education.description && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {education.description}
                </p>
              )}
              {education.multimedia && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(
                    education.multimedia as Record<string, string>
                  ).map(([key, url]) => (
                    <Image
                      key={key}
                      src={url || "/placeholder.svg"}
                      alt={`${education.title} - ${key}`}
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
  );
}
