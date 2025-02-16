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
      description: `🚀 Sobre mí:

Soy un Desarrollador Fullstack dedicado con amplia experiencia en AWS, Python y TypeScript, comprometido con la entrega de soluciones de software innovadoras, eficientes y de alta calidad. Me destaco en la aplicación de principios de diseño avanzados y mejores prácticas de la industria para impulsar resultados impactantes.

🌟 Habilidades destacadas:

🏗 Patrones de arquitectura:
• Experiencia en patrones orientados a eventos y recursos
• Optimización de escalabilidad y modularidad

✅ Prácticas sólidas de desarrollo:
• Aplicación de principios SOLID
• Patrones de diseño para código mantenible y reutilizable

🔄 Metodologías ágiles:
• Uso de frameworks como Scrum, Kanban y XP
• Mejora de la productividad del equipo

🧑‍🏫 Formación y mentoría:
• Capacitación en mejores prácticas
• Toma de decisiones técnicas
• Mejora continua

💡 Soporte especializado:
• Resolución de problemas complejos
• Diseño de soluciones personalizadas
• Infraestructura y software

🛠 Toma de decisiones técnicas:
• Evaluación de herramientas y tecnologías
• Estrategias para soluciones eficientes

📈 Experiencia y formación:

🎓 Ingeniero de Sistemas con certificación en Data Science, respaldado por un historial probado en la entrega de soluciones complejas.

Siempre estoy buscando nuevos desafíos y oportunidades para seguir creciendo y contribuyendo al éxito de proyectos innovadores. 🚀`,
      open: true,
      children: <MeImage />,
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
