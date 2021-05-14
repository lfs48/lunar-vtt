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