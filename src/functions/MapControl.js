const addPointToGeojsonLayer = async (map, lat, lng, label = "") => {
	if (!map || !map.dataLayer) {
		console.error("Map or Data Layer not initialized.");
		return null;
	}

	// Create a GeoJSON Feature for the point
	const pointFeature = {
		type: "Feature",
		geometry: {
			type: "Point",
			coordinates: [lng, lat],
		},
		properties: {
			label: label,
		},
	};

	// Add point to existing data layer
	map.dataLayer.addGeoJson({
		type: "FeatureCollection",
		features: [pointFeature],
	});

	// Optionally pan to point
	map.panTo({ lat, lng });

	console.log("Point added to GeoJSON layer:", pointFeature);
	return pointFeature;
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

export { addPointToGeojsonLayer, getGeoJsonFromDataLayer };
