import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const secureApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

/** POST /api/pets/:id/requests — submit an adoption request */
export async function createAdoptionRequest(petId, payload) {
  const { data } = await secureApi.post(`/api/pets/${petId}/requests`, payload);
  return data;
}

/** GET /api/my-requests — requests made by the logged-in user */
export async function getMyRequests() {
  const { data } = await secureApi.get("/api/my-requests");
  return data;
}

/** GET /api/owner-requests — requests for the logged-in user's pets */
export async function getOwnerRequests() {
  const { data } = await secureApi.get("/api/owner-requests");
  return data;
}

/** GET /api/pets/:id/requests — all requests for one of the owner's pets */
export async function getPetRequests(petId) {
  const { data } = await secureApi.get(`/api/pets/${petId}/requests`);
  return data;
}

/** PATCH /api/requests/:id/status — approve / reject (owner only) */
export async function updateRequestStatus(id, status) {
  const { data } = await secureApi.patch(`/api/requests/${id}/status`, { status });
  return data;
}

/** DELETE /api/requests/:id — cancel a request */
export async function deleteRequest(id) {
  const { data } = await secureApi.delete(`/api/requests/${id}`);
  return data;
}
