import Nav from "./components/Navigation";
import "./globals.css";
import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Financial Budget Tracker",
  description:
    "Useful and user friendly tool to keep track of your daily expenes || Developed by Hassan Jarko",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <FinanceContextProvider>
            <ToastContainer />
            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
