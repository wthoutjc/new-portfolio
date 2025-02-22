"use client";

import Image from "next/image";

// Zustand
import { useUIStore } from "@/zustand/store";

// Interfaces
import { AlertDialog } from "@/lib/interfaces/ui";
import { cn } from "@/lib/utils";

const MeImage = ({ className }: { className?: string }) => {
  return (
    <Image
      className={cn("w-250 h-250", className)}
      src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/mbxscisbe6yacaa7lkky"
      alt="ionjc"
      width={300}
      height={300}
    />
  );
};

const MeImageCard = () => {
  const { setAlertDialog } = useUIStore();

  const handleShowModal = () => {
    const alertDialog: AlertDialog = {
      title: "Juan Camilo Ramírez Rátiva",
      description: "🚀 About me:",
      open: true,
      children: (
        <div className="flex flex-col items-center justify-center">
          <MeImage className="rounded-full w-96 h-96 mb-10" />
          <p className="whitespace-break-spaces text-left text-primary text-sm">
            {`I am a dedicated Fullstack Developer with extensive expertise in AWS, Python, and TypeScript, committed to delivering innovative, efficient, and high-quality software solutions. I excel in applying advanced design principles and industry best practices to drive impactful results.

🌟 Outstanding skills:

    🏗 Architecture patterns : Experience in event-driven and resource-oriented patterns, optimizing scalability and modularity.

    ✅ Strong development practices: Applying SOLID principles and design patterns to ensure maintainable and reusable code.

    🔄 Agile methodologies: Leveraging frameworks like Scrum, Kanban, and XP to enhance team productivity.

    🧑‍🏫 Training and mentoring: Training teams in best practices, technical decision-making, and continuous improvement.

    💡 Specialized support: Resolving complex issues and designing tailored solutions for infrastructure and software.

    🛠 Technical decision making: Evaluation of tools, technologies and strategies to ensure efficient and effective solutions.

📈 Experience and background:

    🎓 Systems Engineer with Data Science certification, backed by a proven track record in delivering complex solutions.

I am always looking for new challenges and opportunities to keep growing and contributing to the success of innovative projects. 🚀`}
          </p>
        </div>
      ),
    };

    setAlertDialog(alertDialog);
  };

  return (
    <div
      className="flex justify-start w-full mb-4 overflow-auto"
      onClick={() => handleShowModal()}
    >
      <MeImage className="object-cover rounded-full w-36 h-36" />
    </div>
  );
};

export { MeImage, MeImageCard };
