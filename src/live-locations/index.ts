
export type VehicleLocation = {
    id: number;
    timestamp: number;
    trip_id: string;
    trip_direction_id: number;
    route_id: string;
    latitude: number;
    longitude: number;
    bearing: number;
    bearingString: string;
    speed: number;
    vehicle_id: string;
    vehicle_label: string;
    vehicle_licence_plate: string;
};


export async function getLiveLocations() : Promise<VehicleLocation[]> {

    const liveLocations = await fetch('http://localhost:3000/live-trips');
    const data = await liveLocations.json();

    // console.log(data);
    return data.liveVehicles || [];
};

