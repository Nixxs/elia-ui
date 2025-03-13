const addMarker = (map, lat, lng, title = "") => {
    if (!map) return null;

    const position = { lat, lng }

    const marker = new window.google.maps.Marker({
        position: position,
        map,
        title,
    });

    map.panTo(position);
    return marker;
};

export {
    addMarker
}
