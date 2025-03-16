import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
import {NavigationComponent} from "./navigations";


export const Sidebar = () => {
    return (
       <Wrapper>
        <Toggle/>
      <NavigationComponent/>
       </Wrapper>
    );
}