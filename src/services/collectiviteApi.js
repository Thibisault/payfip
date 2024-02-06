import http from './axios';

class CollectiviteService {
  getAll() {
    return http.get("/collectivites");
  }

  get(id) {
    return http.get(`/collectivites/${id}`);
  }

  getByCodeCol(codeCol) {
    return http.get(`/collectivites/code/${codeCol}`);
  }
  
  create(data) {
    return http.post("/collectivites", data);
  }

  update(id, data) {
    return http.put(`/collectivites/${id}`, data);
  }

  delete(id) {
    return http.delete(`/collectivites/${id}`);
  }

  deleteAll() {
    return http.delete("/collectivites");
  }
  
}

export default new CollectiviteService();
