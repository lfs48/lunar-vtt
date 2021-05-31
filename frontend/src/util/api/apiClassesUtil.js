// Get all classes
// GET /classes
export async function getAllClasses() {
  const url = `/api/classes`;
  const req = {
    method: 'GET',
  };
  return fetch(url, req)
  .then( (res) => res.json() )
  .then( data => data )
  .catch( (err) => err );
}

// Create class
// POST /classes
export async function postClass({formData}) {
  const url = `/api/classes`;
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

// Edit class
// PATCH /classes/:classId
export async function patchClass({id, formData}) {
  const url = `/api/classes/${id}`;
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

// Delete class
// DELETE /classes/:classId
export async function deleteClass({id}) {
  const url = `/api/classes/${id}`;
  const req = {
    method: 'DELETE',
  };
  return fetch(url, req)
  .then( (res) => res.json() )
  .then( data => data )
  .catch( (err) => err );
}