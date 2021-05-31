// Get all features
// GET /features
export async function getAllFeatures() {
  const url = `/api/features`;
  const req = {
    method: 'GET',
  };
  return fetch(url, req)
  .then( (res) => res.json() )
  .then( data => data )
  .catch( (err) => err );
}
  
// Create feature
// POST /features
export async function postFeature({formData}) {
  const url = `/api/features`;
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
  
// Edit feature
// PATCH /features/:featureId
export async function patchFeature({id, formData}) {
  const url = `/api/features/${id}`;
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

// Delete feature
// DELETE /features/:classId
export async function deleteFeature({id}) {
  const url = `/api/features/${id}`;
  const req = {
    method: 'DELETE',
  };
  return fetch(url, req)
  .then( (res) => res.json() )
  .then( data => data )
  .catch( (err) => err );
}