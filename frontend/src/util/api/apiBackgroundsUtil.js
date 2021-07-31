// Get all backgrounds
// GET /backgrounds
export async function getAllbackgrounds() {
    const url = `/api/backgrounds`;
    const req = {
      method: 'GET',
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }
  
  // Create background
  // POST /backgrounds
  export async function postBackground({formData}) {
    const url = `/api/backgrounds`;
    const req = {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }
  
  // Edit background
  // PATCH /backgrounds/:bgId
  export async function patchBackground({id, formData}) {
    const url = `/api/backgrounds/${id}`;
    const req = {
      method: 'PATCH',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }
  
  // Delete background
  // DELETE /backgrounds/:bgId
  export async function deleteBackground({id}) {
    const url = `/api/backgrounds/${id}`;
    const req = {
      method: 'DELETE',
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }