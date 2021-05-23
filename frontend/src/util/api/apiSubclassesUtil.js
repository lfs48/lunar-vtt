// Get all classes
// GET /classes
export async function getAllSubclasses() {
    const url = `/api/subclasses`;
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
  export async function postSubclass({formData}) {
    const url = `/api/subclasses`;
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
  export async function patchSubclass({id, formData}) {
    const url = `/api/subclasses/${id}`;
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