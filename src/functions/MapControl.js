const updateMapData = async (map, geojson) => {
	if (!map || !map.dataLayer) {
		console.error("Map or Data Layer not initialized.");
		return null;
	}

	// Clear existing data if needed
    map.dataLayer.forEach((feature) => {
        map.dataLayer.remove(feature);
    });

    console.log(geojson);

	// Add the incoming GeoJSON data to the map's data layer
	map.dataLayer.addGeoJson(geojson);

	// Optional: Zoom or pan to the new data, depending on geometry type
	const bounds = new google.maps.LatLngBounds();
	geojson.features.forEach((feature) => {
		const coords = feature.geometry.coordinates;
		switch (feature.geometry.type) {
			case "Point":
				bounds.extend({ lat: coords[1], lng: coords[0] });
				break;
			case "LineString":
			case "Polygon":
				coords.flat(Infinity).forEach(([lng, lat]) => bounds.extend({ lat, lng }));
				break;
			// Add more geometry handling as needed
		}
	});
	map.fitBounds(bounds);

	console.log("GeoJSON data updated on map:", geojson);
	return geojson;
};

const getGeoJsonFromDataLayer = async (map) => {
	if (!map || !map.dataLayer) {
		console.error("Map or Data Layer not initialized.");
		return "";
	}

	const featurePromises = [];

	map.dataLayer.forEach((feature) => {
		featurePromises.push(
			new Promise((resolve) => {
				feature.toGeoJson((geoJsonFeature) => resolve(geoJsonFeature));
			})
		);
	});

	const features = await Promise.all(featurePromises);

	const featureCollection =
		features.length > 0
			? {
					type: "FeatureCollection",
					features: features,
			  }
			: "";

	return featureCollection ? JSON.stringify(featureCollection) : "";
};

export { updateMapData, getGeoJsonFromDataLayer };
