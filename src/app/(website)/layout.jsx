import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";

export default function WebsiteLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
