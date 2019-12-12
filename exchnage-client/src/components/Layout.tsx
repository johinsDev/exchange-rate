import "../style.css";
import Header from "./header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <Header />
      <main className="flex-1 w-screen flex flex-col">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
