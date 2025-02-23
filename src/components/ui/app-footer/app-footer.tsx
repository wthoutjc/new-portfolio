import Link from "next/link";

const AppFooter = () => {
  return (
    <footer className="relative flex max-w-full p-5 justify-center group">
      <div className="flex flex-col max-w-7xl w-full">
        {/* Sección de redes sociales */}
        <section className="flex space-x-4">
          <h3 className="text-sm font-semibold mb-3">Connect with me:</h3>
          <div className="flex gap-4">
            <Link
              href="https://github.com/wthoutjc"
              target="_blank"
              className="hover:text-blue-600 transition-colors"
            >
              <p className="text-sm">GitHub</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/juan-camilo-ramirez/"
              target="_blank"
              className="hover:text-blue-600 transition-colors"
            >
              <p className="text-sm">LinkedIn</p>
            </Link>
          </div>
        </section>

        {/* Sección de copyright */}
        <section className="mt-0">
          <p className="text-xs text-gray-600 dark:text-gray-300">
            © {new Date().getFullYear()} IONJC. All rights reserved under the
            MIT license.
            <span className="ml-2">
              Developed with{" "}
              <Link
                href="https://nextjs.org/"
                target="_blank"
                className="font-semibold hover:text-blue-600 transition-colors"
              >
                Next.js
              </Link>
            </span>
          </p>
        </section>

        {/* Botón de login */}
        <div className="absolute bottom-4 right-4">
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
          >
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
};

export { AppFooter };
