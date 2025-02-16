import Link from "next/link";

const SideMe = () => {
  return (
    <div className="flex flex-col p-2 opacity-60 hover:opacity-100 ease-in-out duration-300 lg:w-1/4 md:w-full">
      <div className="flex sticky top-10 md:mt-10 md:flex-col lg:flex-col">
        <div>Image</div>
        <div className="w-2/3">
          <p className="font-bold mb-2 text-xs md:text-lg">
            Juan Camilo Ramírez Rátiva
          </p>
          <p className="text-xs md:text-base md:mb-5">
            Systems Engineer | Tech Lead | Enterprise Automation Solutions
            Developer
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-map-pin mr-2"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
            </svg>
            <p className="md:text-xs lg:text-sm">
              Madrid, Cundinamarca, Colombia.
            </p>
          </div>
          <div className="flex flex-col">
            <Link
              href="mailto:juancamilorr2012@hotmail.com"
              className="flex md:text-xs lg:text-sm hover:underline mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-mail mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                <path d="M3 7l9 6l9 -6" />
              </svg>
              <p>Email</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/juan-camilo-ramirez/"
              className="flex md:text-xs lg:text-sm hover:underline mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-linkedin mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M8 11l0 5" />
                <path d="M8 8l0 .01" />
                <path d="M12 16l0 -5" />
                <path d="M16 16v-3a2 2 0 0 0 -4 0" />
              </svg>
              <p>LinkedIn</p>
            </Link>
            <Link
              href="https://github.com/wthoutjc"
              className="flex md:text-xs lg:text-sm hover:underline mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-brand-github mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              <p>GitHub</p>
            </Link>
            <Link
              href="https://drive.google.com/file/d/1HTYe6vwNlGoSwT_pOVuxZS_lz6Yh3r-_/view?usp=sharing"
              className="flex md:text-xs lg:text-sm hover:underline mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-file-cv mr-2"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#2c3e50"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                <path d="M11 12.5a1.5 1.5 0 0 0 -3 0v3a1.5 1.5 0 0 0 3 0" />
                <path d="M13 11l1.5 6l1.5 -6" />
              </svg>
              <p>CV</p>
            </Link>
          </div>
          <div className="block md:hidden">
            <button>
              <p className="text-xs">Socials</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SideMe };
