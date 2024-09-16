import { Carousel } from "./Components/Carousel";
import { ExploreTopBooks } from "./Components/ExploreTopBooks";
import { Heros } from "./Components/Heros";
import { LibraryServices } from "./Components/LiabraryServices";

export const HomePage=()=>{
    return(
        <>
            <ExploreTopBooks/>
            <Carousel/>
            <Heros/>
            <LibraryServices/>
        </>
    );

}