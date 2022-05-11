import Individual from "../assets/idea.png"
import Investor from "../assets/investor.png"
import Society from "../assets/society.png"
import Sustainable from "../assets/sustainable.png"
import { Business, Group, Support } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

export const ourValueData =  [
    {
       title:"Value for the Individuals",
       description:"We strive to make it easier for everyone to come up with innovative ideas that can create business and job opportunity  across the world. If you have a good intention to contribute to your favorite cause, we've got you covered.",
       body:"",
       image:<Group className="my-icons"/>,
       backgroundImg:Individual
 },
    {
       title:"Value for the Investors",
       description:"We provide business plans and particularized solutions to help investor to find right business/corporate and enable them to invest in their interested field, and support any project across the world.",
       body:"",
       image:<Business className="my-icons"/>,
       backgroundImg:Investor
 },
    {
       title:"Value for the Society",
       description:"Any non-profit organization anywhere in the world can join Tom Parker's Giving to create fundraising pages and access tools, training, individual support, and money-seeking with the help of our community.",
       body:"",
       image:<AttachMoneyOutlinedIcon className="my-icons"/>,
       backgroundImg:Society
 },
    {
       title:"Value for the Sustainable Development",
       description:"Through our rigorous process, effort and wide network, we provide foundations to sustainable development where innovation can prospher and investors get right opportunity to make the change.",
       body:"",
       image:<Support className="my-icons"/>,
       backgroundImg:Sustainable
 },
]