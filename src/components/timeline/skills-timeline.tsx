"use client";

import type { UsersSkills, Skills } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Enums
import { SkillLevel } from "@/lib/enums/skill.enum";

interface SkillsTimelineProps {
  userSkills: (UsersSkills & {
    skill: Skills;
  })[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const levelNumberDict = {
  [SkillLevel.EXPERT]: 4,
  [SkillLevel.COMPETENT]: 3,
  [SkillLevel.BEGINNER]: 2,
  [SkillLevel.NO_EXPERIENCE]: 1,
};

export default function SkillsTimeline({ userSkills }: SkillsTimelineProps) {
  const radarData = userSkills.map((userSkill) => ({
    skill: userSkill.skill.name,
    level: levelNumberDict[userSkill.level],
  }));

  const barData = userSkills
    .map((userSkill) => ({
      skill: userSkill.skill.name,
      years: userSkill.yearsOfExperience,
    }))
    .sort((a, b) => b.years - a.years)
    .slice(0, 10);

  const pieData = userSkills.reduce((acc, userSkill) => {
    const source = userSkill.source;
    const existingSource = acc.find((item) => item.name === source);
    if (existingSource) {
      existingSource.value++;
    } else {
      acc.push({ name: source, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Skills Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 4]} />
                <Radar
                  name="Skill Level"
                  dataKey="level"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Years of Experience (Top 10)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <XAxis type="number" />
                <YAxis
                  dataKey="skill"
                  type="category"
                  width={100}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="years" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>All Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userSkills.map((userSkill) => (
              <Badge
                key={userSkill.id}
                variant="secondary"
                className="text-xs sm:text-sm mb-2"
              >
                {userSkill.skill.name} - {userSkill.level} (
                {userSkill.yearsOfExperience} years)
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
