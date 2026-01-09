import Link from "next/link";
import CartDrawer from "../cart/CartDrawer";
import { Container } from "@mui/material";

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <div className=" shadow bg-white">
        <Container maxWidth="lg">
          <div className=" py-3 flex items-center justify-between">
            <Link href="/">
              <h2 className="font-semibold text-xl">Damatag Test</h2>
            </Link>
            <CartDrawer />
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
