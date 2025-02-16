import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";
import { Experience } from "@/lib/interfaces/experience";

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="space-y-8">
      {experiences.map((experience) => (
        <Card key={experience.id} className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">
              {experience.title}
            </CardTitle>
            <div className="text-sm text-gray-500 flex items-center">
              <BriefcaseIcon className="w-4 h-4 mr-1" />
              {experience.company}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {new Date(experience.startDate).toLocaleDateString()} -
              {experience.endDate
                ? new Date(experience.endDate).toLocaleDateString()
                : "Present"}
            </div>
            {experience.location && (
              <div className="text-sm text-gray-500 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {experience.location}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{experience.description}</p>
            <div className="flex flex-wrap gap-2">
              {experience.experienceSkills.map(({ skillId }) => (
                <Badge key={skillId} variant="secondary">
                  {skillId}
                </Badge>
              ))}
            </div>
            {experience.multimedia && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(
                  experience.multimedia as Record<string, string>
                ).map(([key, url]) => (
                  <Image
                    key={key}
                    src={url || "/placeholder.svg"}
                    alt={`${experience.title} - ${key}`}
                    className="rounded-md shadow-md"
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
