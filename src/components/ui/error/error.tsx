import Image from "next/image";

interface Props {
  message?: string;
}

const Error = ({ message = "Lo sentimos, ha ocurrido un error" }: Props) => {
  return (
    <div className="flex flex-col w-full justify-start items-center p-3">
      <Image
        src="https://res.cloudinary.com/ddmeptk5c/image/upload/f_auto,q_auto/v1/portfolio/zuvtlwc26x7pj15k8lzo"
        width={100}
        height={50}
        className="w-auto h-auto"
        alt="ccb-error"
      />
      <p className="mt-4 font-bold text-2xl text-red-500">
        Apreciado(a) usuario(a)
      </p>
      <p className="mt-4 font-semibold text-xl">{message}</p>
      <div className="flex flex-col md:flex-row">
        <p className="mt-4 font-light text-sm italic">
          Contacta con nuestro equipo de soporte en
        </p>
        <a href="mailto:ayudacampusvirtual@ccb.org.co">
          <p className="mt-4 font-light text-sm italic ml-1 text-blue-600 ">
            {" "}
            support@ionjc.com
          </p>
        </a>
      </div>
    </div>
  );
};

export { Error };
