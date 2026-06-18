// Real project screenshots from /public/projects
// Paths are URL-encoded (spaces -> %20) so they resolve correctly.
export type Project = {
  name: string;
  category: "Web Dev" | "UI/UX";
  tag: string;
  img: string;
};

export const projectsCatalog: Project[] = [
  { name: "Chinar Logistics", category: "Web Dev", tag: "Logistics website", img: "/projects/Chinar.webp" },
  { name: "Nagpal Tours", category: "Web Dev", tag: "Travel website", img: "/projects/NagpalToursTravels.webp" },
  { name: "Opal Institute", category: "Web Dev", tag: "Education website", img: "/projects/Opal.webp" },
  { name: "Perfect Group", category: "Web Dev", tag: "Corporate website", img: "/projects/Perfect.webp" },
  { name: "Pmake", category: "Web Dev", tag: "Brand website", img: "/projects/Pmake.webp" },
  { name: "Rajasthan Auto", category: "Web Dev", tag: "Distributor website", img: "/projects/RajasthanAutoDistributor.webp" },
  { name: "Ruhani Trips", category: "Web Dev", tag: "Travel website", img: "/projects/RuhaniTrips%20(1).webp" },
  { name: "Tripsee", category: "Web Dev", tag: "Travel platform", img: "/projects/Tripsee%20(3).webp" },
  { name: "WoodyPolo", category: "Web Dev", tag: "E-commerce store", img: "/projects/WoodyPolo.webp" },
  { name: "Finance App", category: "UI/UX", tag: "Mobile app UI", img: "/projects/Finance%20App%20UI.webp" },
  { name: "Photographer Studio", category: "UI/UX", tag: "Portfolio UI", img: "/projects/PhotographerUi%20Design.webp" },
  { name: "Travel Explorer", category: "UI/UX", tag: "Travel app UI", img: "/projects/Travel%20Ui.webp" },
  { name: "Wanderlust", category: "UI/UX", tag: "Landing page UI", img: "/projects/Travel%20landaing%20Ui%20Design.webp" },
  { name: "Shopfront", category: "UI/UX", tag: "E-commerce UI", img: "/projects/ecomerce%20ui.webp" },
];
