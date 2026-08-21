import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const publicApi = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const secureApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ----- Public endpoints -----

/** GET /api/pets — search, filter, sort & paginate */
export async function getPets(params = {}) {
  const { data } = await publicApi.get("/api/pets", { params });
  return data;
}

/** GET /api/pets/featured — latest available pets for the home page */
export async function getFeaturedPets() {
  const { data } = await publicApi.get("/api/pets/featured");
  return data;
}

/** GET /api/pets/:id */
export async function getPetById(id) {
  const { data } = await publicApi.get(`/api/pets/${id}`);
  return data;
}

// ----- Protected endpoints -----

/** POST /api/pets */
export async function createPet(payload) {
  const { data } = await secureApi.post("/api/pets", payload);
  return data;
}

/** PUT /api/pets/:id — owner only */
export async function updatePet(id, payload) {
  const { data } = await secureApi.put(`/api/pets/${id}`, payload);
  return data;
}

/** DELETE /api/pets/:id — owner only */
export async function deletePet(id) {
  const { data } = await secureApi.delete(`/api/pets/${id}`);
  return data;
}

/** GET /api/pets/my-listings */
export async function getMyListings() {
  const { data } = await secureApi.get("/api/pets/my-listings");
  return data;
}

/** GET /api/pets/stats */
export async function getDashboardStats() {
  const { data } = await secureApi.get("/api/pets/stats");
  return data;
}
