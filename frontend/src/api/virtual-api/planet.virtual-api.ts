import { http, HttpResponse } from "msw";

export const mockPlanetList = [
  {
    id: 1,
    name: "Racoon",
    description:
      "The planet of the amazing Racoon of Asguards. You can access this planet with your ship or thought the Bifrost.",
    image: {
      name: "Raccon planet image",
      path: "https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/26/AsgardFull.jpg/revision/latest?cb=20220709021326",
    },
    isHabitable: true,
  },
  {
    id: 2,
    name: "Schizo",
    description:
      "The planet of the crazy cats. The craziest and salty planet in the galaxy.",
    image: {
      name: "Schizo planet image",
      path: "https://planets-assets.eleven-labs.com/planet/planete-Skizo.png",
    },
    isHabitable: true,
  },
  {
    id: 3,
    name: "Pandora",
    description:
      "The planet of the Navi. They live in harmony with the nature and the planet.",
    image: {
      name: "Pandora planet image",
      path: "https://static.wikia.nocookie.net/jamescameronsavatar/images/c/c6/Pandora_Visual_Dictionary.png/revision/latest?cb=20231202070727",
    },
    isHabitable: true,
  },
  {
    id: 4,
    name: "Mustafar",
    description: "Mustafar planet image",
    image: {
      name: "Mustatfar planet image",
      path: "https://i.imgur.com/ea2xYP6.jpg",
    },
    isHabitable: false,
  },
];

export const getPlanetListHandler = http.get(
  `http://${import.meta.env.VITE_API_URL}/planets`,
  ({ request }) => {
    // handle filter by name
    const url = new URL(request.url);
    const nameSearchTerm = url.searchParams.get("name");

    const filteredList = nameSearchTerm
      ? mockPlanetList.filter((planet) => planet.name.includes(nameSearchTerm))
      : mockPlanetList;
    return HttpResponse.json(filteredList);
  },
);

export const getPlanetListErrorHandler = http.get(
  `http://${import.meta.env.VITE_API_URL}/planets`,
  () => {
    return new HttpResponse(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  },
);

export const getPlanetListByNameHandler = http.get(
  `https://${import.meta.env.VITE_API_URL}/planets?name=:name`,
  ({ params }) => {
    const filteredList = params.name
      ? mockPlanetList.filter((planet) =>
          planet.name.includes(params.name as string),
        )
      : mockPlanetList;

    return HttpResponse.json(filteredList);
  },
);
