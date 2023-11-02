import Map from 'ol/Map';
import * as olProj from 'ol/proj';
import View from 'ol/View';
import {
    Tile as TileLayer,
} from 'ol/layer';
import XYZ from 'ol/source/XYZ';


export default class MapTools extends Object {

    initMap(MapParams) {
        return new Map({
            target: MapParams.getId(),
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: MapParams.getUrl(),
                    })
                })
            ],
            view: new View({
                center: olProj.fromLonLat(MapParams.getCoordinates()),
                zoom: MapParams.getZoom(),
            }),
        });
    }
}
