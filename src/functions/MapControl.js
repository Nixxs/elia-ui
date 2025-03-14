const processFeatureBounds = (feature, bounds) => {
    feature.getGeometry().forEachLatLng((latLng) => {
        bounds.extend(latLng);
    });
};

const updateMapData = async (map, geojson) => {
    if (!map || !map.dataLayer) {
        console.error("Map or Data Layer not initialized.");
        return null;
    }

    // Clear existing data
    map.dataLayer.forEach((feature) => {
        map.dataLayer.remove(feature);
    });

    console.log("Incoming GeoJSON:", geojson);

    // Add GeoJSON to data layer
    map.dataLayer.addGeoJson(geojson);

    // Create bounds object
    const bounds = new google.maps.LatLngBounds();

    // Extend bounds to include all features in data layer
    map.dataLayer.forEach((feature) => {
        processFeatureBounds(feature, bounds);
    });

    // Fit map to bounds if not empty
    if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
    } else {
        console.warn("No valid geometry to fit bounds.");
    }

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
