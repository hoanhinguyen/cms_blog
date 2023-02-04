const dev = process.env.NODE_ENV !== "production";
export const server = dev ? "http://localhost:3000" : "https://cms-blog-c71wdg159-hoanhinguyen.vercel.app";