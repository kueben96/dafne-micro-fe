
export default class MapParams extends Object {

    constructor(zoom, coordinates, bearing, id, url) {
        super();
        this.zoom = zoom;
        this.coordinates = coordinates;
        this.bearing = bearing;
        this.id = id;
        this.url = url;
    }

    getZoom() { return this.zoom; }

    setZoom(zoom) { this.zoom = zoom; }

    getCoordinates() { return this.coordinates; }

    setCoordinates(coordinates) { this.coordinates = coordinates; }

    getBearing() { return this.bearing; }

    setBearing(bearing) { this.bearing = bearing; }

    getId() { return this.id; }

    setId(id) { this.id = id; }

    getUrl() { return this.url; }

    setUrl(url) { this.url = url; }
}