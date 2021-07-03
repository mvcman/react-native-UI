const url = 'https://team-c.hasura.app/v1/graphql';
import uuid from 'react-native-uuid';

async function createUser({ userId, password, username, role }) {
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
    return { Error: err };
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
    return { Error: err };
  }
}

async function fetchJobs(userId) {
  try {
    const query = {
      query: `{
        Job(order_by: {startDate: desc}, where: {_not: {Applications: {userId: {_eq: "${userId}"}}}}) {
          jobId
          jobTitle
          preferencesType
          salary
          startDate
          userId
          jobDescription
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
    return { Error: err };
  }
}

async function updateUserDetails(userId, firstName, lastName, preferences) {
  try {
    const query = {
      query: `mutation {
        update_User(where: {userId: {_eq: "${userId}"}}, _set: { firstName: ${firstName}, lastName:${lastName}, preferences: "{${preferences}}"}) {
          affected_rows
        }
      }
        `,
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
    return jsondata.data;
  } catch (err) {
    console.log('Error is ', err);
    return { Error: err };
  }
}
const fetchPostedJobsByUser = async userId => {
  try {
    const query = {
      query: `{
            Job(order_by: {}, where: {userId: {_eq: "${userId}"}}) {
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
          }
        
          `,
    };
    const data = await fetch('https://team-c.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
      body: JSON.stringify(query),
    });
    const jsonData = await data.json();
    return jsonData.data.Job;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

const addJobMutation = async (
  userId,
  jobName,
  jobDescription,
  preferences,
  date,
  salary,
  companyName,
  companyDescription,
) => {
  try {
    const updatedDate = date.toString().split(' ').slice(1, 4).join(' ');
    const jobId = uuid.v4();
    const query = {
      query: `mutation {
        insert_Job(objects: {userId: "${userId}", startDate: "${updatedDate}", salary: ${salary}, preferencesType: "{${preferences}}", jobTitle: "${jobName}", jobId: "${jobId}", jobDescription: "${jobDescription}", companyName: "${companyName}", companyDetail: "${companyDescription}"}){
          affected_rows
        }
      }

      `,
    };
    console.log(query);
    const data = await fetch('https://team-c.hasura.app/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': 'PcEURINYV1b1OVT8z0l0jsAvMb8Wkt67rJHtTPt8oKcTaLFeLwPAKPIJfe0S7V6g',
      },
      body: JSON.stringify(query),
    });
    const jsonData = await data.json();
    console.log(jsonData);
    return jsonData.data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export { createUser, fetchSingleUser, fetchJobs, updateUserDetails, fetchPostedJobsByUser, addJobMutation };
