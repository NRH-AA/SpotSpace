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


import AdaptedIcon from './images/Adapted.png';


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
    {title: 'Amazing pools', img: ''},
    {title: 'Treehouses', img: ''},
    {title: 'Surfing', img: ''},
    {title: 'A-frames', img: ''},
    {title: 'Caves', img: ''},
    {title: 'Golfing', img: ''},
    {title: 'Countryside', img: ''},
    {title: 'Trending', img: ''},
    {title: 'Tropical', img: ''},
    {title: 'Bed & breakfasts', img: ''},
    {title: 'New', img: ''},
    {title: 'Yurts', img: ''},
    {title: 'Lake', img: ''},
    {title: 'Rooms', img: ''},
    {title: 'Farms', img: ''},
    {title: 'Chef\'s kitchens', img: ''},
    {title: 'Earth homes', img: ''},
    {title: 'Historical homes', img: ''},
    {title: 'Play', img: ''},
    {title: 'Iconic cities', img: ''},
    {title: 'Hanoks', img: ''},
    {title: 'Castles', img: ''},
    {title: 'Cycladic homes', img: ''},
    {title: 'Luxe', img: ''},
    {title: 'Casas particulares', img: ''},
    {title: 'Top of the world', img: ''},
    {title: 'Shepherd\'s huts', img: ''},
    {title: 'Barns', img: ''},
    {title: 'Desert', img: ''},
    {title: 'Minsus', img: ''},
    {title: 'Domes', img: ''},
    {title: 'Ryokans', img: ''},
    {title: 'Off-the-grid', img: ''},
    {title: 'Ski-in/out', img: ''},
    {title: 'Beachfront', img: ''},
    {title: 'Houseboats', img: ''},
    {title: 'Houseboats', img: ''},
    {title: 'Adapted', img: AdaptedIcon},
    {title: 'Windmills', img: ''},
    {title: 'Grand pianos', img: ''},
    {title: 'Containers', img: ''},
    {title: 'Creative spaces', img: ''},
    {title: 'Towers', img: ''},
    {title: 'Boats', img: ''},
    {title: 'Trulli', img: ''},
    {title: 'Dammusi', img: ''},
    {title: 'Riads', img: ''}
]

const SpotTypesComponent = () => {
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