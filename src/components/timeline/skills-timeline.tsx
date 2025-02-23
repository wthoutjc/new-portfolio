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
import { SKILL_CATEGORIES } from "@/lib/constants/skill-categories";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SkillsTimelineProps {
  userSkills: (UsersSkills & {
    skill: Skills;
  })[];
}

const ELEGANT_COLORS = [
  "#2E3B55", // Azul marino profundo
  "#4A5568", // Gris azulado
  "#553C9A", // Púrpura profundo
  "#6B46C1", // Púrpura real
  "#805AD5", // Púrpura medio
  "#9F7AEA", // Lavanda
  "#B794F4", // Lavanda claro
  "#D6BCFA", // Púrpura suave
  "#E9D8FD", // Lila
  "#FAF5FF", // Lavanda muy claro
];

const levelNumberDict = {
  [SkillLevel.EXPERT]: 4,
  [SkillLevel.COMPETENT]: 3,
  [SkillLevel.BEGINNER]: 2,
  [SkillLevel.NO_EXPERIENCE]: 1,
};

const SENIORITY_COLORS = {
  [SkillLevel.EXPERT]: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-200 dark:border-purple-800",
  },
  [SkillLevel.COMPETENT]: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800",
  },
  [SkillLevel.BEGINNER]: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-800",
  },
  [SkillLevel.NO_EXPERIENCE]: {
    bg: "bg-gray-100 dark:bg-gray-900/20",
    text: "text-gray-800 dark:text-gray-200",
    border: "border-gray-200 dark:border-gray-800",
  },
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

  const pieData = userSkills
    .reduce((acc, userSkill) => {
      // Encontrar la categoría a la que pertenece la habilidad
      const foundCategory = Object.entries(SKILL_CATEGORIES).find(
        ([, category]) =>
          category.skills.some(
            (skill) =>
              skill.toLowerCase() === userSkill.skill.name.toLowerCase() ||
              userSkill.skill.name.toLowerCase().includes(skill.toLowerCase())
          )
      );

      const categoryName = foundCategory
        ? SKILL_CATEGORIES[foundCategory[0] as keyof typeof SKILL_CATEGORIES]
            .name
        : "Otros";

      const existingCategory = acc.find((item) => item.name === categoryName);
      if (existingCategory) {
        existingCategory.value++;
      } else {
        acc.push({ name: categoryName, value: 1 });
      }
      return acc;
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // Agrupar habilidades por nivel
  const groupedSkills = userSkills.reduce((acc, skill) => {
    if (!acc[skill.level]) {
      acc[skill.level] = [];
    }
    acc[skill.level].push(skill);
    return acc;
  }, {} as Record<SkillLevel, typeof userSkills>);

  // Filtrar habilidades
  const filterSkills = (skills: typeof userSkills) => {
    return skills.filter(
      (skill) =>
        skill.skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedLevel === "all" || skill.level === selectedLevel)
    );
  };

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
                  stroke={ELEGANT_COLORS[2]}
                  fill={ELEGANT_COLORS[2]}
                  fillOpacity={0.4}
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
                <Bar dataKey="years" background={{ fill: "#000" }}>
                  {barData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ELEGANT_COLORS[index % ELEGANT_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distribution of Skills by Area</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine
                  outerRadius="80%"
                  innerRadius="40%"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value, percent }) =>
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ELEGANT_COLORS[index % ELEGANT_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} habilidades`, name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Todas las Habilidades</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar habilidad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              value={selectedLevel}
              onValueChange={(value) => setSelectedLevel(value)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filtrar por nivel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                {Object.values(SkillLevel).map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {Object.entries(groupedSkills).map(([level, skills]) => {
            const filteredSkills = filterSkills(skills);
            if (filteredSkills.length === 0) return null;

            return (
              <div key={level} className="mb-6 last:mb-0">
                <h3 className="text-lg font-semibold mb-3">{level}</h3>
                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className={`text-xs sm:text-sm mb-2 border ${
                        SENIORITY_COLORS[skill.level].bg
                      } ${SENIORITY_COLORS[skill.level].text} ${
                        SENIORITY_COLORS[skill.level].border
                      }`}
                    >
                      {skill.skill.name} ({skill.yearsOfExperience} años)
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
