const url = 'https://team-c.hasura.app/v1/graphql';

async function createUser({userId, password, username, role}) {
  try {
    const query = {
      query: `mutation {
        insert_User(objects: {userId: "${userId}", password: "${password}", contactNumber: "${username}", role: "${role}"}) {
            returning {
                contactNumber
                userId
                preferences
            }
        }
    }`,
    };
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
      body: JSON.stringify(query),
    });
    const jsondata = await data.json();
    console.log('jsondata ', jsondata);
    return jsondata;
  } catch (err) {
    console.log('Error is ', err);
    return {Error: err};
  }
}

async function fetchSingleUser(userId) {
  console.log('userId ', userId);
  try {
    const query = {
      query: `{ 
          User_by_pk(userId: "${userId}") {
            contactNumber
            role
            userId
        }
    }`,
    };
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
      body: JSON.stringify(query),
    });
    const jsondata = await data.json();
    console.log('jsondata ', jsondata);
    return jsondata.data.User_by_pk;
  } catch (err) {
    console.log('Error is ', err);
    return {Error: err};
  }
}

async function fetchJobs() {
  try {
    const query = {
      query: `{
        Job(order_by: {startDate: desc}) {
          jobId
          userId
          jobTitle
          startDate
          salary
          jobDescription
          preferencesType
          companyName
          companyDetail
        }
      }`,
    };
    const data = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
      body: JSON.stringify(query),
    });
    const jsondata = await data.json();
    console.log('jsondata ', jsondata);
    return jsondata.data.Job;
  } catch (err) {
    console.log('Error is ', err);
    return {Error: err};
  }
}
export {createUser, fetchSingleUser, fetchJobs};
