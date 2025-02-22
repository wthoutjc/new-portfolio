"use client";
import { Education } from "@/lib/interfaces/education";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookOpenIcon, GraduationCapIcon } from "lucide-react";
import { motion } from "motion/react";
import { MultimediaCarousel } from "../ui/multimedia-carousel/multimedia-carousel";
import { MultimediaFile } from "@/lib/interfaces/multimedia";

interface EducationTimelineProps {
  educations: Education[];
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
              {education.multimedia &&
                Array.isArray(education.multimedia) &&
                education.multimedia.length > 0 && (
                  <div className="w-full items-center justify-center md:hidden p-14">
                    <MultimediaCarousel
                      files={education.multimedia as MultimediaFile[]}
                    />
                  </div>
                )}
            </CardContent>
          </Card>
          {education.multimedia &&
          Array.isArray(education.multimedia) &&
          education.multimedia.length > 0 ? (
            <div className="hidden md:flex w-8 md:w-1/2 p-20 items-end justify-end">
              <MultimediaCarousel
                files={education.multimedia as MultimediaFile[]}
              />
            </div>
          ) : (
            <div className="hidden md:flex w-8 md:w-1/2 justify-center items-center">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg"></div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
