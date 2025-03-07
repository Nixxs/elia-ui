const images = [
	"annie-spratt-AFB6S2kibuk-unsplash.jpg",
	"christine-roy-ir5MHI6rPg0-unsplash.jpg",
	"clay-banks-b5S4FrJb7yQ-unsplash.jpg",
	"dariusz-sankowski-3OiYMgDKJ6k-unsplash.jpg",
	"tamas-tuzes-katai-rEn-AdBr3Ig-unsplash.jpg"
]

function getRandomImage() {
	const index = Math.floor(Math.random() * images.length);
	return `url(/${images[index]})`;
}

export { getRandomImage };