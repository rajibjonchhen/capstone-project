import MyFooter from "../footer/MyFooter";
import MyNavbar from "../myNavbar/MyNavbar";

function MyLayout({children}) {
    return ( <>
        <MyNavbar/>
        {children}
        <MyFooter/>
    </>
     );
}

export default MyLayout;