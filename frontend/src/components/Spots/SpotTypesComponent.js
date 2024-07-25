import { useState } from 'react';

import VineyardsIcon from './images/Vineyards.png';
import BeachIcon from './images/Beach.png';
import IslandsIcon from './images/Islands.png';
import MansionsIcon from './images/Mansions.png';
import AmazingViewsIcon from './images/Amazing_Views.png';
import NationParksIcon from './images/National_Parks.png';
import SkiingIcon from './images/Skiing.png';
import CampersIcon from './images/Campers.png';
import CabinsIcon from './images/Cabins.png';
import OMGIcon from './images/OMG.png';
import CampingIcon from './images/Camping.png';
import DesignIcon from './images/Design.png';
import ArcticIcon from './images/Arctic.png';
import TinyHomesIcon from './images/Tiny_Homes.png';
import LakeFrontIcon from './images/Lakefront.png';
import AmazingPoolsIcon from './images/Amazing_Pools.png';
import TreeHousesIcon from './images/Treehouses.png';
import SurfingIcon from './images/Surfing.png';
import AFramesIcon from './images/Aframes.png';
import CavesIcon from './images/Caves.png';
import GolfingIcon from './images/Golfing.png';
import CountrySideIcon from './images/Countryside.png';
import TrendingIcon from './images/Trending.png';
import TropicalIcon from './images/Tropical.png';
import BedBreakfastIcon from './images/Bed_Breakfasts.png';
import NewIcon from './images/New.png';
import YurtsIcon from './images/Yurts.png';
import LakeIcon from './images/Lake.png';
import RoomsIcon from './images/Rooms.png';
import FarmsIcon from './images/Farms.png';
import ChefsKitchensIcon from './images/Chef_Kitchens.png';
import EarthHomesIcon from './images/Earth_Homes.png';
import HistoricHomesIcon from './images/Historic_Homes.png';
import PlayIcon from './images/Play.png';
import IconicCityIcon from './images/Iconic_Cities.png';
import HanoksIcon from './images/Hanoks.png';
import CastlesIcon from './images/Castles.png';
import CycladicHomesIcon from './images/Cycladic_Homes.png';
import LuxeIcon from './images/Luxe.png';
import CasasParticularesIcon from './images/Casas_Particulares.png';
import TOTWIcon from './images/TOTW.png';
import ShepardsHutIcon from './images/Shepards_Hut.png';
import BarnsIcon from './images/Barn.png';
import DesertIcon from './images/Desert.png';
import MinsusIcon from './images/Minsus.png';
import DomesIcon from './images/Domes.png';
import RyokansIcon from './images/Ryokans.png';
import OTGIcon from './images/OTG.png';
import SkiInOutIcon from './images/Skiing_inout.png';
import BeachFrontIcon from './images/Beach_Front.png';
import HouseBoatsIcon from './images/House_Boats.png';
import AdaptedIcon from './images/Adapted.png';
import WindmillsIcon from './images/Windmills.png';
import GrandPianosIcon from './images/Grand_Pianos.png';
import ContainersIcon from './images/Containers.png';
import CreativeSpacesIcon from './images/Creative_Spaces.png';
import TowersIcon from './images/Towers.png';
import BoatsIcon from './images/Boats.png';
import TrulliIcon from './images/Trulli.png';
import DammusiIcon from './images/Dammusi.png';
import RiadsIcon from './images/Riads.png';

const SpotTypes = [
    {title: 'Vineyards', img: VineyardsIcon},
    {title: 'Beach', img: BeachIcon},
    {title: 'Islands', img: IslandsIcon},
    {title: 'Mansions', img: MansionsIcon},
    {title: 'Amazing views', img: AmazingViewsIcon},
    {title: 'National parks', img: NationParksIcon},
    {title: 'Skiing', img: SkiingIcon},
    {title: 'Campers', img: CampersIcon},
    {title: 'Cabins', img: CabinsIcon},
    {title: 'OMG!', img: OMGIcon},
    {title: 'Camping', img: CampingIcon},
    {title: 'Design', img: DesignIcon},
    {title: 'Arctic', img: ArcticIcon},
    {title: 'Tiny homes', img: TinyHomesIcon},
    {title: 'Lakefront', img: LakeFrontIcon},
    {title: 'Amazing pools', img: AmazingPoolsIcon},
    {title: 'Treehouses', img: TreeHousesIcon},
    {title: 'Surfing', img: SurfingIcon},
    {title: 'A-frames', img: AFramesIcon},
    {title: 'Caves', img: CavesIcon},
    {title: 'Golfing', img: GolfingIcon},
    {title: 'Countryside', img: CountrySideIcon},
    {title: 'Trending', img: TrendingIcon},
    {title: 'Tropical', img: TropicalIcon},
    {title: 'Bed & breakfasts', img: BedBreakfastIcon},
    {title: 'New', img: NewIcon},
    {title: 'Yurts', img: YurtsIcon},
    {title: 'Lake', img: LakeIcon},
    {title: 'Rooms', img: RoomsIcon},
    {title: 'Farms', img: FarmsIcon},
    {title: 'Chef\'s kitchens', img: ChefsKitchensIcon},
    {title: 'Earth homes', img: EarthHomesIcon},
    {title: 'Historical homes', img: HistoricHomesIcon},
    {title: 'Play', img: PlayIcon},
    {title: 'Iconic cities', img: IconicCityIcon},
    {title: 'Hanoks', img: HanoksIcon},
    {title: 'Castles', img: CastlesIcon},
    {title: 'Cycladic homes', img: CycladicHomesIcon},
    {title: 'Luxe', img: LuxeIcon},
    {title: 'Casas particulares', img: CasasParticularesIcon},
    {title: 'Top of the world', img: TOTWIcon},
    {title: 'Shepherd\'s huts', img: ShepardsHutIcon},
    {title: 'Barns', img: BarnsIcon},
    {title: 'Desert', img: DesertIcon},
    {title: 'Minsus', img: MinsusIcon},
    {title: 'Domes', img: DomesIcon},
    {title: 'Ryokans', img: RyokansIcon},
    {title: 'Off-the-grid', img: OTGIcon},
    {title: 'Ski-in/out', img: SkiInOutIcon},
    {title: 'Beachfront', img: BeachFrontIcon},
    {title: 'Houseboats', img: HouseBoatsIcon},
    {title: 'Adapted', img: AdaptedIcon},
    {title: 'Windmills', img: WindmillsIcon},
    {title: 'Grand pianos', img: GrandPianosIcon},
    {title: 'Containers', img: ContainersIcon},
    {title: 'Creative spaces', img: CreativeSpacesIcon},
    {title: 'Towers', img: TowersIcon},
    {title: 'Boats', img: BoatsIcon},
    {title: 'Trulli', img: TrulliIcon},
    {title: 'Dammusi', img: DammusiIcon},
    {title: 'Riads', img: RiadsIcon}
]

const SpotTypesComponent = () => {
    const [optionStart, setOptionStart] = useState(0);
    const [optionEnd, setOptionEnd] = useState(12);

    return (
        <div id='spottypes-wrapper'>
            <div id='spottypes-types'>
                {SpotTypes.map((el, i) => 
                    <div class="spottypes-types-element" key={i}>
                        <img src={el.img} alt={el.title}/>
                        <p>{el.title}</p>
                    </div>
                )}
            </div>

            <div id='spottypes-filters'>

            </div>

        </div>
    )
};

export default SpotTypesComponent;