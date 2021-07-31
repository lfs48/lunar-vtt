// Get all races
// GET /races
export async function getAllRaces() {
    const url = `/api/races`;
    const req = {
      method: 'GET',
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }
  
  // Create race
  // POST /races
  export async function postRace({formData}) {
    const url = `/api/races`;
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
  
  // Edit race
  // PATCH /races/:raceId
  export async function patchRace({id, formData}) {
    const url = `/api/races/${id}`;
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
  
  // Delete race
  // DELETE /races/:raceId
  export async function deleteRace({id}) {
    const url = `/api/races/${id}`;
    const req = {
      method: 'DELETE',
    };
    return fetch(url, req)
    .then( (res) => res.json() )
    .then( data => data )
    .catch( (err) => err );
  }