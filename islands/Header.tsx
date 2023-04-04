import CartModal from "../islands/CartModal.tsx";
import Navbar from "../components/Navbar.tsx";

interface Props {
  includeCart?: boolean;
}

function Header(props: Props) {
  return (
    <div>
      <Navbar includeCart={props.includeCart} />
      {props.includeCart && <CartModal />}
    </div>
  );
}

export default Header;
