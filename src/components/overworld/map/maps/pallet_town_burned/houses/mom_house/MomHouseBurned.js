import mapDown from "../../../../../../../assets/graphics/maps/pallet_town_burned/houses/mom_house/down.png";
import mapUp from "../../../../../../../assets/graphics/maps/pallet_town_burned/houses/mom_house/up.png";


export const MomHouseBurned = {
    id: "MomHouseBurned",
    lowerSrc: mapDown,
    upperSrc: mapUp,
    gameObjects: {},
    configObjects: {
        player: ({
            type: "Person",
            isPlayerControlled: true,
        }),
        
    },
    
}